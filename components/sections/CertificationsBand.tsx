import { LogoGrid } from "@/components/sections/LogoGrid";
import { Container } from "@/components/ui/Container";
import { getDictionary, type Locale } from "@/lib/i18n";
import { certifications } from "@/lib/site";

/** Light band with the certification logos (ISRI, ISO 9001/14001, Achilles, BMR). */
export function CertificationsBand({ locale, className = "py-10" }: { locale: Locale; className?: string }) {
  const t = getDictionary(locale).certifications;
  return (
    <Container className={className}>
      <div className="flex flex-col gap-4 rounded-lg bg-band px-6 py-5 sm:flex-row sm:items-center sm:gap-8">
        <div className="shrink-0">
          <h2 className="font-display text-lg font-bold">{t.title}</h2>
          <p className="mt-0.5 text-xs text-steel-700">{t.subtitle}</p>
        </div>
        <div className="flex-1">
          <LogoGrid logos={certifications} width={250} height={150} altSuffix={t.altSuffix} cols={5} tiles={false} />
        </div>
      </div>
    </Container>
  );
}
