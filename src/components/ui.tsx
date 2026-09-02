import { ReactNode } from "react";
import { useInView } from "../lib/hooks";

/* Плавное появление при скролле */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* Заголовок секции: моно-ярлык + крупный дисплейный тайтл */
export function SectionHead({
  eyebrow,
  title,
  desc,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <p
        className={`mb-4 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.28em] ${
          dark ? "text-fern" : "text-pine"
        }`}
      >
        <span className="inline-block h-2.5 w-2.5 bg-tang" aria-hidden />
        {eyebrow}
      </p>
      <h2
        className={`font-display text-[clamp(1.55rem,3.6vw,2.7rem)] font-bold leading-[1.12] tracking-tight ${
          dark ? "text-tape" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {desc && (
        <p className={`mt-5 max-w-2xl text-[15px] leading-relaxed ${dark ? "text-tape/65" : "text-ink/65"}`}>
          {desc}
        </p>
      )}
    </div>
  );
}

/* Штрихкод — декоративный и в чеке */
export function Barcode({
  className = "",
  color = "currentColor",
  label = "MICROINVEST · BY",
}: {
  className?: string;
  color?: string;
  label?: string;
}) {
  const widths = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 4, 1, 2, 1, 3];
  let x = 0;
  const bars = widths.map((w, i) => {
    const rect = { x, w, i };
    x += w + 1.4;
    return rect;
  });
  return (
    <div className={className}>
      <svg viewBox={`0 0 ${x} 34`} className="h-full w-full" preserveAspectRatio="none" aria-hidden>
        {bars.map((b) => (
          <rect key={b.i} x={b.x} y="0" width={b.w} height="34" fill={color} />
        ))}
      </svg>
      {label && (
        <p className="mt-1 text-center font-mono text-[9px] font-medium tracking-[0.32em]">{label}</p>
      )}
    </div>
  );
}

/* Бегущая строка сфер бизнеса */
export function Ticker({ items }: { items: string[] }) {
  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-display text-sm font-semibold uppercase tracking-[0.18em] text-tape/90 md:px-8">
            {it}
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" className="text-tang" fill="currentColor" aria-hidden>
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee border-y border-fern/25 bg-moss py-4">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* Номер-плашка для списков преимуществ */
export function NumBadge({ n, active = false }: { n: string; active?: boolean }) {
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-bold transition-colors duration-300 ${
        active
          ? "border-pine bg-pine text-tape"
          : "border-ink/15 bg-tape text-ink/60 group-hover:border-pine group-hover:text-pine"
      }`}
    >
      {n}
    </span>
  );
}
