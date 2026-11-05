import Image from "next/image";

type Logo = { name: string; src: string };

/** Certification or client logos on white tiles. */
export function LogoGrid({
  logos,
  width,
  height,
  altSuffix = "",
}: {
  logos: readonly Logo[];
  width: number;
  height: number;
  altSuffix?: string;
}) {
  return (
    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
      {logos.map((logo) => (
        <li key={logo.src} className="flex items-center justify-center rounded-md border border-steel-100 bg-white p-3">
          <Image
            src={logo.src}
            alt={`${logo.name}${altSuffix}`}
            width={width}
            height={height}
            sizes="(min-width: 1024px) 200px, 30vw"
            className="h-auto w-full max-w-[200px]"
          />
        </li>
      ))}
    </ul>
  );
}
