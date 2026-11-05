import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  /** Breadcrumb trail after Home; the last item is this page. */
  crumbs: Crumb[];
  children?: ReactNode;
};

/** Inner-page header: breadcrumbs + the page's single H1 + intro. */
export function PageHero({ title, eyebrow, crumbs, children }: PageHeroProps) {
  return (
    <div className="border-b border-steel-100 bg-steel-50">
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={crumbs} className="mb-6" />
        <Heading level={1} eyebrow={eyebrow}>
          {title}
        </Heading>
        {children ? <div className="mt-5 max-w-3xl text-lg text-steel-600">{children}</div> : null}
      </Container>
    </div>
  );
}
