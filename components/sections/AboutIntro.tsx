import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, GlobeIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";

const tradeTies = ["UK", "USA", "Canada", "Denmark", "Russia", "Dubai", "Africa", "India"] as const;

const figures = [
  { value: "1995", label: "Year founded in Saudi Arabia" },
  { value: "20+", label: "Steel producers supplied" },
  { value: String(tradeTies.length), label: "Trade regions worldwide" },
] as const;

/** Homepage "Who we are" block. Keeps the CLAUDE.md §6 core ranking text verbatim. */
export function AboutIntro() {
  return (
    <Container className="pt-14 sm:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        <div>
          <Heading eyebrow="Who we are">The largest scrap buyer in Jubail</Heading>

          <p className="mt-6 text-lg leading-relaxed text-steel-900">
            Rayanco is the largest scrap buyer in Jubail, Saudi Arabia. We are involved in the bulk and container trade of
            ferrous and non-ferrous metal, local as well as international, since 1995.
          </p>
          <div className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-steel-700">
            <p>
              We have enduring trade ties with reputed suppliers across the UK, USA, Canada, Denmark, Russia, Dubai, several
              African countries and India, and we supply more than 20 steel-producing companies.
            </p>
            <p>We are also active in the dismantling and scrapping of non-functional plants.</p>
          </div>

          <div className="mt-6">
            <p className="flex items-center gap-1.5 font-ui text-xs font-semibold uppercase tracking-[0.14em] text-steel-600">
              <GlobeIcon className="size-4 text-accent-600" />
              Trade ties
            </p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {tradeTies.map((c) => (
                <li
                  key={c}
                  className="rounded-full bg-white px-3 py-1 text-xs font-medium text-steel-800 ring-1 ring-steel-200"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-8 grid grid-cols-3 border-y border-steel-200 py-5">
            {figures.map(({ value, label }, i) => (
              <div key={label} className={`flex flex-col-reverse px-3 sm:px-5 ${i === 0 ? "ps-0 sm:ps-0" : "border-s border-steel-200"}`}>
                <dt className="mt-1 text-[0.7rem] leading-snug text-steel-600 sm:text-xs">{label}</dt>
                <dd className="font-display text-[1.75rem] font-bold leading-none tracking-tight text-steel-950 tabular-nums sm:text-4xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1.5 font-bold text-accent-600 hover:underline"
          >
            More about Rayanco
            <ArrowIcon className="size-3.5" />
          </Link>
        </div>

        <div className="relative lg:pb-10">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -end-3 -top-3 hidden h-2/3 w-2/3 rounded-lg bg-accent-500/15 lg:block"
            />
            <div className="relative overflow-hidden rounded-lg bg-steel-950 shadow-panel">
              {/* TODO(owner): replace with a real Rayanco yard / plant photo. */}
              <Image
                src="/assets/images/Hero_bg.webp"
                alt="Grapple loading metal scrap at a scrap yard"
                width={2560}
                height={1709}
                sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw"
                className="aspect-[16/10] h-auto w-full object-cover object-[45%_center] lg:aspect-[6/7]"
              />
            </div>
          </div>

          {/* TODO(owner): link to a press release / news page if one becomes available. */}
          <div className="relative mt-4 rounded-lg bg-steel-950 p-5 text-white shadow-panel ring-1 ring-white/10 lg:absolute lg:-start-10 lg:bottom-0 lg:mt-0 lg:max-w-xs">
            <p className="flex items-center gap-2 font-ui text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-400">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-400" />
              Latest news
            </p>
            <p className="mt-2 font-display text-base font-semibold leading-snug">
              Building Saudi Arabia&apos;s first EAF steel billet plant in Dammam.
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-white/60">
              A new step from scrap trading into local steel production.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
