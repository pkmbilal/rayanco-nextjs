import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.37c0-.52-.35-.97-.85-1.09l-4.42-1.1c-.44-.11-.9.05-1.17.41l-.97 1.29a1.13 1.13 0 0 1-1.21.38 12.04 12.04 0 0 1-7.14-7.14 1.13 1.13 0 0 1 .38-1.21l1.29-.97c.36-.27.52-.73.41-1.17L6.96 3.1A1.13 1.13 0 0 0 5.87 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.24a2.25 2.25 0 0 1-1.07 1.92l-7.5 4.61a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.91V6.75"
      />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.14-7.5 11.25-7.5 11.25S4.5 17.64 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path strokeLinecap="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
    </svg>
  );
}

function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Points to the inline end; flips in RTL. */
export function ArrowIcon({ className = "", ...props }: IconProps) {
  return (
    <Stroke className={`rtl:-scale-x-100 ${className}`} strokeWidth={2.2} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Stroke>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Stroke strokeWidth={2.2} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Stroke>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </Stroke>
  );
}

export function FactoryIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M3 21V10l6 4V10l6 4V6l6 3v12H3Z" />
      <path d="M7 18h2M12 18h2M17 18h1" />
    </Stroke>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </Stroke>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.3 7.5 9.5 4.3-1.2 7.5-5 7.5-9.5V6L12 3Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </Stroke>
  );
}

export function BeamIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M5 4h14M5 20h14M12 4v16M8 4v2M16 4v2M8 18v2M16 18v2" />
    </Stroke>
  );
}

export function IngotIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M2.5 20 4 15h7l1.5 5h-10ZM11.5 20 13 15h7l1.5 5h-10ZM7 15l1.5-5h7l1.5 5" />
    </Stroke>
  );
}

export function RecycleIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M7 19H4.5a1.8 1.8 0 0 1-1.5-2.7L5.4 12M17 19h2.5a1.8 1.8 0 0 0 1.5-2.7L19.4 13M12 19h5m0 0-2-2m2 2-2 2" />
      <path d="M8.6 5.3 10.4 2.6a1.8 1.8 0 0 1 3 0l3.7 6.1M14.3 9.6l2.8-.9.9 2.8M5.4 12l-.9-2.8M5.4 12l2.8-.9" />
    </Stroke>
  );
}

export function ShredderIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect x="3" y="8" width="18" height="6" rx="1.5" />
      <path d="M7 3v5M12 3v5M17 3v5M6 14v7M9 14v5M12 14v7M15 14v5M18 14v7" />
    </Stroke>
  );
}

export function CoilIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <ellipse cx="8" cy="12" rx="4.5" ry="8" />
      <ellipse cx="8" cy="12" rx="1.5" ry="3" />
      <path d="M8 4h8c2.5 0 4.5 3.6 4.5 8s-2 8-4.5 8H8" />
    </Stroke>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" />
      <circle cx="12" cy="12" r="6.5" />
    </Stroke>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.5v3h-7" />
      <circle cx="6.5" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </Stroke>
  );
}

export function ScaleIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M12 3v18M7 21h10M4 7h16" />
      <path d="M6.5 7 3.5 14a3 3 0 0 0 6 0l-3-7ZM17.5 7l-3 7a3 3 0 0 0 6 0l-3-7Z" />
    </Stroke>
  );
}

export function SortIcon(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect x="3" y="4" width="7" height="7" rx="1" />
      <rect x="14" y="4" width="7" height="7" rx="1" />
      <rect x="3" y="15" width="7" height="5" rx="1" />
      <rect x="14" y="15" width="7" height="5" rx="1" />
    </Stroke>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
