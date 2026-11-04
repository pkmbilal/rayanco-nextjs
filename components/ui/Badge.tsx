import { getDictionary } from "@/lib/i18n";

export type PublicStatus = "available" | "reserved" | "sold";

const styles: Record<PublicStatus, string> = {
  available: "bg-success text-white",
  reserved: "bg-warning text-white",
  sold: "bg-steel-800 text-white",
};

export function StatusBadge({ status, className = "" }: { status: PublicStatus; className?: string }) {
  const t = getDictionary();
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${styles[status]} ${className}`}
    >
      {t.status[status]}
    </span>
  );
}
