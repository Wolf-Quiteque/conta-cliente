import Image from "next/image";
import { clsx } from "clsx";
import { formatCurrencyKz, formatDate } from "@/lib/format";

export function ReceiptCard({
  receipt,
}: {
  receipt: {
    id: string;
    imageUrl: string;
    amount: string | null;
    receiptDate: string | null;
    createdAt: Date | string;
    note: string | null;
    type: "venda" | "compra";
    paymentMethod: "dinheiro" | "banco";
    uploaderName?: string;
  };
}) {
  const isVenda = receipt.type === "venda";

  return (
    <a
      href={receipt.imageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 transition-colors active:scale-[0.99] active:border-primary/30"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface-2">
        <Image
          src={receipt.imageUrl}
          alt="Recibo"
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <div className="flex items-center justify-between gap-2">
          <span
            className={clsx(
              "truncate text-[15px] font-semibold",
              isVenda ? "text-success" : "text-danger",
            )}
          >
            {isVenda ? "+ " : "− "}
            {formatCurrencyKz(receipt.amount)}
          </span>
          {receipt.uploaderName && (
            <span className="shrink-0 truncate rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-muted-foreground">
              {receipt.uploaderName}
            </span>
          )}
        </div>
        <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
          {formatDate(receipt.receiptDate ?? receipt.createdAt)}
          <span className="text-muted">·</span>
          {receipt.paymentMethod === "dinheiro" ? "Dinheiro" : "Banco"}
        </span>
        {receipt.note && (
          <span className="truncate text-[12.5px] text-muted">
            {receipt.note}
          </span>
        )}
      </div>
    </a>
  );
}
