type P = { className?: string };

const base = (className?: string) => ({
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const StoreIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M3.5 9.5L5 4h14l1.5 5.5" />
    <path d="M3.5 9.5h17v2a2.6 2.6 0 01-2.8 2.5 2.7 2.7 0 01-2.8-2.5 2.8 2.8 0 01-5.8 0 2.7 2.7 0 01-2.8 2.5A2.6 2.6 0 013.5 11.5z" />
    <path d="M5 14v6h14v-6" />
    <path d="M9 20v-4.5h6V20" />
  </svg>
);

export const CafeIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 10h12v6a4 4 0 01-4 4H8a4 4 0 01-4-4z" />
    <path d="M16 11h2.5a2 2 0 010 4H16" />
    <path d="M7.5 3.5c-.8 1 .8 1.6 0 2.7M11.5 3.5c-.8 1 .8 1.6 0 2.7" />
    <path d="M4 21h13" />
  </svg>
);

export const LeisureIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 2l2.2 5.6L20 10l-5.8 2.4L12 18l-2.2-5.6L4 10l5.8-2.4z" />
    <path d="M18.5 15.5l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z" />
  </svg>
);

export const CoinsIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <ellipse cx="9.5" cy="7.5" rx="6" ry="3" />
    <path d="M3.5 7.5v4c0 1.7 2.7 3 6 3s6-1.3 6-3v-4" />
    <path d="M3.5 11.5v4c0 1.7 2.7 3 6 3s6-1.3 6-3" />
    <path d="M17 9.5c2.1.3 3.5 1.3 3.5 2.5v4c0 1.4-1.8 2.6-4.2 2.9" />
  </svg>
);

export const BoxIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 2.5L21 7v10l-9 4.5L3 17V7z" />
    <path d="M3 7l9 4.5L21 7" />
    <path d="M12 11.5V21.5" />
    <path d="M7.5 4.8l9 4.5" />
  </svg>
);

export const ChipIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="6" y="6" width="12" height="12" rx="1.5" />
    <rect x="10" y="10" width="4" height="4" />
    <path d="M9 6V3M15 6V3M9 21v-3M15 21v-3M6 9H3M6 15H3M21 9h-3M21 15h-3" />
  </svg>
);

export const UserIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="12" cy="7.5" r="3.5" />
    <path d="M4.5 20.5c1-4 3.8-6 7.5-6s6.5 2 7.5 6" />
  </svg>
);

export const SchemeIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="5" cy="12" r="2.5" />
    <circle cx="19" cy="5" r="2.5" />
    <circle cx="19" cy="19" r="2.5" />
    <path d="M7.3 10.9L16.7 6M7.3 13.1l9.4 4.9" />
  </svg>
);

export const WifiIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M2.5 9a14 14 0 0119 0" />
    <path d="M5.5 12.5a10 10 0 0113 0" />
    <path d="M8.5 16a5.5 5.5 0 017 0" />
    <circle cx="12" cy="19.5" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const GiftIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="3.5" y="8" width="17" height="4" />
    <path d="M5 12v8.5h14V12" />
    <path d="M12 8v12.5" />
    <path d="M12 8s-4.5.3-5.5-2C5.8 4.3 7 2.9 8.5 3.3 10.7 3.9 12 8 12 8zM12 8s4.5.3 5.5-2c.7-1.7-.5-3.1-2-2.7C13.3 3.9 12 8 12 8z" />
  </svg>
);

export const DocIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M6 2.5h8L19 7.5v14H6z" />
    <path d="M14 2.5v5h5" />
    <path d="M9 12h7M9 15.5h7M9 19h4.5" />
  </svg>
);

export const ScaleLawIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 3v18M8 21h8" />
    <path d="M5 6.5h14" />
    <path d="M5 6.5L2.5 12.5a3 3 0 005 0zM19 6.5l-2.5 6a3 3 0 005 0z" />
  </svg>
);

export const MonitorIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <path d="M3.5 12.5h17" />
    <path d="M9 20h6M12 16v4" />
    <path d="M6 8h6M6 10h3.5" />
  </svg>
);

export const RegisterIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="3" y="9" width="18" height="11" rx="1.5" />
    <path d="M6.5 9V5.5h11V9" />
    <path d="M9.5 5.5V3h5v2.5" />
    <path d="M6.5 13h4M6.5 16.5h4" />
    <rect x="13.5" y="12.5" width="4.5" height="4.5" rx="0.8" />
  </svg>
);

export const ReceiptPrintIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M6 8V3h12v5" />
    <rect x="3.5" y="8" width="17" height="7" rx="1.2" />
    <path d="M7 15v6l1.6-1.2L10.2 21l1.8-1.2L13.8 21l1.6-1.2L17 21v-6" />
    <path d="M9.5 11.5h5" />
  </svg>
);

export const ScanIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M3 7V4h3M21 7V4h-3M3 17v3h3M21 17v3h-3" />
    <path d="M7 8v8M10 8v8M12.5 8v8M15 8v8M17 8v8" strokeWidth="1.4" />
  </svg>
);

export const DisplayIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="3.5" y="4" width="17" height="11" rx="1.5" />
    <path d="M6.5 8h7M6.5 11h4.5" />
    <path d="M12 15v3.5M8.5 20.5h7" />
  </svg>
);

export const WeightsIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 3.5v3" />
    <circle cx="12" cy="4" r="1.3" />
    <path d="M5 20.5h14l-1.8-11.5a2 2 0 00-2-1.5H8.8a2 2 0 00-2 1.5z" />
    <path d="M9.5 12a2.5 2.5 0 005 0" />
  </svg>
);

export const CardIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="M2.5 9.5h19" />
    <path d="M6 14.5h4M6 17h2.5" />
  </svg>
);

export const PhoneIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M5 3.5h4l1.5 5-2.5 1.8a13.5 13.5 0 005.7 5.7l1.8-2.5 5 1.5v4a2 2 0 01-2 2A17.5 17.5 0 013 5.5a2 2 0 012-2z" />
  </svg>
);

export const MailIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="M3.5 6.5l8.5 7 8.5-7" />
  </svg>
);

export const PinIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 21.5s-7-6.2-7-11.5a7 7 0 0114 0c0 5.3-7 11.5-7 11.5z" />
    <circle cx="12" cy="9.8" r="2.6" />
  </svg>
);

export const ClockIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5.2l3.4 2" />
  </svg>
);

export const CheckIcon = ({ className }: P) => (
  <svg {...base(className)} strokeWidth={2.4}>
    <path d="M4.5 12.5l5 5L19.5 7" />
  </svg>
);

export const ArrowIcon = ({ className }: P) => (
  <svg {...base(className)} strokeWidth={2}>
    <path d="M4 12h15M13.5 5.5L20 12l-6.5 6.5" />
  </svg>
);

export const PlusIcon = ({ className }: P) => (
  <svg {...base(className)} strokeWidth={2.2}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const StarIcon = ({ className }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.6l2.8 6 6.6.8-4.9 4.5 1.3 6.5L12 17.2l-5.8 3.2 1.3-6.5-4.9-4.5 6.6-.8z" />
  </svg>
);

export const BurgerIcon = ({ className }: P) => (
  <svg {...base(className)} strokeWidth={2.2}>
    <path d="M4 6.5h16M4 12h16M4 17.5h10" />
  </svg>
);

export const XIcon = ({ className }: P) => (
  <svg {...base(className)} strokeWidth={2.2}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const SendIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M21 3.5L3 10.5l7 3 3 7z" />
    <path d="M21 3.5L10 13.5" />
  </svg>
);
