import Image from "next/image";
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
  };
}) {
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
        <span className="truncate text-[15px] font-medium">
          {formatCurrencyKz(receipt.amount)}
        </span>
        <span className="text-[13px] text-muted-foreground">
          {formatDate(receipt.receiptDate ?? receipt.createdAt)}
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
