"use client";

import { useEffect, useRef, useState } from "react";
import { ReceiptCard } from "./receipt-card";
import { loadMoreReceipts } from "@/app/recibos/actions";

type ReceiptRow = {
  id: string;
  imageUrl: string;
  amount: string | null;
  receiptDate: string | null;
  createdAt: Date | string;
  note: string | null;
  type: "venda" | "compra";
  paymentMethod: "dinheiro" | "banco";
  uploaderId: string;
  uploaderName: string;
};

export function ReceiptList({
  initialReceipts,
  currentUserId,
  totalCount,
}: {
  initialReceipts: ReceiptRow[];
  currentUserId: string;
  totalCount: number;
}) {
  const [items, setItems] = useState(initialReceipts);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const hasMore = items.length < totalCount;

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || loadingRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        loadMoreReceipts(items.length)
          .then((more) => {
            if (more.length > 0) {
              setItems((prev) => [...prev, ...more]);
            }
          })
          .finally(() => {
            loadingRef.current = false;
            setLoading(false);
          });
      },
      { rootMargin: "300px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, items.length]);

  return (
    <>
      <ul className="space-y-2.5">
        {items.map((receipt) => (
          <li key={receipt.id}>
            <ReceiptCard
              receipt={{
                ...receipt,
                uploaderName:
                  receipt.uploaderId === currentUserId
                    ? undefined
                    : receipt.uploaderName,
              }}
            />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-6">
          {loading && (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          )}
        </div>
      )}
    </>
  );
}
