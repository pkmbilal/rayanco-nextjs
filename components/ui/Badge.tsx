import { getDictionary, type Locale } from "@/lib/i18n";

export type PublicStatus = "available" | "reserved" | "sold";

const styles: Record<PublicStatus, string> = {
  available: "bg-success text-white",
  reserved: "bg-warning text-white",
  sold: "bg-steel-900 text-white",
};

export function StatusBadge({
  locale,
  status,
  className = "",
}: {
  locale: Locale;
  status: PublicStatus;
  className?: string;
}) {
  const t = getDictionary(locale);
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-bold leading-none ${styles[status]} ${className}`}
    >
      {t.status[status]}
    </span>
  );
}
