import { useEffect, useRef, useState } from "react";
import { CASES, CONTACTS } from "../../data";
import { useCountUp, useInView, usePrefersReducedMotion } from "../../lib/hooks";
import { Barcode } from "../ui";
import { BurgerIcon, XIcon, ArrowIcon } from "../Icons";

/* ---------- Canvas 2D: неоновые частицы ---------- */
export function ParticleField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const COLORS = ["0,245,212", "255,0,110", "131,56,236"];
    type P = { x: number; y: number; r: number; vx: number; vy: number; c: string; a: number; tw: number };
    let pts: P[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.min(90, Math.floor((w * h) / 15000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        a: Math.random() * 0.5 + 0.12,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.02;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${alpha.toFixed(3)})`;
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(draw);
    }

    const io = new IntersectionObserver(([e]) => {
      if (reduced) return;
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [reduced]);

  return <canvas ref={ref} className={className} aria-hidden />;
}

/* ---------- Навигация темы ---------- */
const NAV_LINKS: [string, string][] = [
  ["Продукты", "#products"],
  ["Как работаем", "#process"],
  ["Калькулятор", "#calc"],
  ["Объекты", "#cases"],
  ["Отзывы", "#reviews"],
  ["FAQ", "#faq"],
];

export function NeonNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-[46px] z-50 transition-all duration-300 md:top-8 ${
        scrolled ? "border-b border-white/8 bg-carbon/80 shadow-[0_14px_44px_-24px_rgba(0,245,212,0.35)] backdrop-blur-xl" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <a href="#top" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cy/40 bg-cy/10 font-inter text-lg font-black text-cy shadow-[0_0_18px_rgba(0,245,212,0.25)] transition-shadow duration-300 group-hover:shadow-[0_0_28px_rgba(0,245,212,0.5)]">
            M
          </span>
          <span className="leading-none">
            <span className="block font-inter text-[15px] font-extrabold tracking-tight text-white">
              МИКРО<span className="text-cy">ИНВЕСТ</span>
            </span>
            <span className="mt-1 block font-mono text-[8.5px] uppercase tracking-[0.3em] text-white/40">
              neonpos · wp theme
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Навигация темы NeonPOS">
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} className="glow-link text-[13px] font-semibold text-white/65">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#calc"
            className="hidden items-center gap-2 rounded-2xl bg-cy px-5 py-2.5 text-[13px] font-extrabold text-[#06251f] transition-all duration-300 hover:shadow-[0_0_32px_rgba(0,245,212,0.55)] sm:flex"
          >
            Рассчитать смету
            <ArrowIcon className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:border-cy hover:text-cy lg:hidden"
          >
            {open ? <XIcon className="h-5 w-5" /> : <BurgerIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={`grid overflow-hidden transition-all duration-300 lg:hidden ${open ? "grid-rows-[1fr] border-t border-white/8 bg-carbon/95 backdrop-blur-xl" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0 overflow-hidden">
          <nav className="px-6 py-4">
            {NAV_LINKS.map(([label, href], i) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/6 py-3.5 text-[15px] font-semibold text-white/80 last:border-0"
              >
                {label}
                <span className="font-mono text-[10px] text-white/30">0{i + 1}</span>
              </a>
            ))}
            <a href="#calc" onClick={() => setOpen(false)} className="mt-4 block rounded-2xl bg-cy px-5 py-3 text-center text-sm font-extrabold text-[#06251f]">
              Рассчитать смету
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero: scroll-driven «видео» ---------- */
const PINS = [
  { pos: "left-[8%] top-[32%]", label: "Касса · фискальный регистратор" },
  { pos: "left-[55%] top-[20%]", label: "Сканер штрихкода" },
  { pos: "left-[64%] top-[64%]", label: "Экран меню · eMenu Pro" },
];

export function NeonHero({ reduced }: { reduced: boolean }) {
  return (
    <section id="top" data-hero className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <img
          data-hero-img
          src={CASES[1].img}
          alt=""
          className="h-full w-full object-cover will-change-transform"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/60 to-carbon/35" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_15%_85%,rgba(0,245,212,0.12),transparent_60%)]" />
      </div>
      <ParticleField className="absolute inset-0 h-full w-full" />

      {/* аннотации-пины */}
      {PINS.map((p) => (
        <div key={p.label} data-pin className={`absolute z-10 hidden items-center gap-3 md:flex ${p.pos} ${reduced ? "" : "opacity-0"}`}>
          <span className="relative flex h-3 w-3">
            <span className={`absolute inset-0 rounded-full bg-cy/60 ${reduced ? "" : "animate-ping"}`} />
            <span className="relative h-3 w-3 rounded-full bg-cy shadow-[0_0_12px_rgba(0,245,212,0.9)]" />
          </span>
          <span className="glass rounded-xl px-3.5 py-2 font-mono text-[11px] font-medium tracking-wide text-white/90">
            {p.label}
          </span>
        </div>
      ))}

      <div data-speed="-5" className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-44">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.32em] text-cy">
          <span className="text-mg">//</span> автоматизация retail · horeca · услуг
        </p>
        <h1 className="mt-5 max-w-4xl font-inter text-[clamp(2.3rem,6.2vw,4.7rem)] font-black leading-[1.03] tracking-tight text-white">
          Ваш бизнес — в цифрах,
          <br />
          <span className="text-cy text-glow-cy">а не в догадках</span>
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/65">
          Microinvest Склад Pro для магазинов, кафе и ресторанов: единая база товаров, цен и продаж,
          контроль процессов в реальном времени и запуск за 1–3 дня.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#calc"
            className="rounded-2xl bg-cy px-8 py-4 text-sm font-extrabold text-[#06251f] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,245,212,0.6)]"
          >
            Рассчитать смету
          </a>
          <a
            href="#products"
            className="glass rounded-2xl px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:border-cy/60 hover:text-cy"
          >
            Каталог продуктов
          </a>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" aria-hidden>
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40">scroll</span>
        <span className="h-10 w-px bg-white/15">
          <span className={`block h-4 w-px bg-cy ${reduced ? "" : "animate-pulse"}`} />
        </span>
      </div>
    </section>
  );
}

/* ---------- Статистика ---------- */
const STATS = [
  { v: 15, suffix: "+", label: "лет на рынке автоматизации" },
  { v: 900, suffix: "+", label: "автоматизированных объектов" },
  { v: 120, suffix: "+", label: "дилеров и партнёров" },
  { v: 98, suffix: "%", label: "клиентов продлевают поддержку" },
];

function StatCell({ v, suffix, label, inView, delay }: { v: number; suffix: string; label: string; inView: boolean; delay: number }) {
  const n = useCountUp(v, inView, 1300 + delay);
  return (
    <div className="border-white/8 px-6 py-10 text-center sm:border-r sm:last:border-r-0">
      <p className="font-mono text-4xl font-bold text-cy text-glow-cy md:text-5xl">
        {n}
        <span className="text-mg">{suffix}</span>
      </p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">{label}</p>
    </div>
  );
}

export function StatsBar() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section className="relative border-y border-white/8 bg-carbon2/70 backdrop-blur-md">
      <div ref={ref} className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/8 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCell key={s.label} {...s} inView={inView} delay={i * 140} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Футер темы ---------- */
export function NeonFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#090d12]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-inter text-lg font-extrabold text-white">
              МИКРО<span className="text-cy">ИНВЕСТ</span>
            </p>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-white/50">
              Автоматизация торговли, кафе и ресторанов на платформе Microinvest: программное обеспечение,
              торговое оборудование, внедрение и поддержка по всей Беларуси.
            </p>
            <Barcode className="mt-7 h-9 w-44 text-white/25" label="NEONPOS · WP THEME" />
          </div>
          <div className="lg:col-span-3">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/35">Разделы</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-white/60">
              {NAV_LINKS.map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="glow-link">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/35">Каталог</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px] text-white/60">
              <li><a href="#products" className="glow-link">Склад Pro</a></li>
              <li><a href="#products" className="glow-link">Склад Pro Light</a></li>
              <li><a href="#products" className="glow-link">eMenu Pro / CallMi</a></li>
              <li><a href="#products" className="glow-link">Оборудование</a></li>
              <li><a href="#calc" className="glow-link">Калькулятор</a></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/35">Контакты</p>
            <ul className="mt-4 space-y-2.5 font-mono text-[12.5px] text-white/60">
              <li>
                <a href="tel:+375296154200" className="glow-link font-bold text-white">
                  {CONTACTS.phone1}
                </a>
              </li>
              <li><a href={`mailto:${CONTACTS.email}`} className="glow-link">{CONTACTS.email}</a></li>
              <li>{CONTACTS.address}</li>
              <li>{CONTACTS.hours}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-6 font-mono text-[11px] text-white/35">
          <p>© 2008–{new Date().getFullYear()} ООО «Микроинвест» · {CONTACTS.unp}</p>
          <p className="flex items-center gap-2">
            Работает на
            <span className="flex items-center gap-1.5 text-white/70">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-cy" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <circle cx="12" cy="12" r="9.2" />
                <path d="M5.5 8.5h1.8l2.6 7.4 2.1-5.4 2.1 5.4 2.6-7.4h1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              WordPress
            </span>
            · Тема <span className="text-cy">NeonPOS</span> (бесплатно)
          </p>
        </div>
      </div>
    </footer>
  );
}


