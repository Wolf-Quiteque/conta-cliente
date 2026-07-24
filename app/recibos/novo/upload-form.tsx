"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import {
  Banknote,
  Camera,
  ChevronLeft,
  ImagePlus,
  Landmark,
  RotateCcw,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/input";
import { fileToWebp } from "@/lib/image";
import { formatBytes, normalizeAmountInput, normalizeDateInput } from "@/lib/format";
import { createReceipt } from "@/app/recibos/actions";

type Stage = "tipo" | "foto" | "preparing" | "detalhes" | "uploading";
type Tipo = "venda" | "compra";
type PaymentMethod = "dinheiro" | "banco";

export function UploadForm() {
  const router = useRouter();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [stage, setStage] = useState<Stage>("tipo");
  const [tipo, setTipo] = useState<Tipo | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("dinheiro");
  const [preview, setPreview] = useState<string | null>(null);
  const [webpFile, setWebpFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function chooseTipo(value: Tipo) {
    setTipo(value);
    setStage("foto");
  }

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setStage("preparing");
    setOriginalSize(file.size);
    try {
      const webp = await fileToWebp(file);
      setWebpFile(webp);
      setPreview(URL.createObjectURL(webp));
      setStage("detalhes");
    } catch {
      setError("Não foi possível processar esta imagem. Tente novamente.");
      setStage("foto");
    }
  }

  function retakePhoto() {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setWebpFile(null);
    setOriginalSize(0);
    setStage("foto");
    setError(null);
    if (cameraInputRef.current) cameraInputRef.current.value = "";
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  }

  async function handleSubmit(formData: FormData) {
    if (!webpFile || !tipo) return;
    setStage("uploading");
    setError(null);

    try {
      const uploadBody = new FormData();
      uploadBody.append("file", webpFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadBody,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Falha no envio da imagem.");
      }

      await createReceipt({
        imageUrl: data.url,
        imagePathname: data.pathname,
        type: tipo,
        paymentMethod,
        amount: normalizeAmountInput(formData.get("amount")),
        date: normalizeDateInput(formData.get("date")),
        note: (() => {
          const note = formData.get("note");
          return typeof note === "string" && note.trim() ? note.trim() : null;
        })(),
      });

      startTransition(() => {
        router.push("/recibos");
        router.refresh();
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao enviar o recibo. Tente novamente.",
      );
      setStage("detalhes");
    }
  }

  const isBusy = stage === "preparing" || stage === "uploading";

  return (
    <div className="px-5 pb-10 pt-2">
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {stage === "tipo" && (
        <div className="flex flex-col gap-4 animate-fade-up">
          <p className="text-center text-[13.5px] text-muted-foreground">
            Este recibo é de uma venda ou de uma compra?
          </p>
          <button
            type="button"
            onClick={() => chooseTipo("venda")}
            className="flex items-center justify-center gap-3 rounded-3xl border border-success/30 bg-success/15 py-9 text-success backdrop-blur-xl transition-transform active:scale-[0.98]"
          >
            <TrendingUp className="h-6 w-6" strokeWidth={2.5} />
            <span className="text-lg font-semibold">Venda</span>
          </button>
          <button
            type="button"
            onClick={() => chooseTipo("compra")}
            className="flex items-center justify-center gap-3 rounded-3xl border border-danger/30 bg-danger/15 py-9 text-danger backdrop-blur-xl transition-transform active:scale-[0.98]"
          >
            <TrendingDown className="h-6 w-6" strokeWidth={2.5} />
            <span className="text-lg font-semibold">Compra</span>
          </button>
        </div>
      )}

      {stage === "foto" && (
        <div className="flex flex-col gap-3 animate-fade-up">
          <button
            type="button"
            onClick={() => setStage("tipo")}
            className="mb-1 flex items-center gap-1 self-start text-[13px] font-medium text-muted-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            {tipo === "venda" ? "Venda" : "Compra"} — mudar
          </button>

          <button
            type="button"
            onClick={() => cameraInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-surface py-14 transition-colors active:scale-[0.98] active:border-primary/40"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-2 text-primary-foreground shadow-lg shadow-primary/25">
              <Camera className="h-7 w-7" />
            </span>
            <span className="font-medium">Tirar foto</span>
            <span className="px-8 text-center text-[13px] text-muted-foreground">
              Fotografe o recibo com a câmara
            </span>
          </button>

          <button
            type="button"
            onClick={() => galleryInputRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface py-4 text-[14.5px] font-medium text-foreground transition-colors active:scale-[0.98]"
          >
            <ImagePlus className="h-4.5 w-4.5 text-muted-foreground" />
            Escolher da galeria
          </button>

          {error && <FieldError>{error}</FieldError>}
        </div>
      )}

      {stage === "preparing" && (
        <div className="flex flex-col items-center justify-center gap-3 py-24 animate-fade-up">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-[14px] text-muted-foreground">
            A preparar imagem…
          </p>
        </div>
      )}

      {(stage === "detalhes" || stage === "uploading") && webpFile && tipo && (
        <form action={handleSubmit} className="animate-fade-up space-y-4">
          <div
            className={clsx(
              "flex items-center gap-2 rounded-2xl px-4 py-2.5 text-[13px] font-medium",
              tipo === "venda"
                ? "bg-success/15 text-success"
                : "bg-danger/15 text-danger",
            )}
          >
            {tipo === "venda" ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {tipo === "venda" ? "Venda" : "Compra"}
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-2">
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Pré-visualização do recibo"
                className="max-h-[360px] w-full object-contain"
              />
            )}
            {stage !== "uploading" && (
              <button
                type="button"
                onClick={retakePhoto}
                aria-label="Remover imagem"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <p className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
            <RotateCcw className="h-3.5 w-3.5" />
            Otimizado: {formatBytes(originalSize)} → {formatBytes(webpFile.size)}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="amount">Valor (Kz)</Label>
              <Input
                id="amount"
                name="amount"
                inputMode="decimal"
                placeholder="0,00"
                disabled={stage === "uploading"}
              />
            </div>
            <div>
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                name="date"
                type="date"
                max={new Date().toISOString().slice(0, 10)}
                disabled={stage === "uploading"}
              />
            </div>
          </div>

          <div>
            <Label>Forma de pagamento</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("dinheiro")}
                aria-pressed={paymentMethod === "dinheiro"}
                disabled={stage === "uploading"}
                className={clsx(
                  "flex h-13 items-center justify-center gap-2 rounded-2xl border text-[14.5px] font-medium transition-colors",
                  paymentMethod === "dinheiro"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-surface text-muted-foreground",
                )}
              >
                <Banknote className="h-4 w-4" />
                Dinheiro
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("banco")}
                aria-pressed={paymentMethod === "banco"}
                disabled={stage === "uploading"}
                className={clsx(
                  "flex h-13 items-center justify-center gap-2 rounded-2xl border text-[14.5px] font-medium transition-colors",
                  paymentMethod === "banco"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-surface text-muted-foreground",
                )}
              >
                <Landmark className="h-4 w-4" />
                Banco
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="note">Nota (opcional)</Label>
            <Textarea
              id="note"
              name="note"
              rows={2}
              placeholder="Ex: Combustível, material de escritório…"
              disabled={stage === "uploading"}
            />
          </div>

          <p className="text-[12.5px] text-muted-foreground">
            Se a imagem estiver pouco nítida, preencha o valor e a data
            manualmente.
          </p>

          {error && <FieldError>{error}</FieldError>}

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={stage === "uploading"}
            disabled={isBusy}
          >
            {stage === "uploading" ? "A enviar…" : "Enviar recibo"}
          </Button>
        </form>
      )}
    </div>
  );
}
