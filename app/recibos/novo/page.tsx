import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/dal";
import { UploadForm } from "./upload-form";

export const metadata = { title: "Novo recibo" };

export default async function NovoReciboPage() {
  const user = await getCurrentUser();

  if (user.status !== "aprovado") {
    redirect("/recibos");
  }

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/60 bg-background/80 px-4 pb-4 pt-[calc(env(safe-area-inset-top)+1.25rem)] backdrop-blur-xl">
        <Link
          href="/recibos"
          aria-label="Voltar"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground active:scale-95"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-[17px] font-semibold tracking-tight">
          Novo recibo
        </h1>
      </header>
      <UploadForm />
    </div>
  );
}
