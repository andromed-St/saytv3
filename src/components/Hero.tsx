import { CSSProperties, useEffect, useState } from "react";
import { useCountUp, useInView, usePrefersReducedMotion, useScramble } from "../lib/hooks";
import { Barcode } from "./ui";
import { ArrowIcon } from "./Icons";

const RECEIPT_ITEMS = [
  { l: "Капучино 300 мл", q: "×2", s: "9.00", neg: false },
  { l: "Круассан миндальный", q: "×1", s: "6.50", neg: false },
  { l: "Сырники со сметаной", q: "×1", s: "8.90", neg: false },
  { l: "Скидка по карте гостя", q: "", s: "-1.22", neg: true },
];

function AnimatedTotal({ show }: { show: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!show) return;
    if (reduced) {
      setV(23.18);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 750);
      setV(23.18 * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show, reduced]);
  return <>{v.toFixed(2)}</>;
}

function ReceiptScreen() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const ITEMS = RECEIPT_ITEMS.length;
  const FULL = ITEMS + 2; // итого + штрихкод

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setStep((s) => (s >= FULL + 5 ? 0 : s + 1));
    }, 640);
    return () => window.clearInterval(id);
  }, [reduced, FULL]);

  const shown = reduced ? ITEMS : Math.min(step, ITEMS);
  const showTotal = reduced || step > ITEMS;
  const showBarcode = reduced || step > ITEMS + 1;

  return (
    <div className="relative rounded-2xl bg-screen p-5 shadow-inner ring-1 ring-fern/20">
      {/* бегущая линия сканирования */}
      <div
        aria-hidden
        className="animate-scan pointer-events-none absolute left-3 right-3 top-4 h-12 rounded-full bg-gradient-to-b from-transparent via-fern/15 to-transparent"
      />
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-fern/80">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-fern" />
          Microinvest · Sklad Pro
        </span>
        <span className="flex items-center gap-1.5 text-amber">
          <span className="animate-blink h-1.5 w-1.5 rounded-full bg-amber" />
          online
        </span>
      </div>

      {/* чек */}
      <div className="rounded-sm bg-tape px-4 py-3 font-mono text-[11px] leading-relaxed text-ink/85 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.7)]">
        <div className="text-center">
          <p className="font-bold tracking-[0.18em]">КАФЕ «ПАРК» · МИНСК</p>
          <p className="text-ink/55">УНП 191456789 · КСА №004217</p>
          <p className="text-ink/55">14.06 · 12:47 · кассир: Алина</p>
        </div>
        <div className="my-2 border-t border-dashed border-ink/30" />
        <div className="min-h-[96px]">
          {RECEIPT_ITEMS.slice(0, shown).map((it, i) => (
            <div key={it.l} className="animate-pop flex items-baseline justify-between gap-2 py-0.5" style={{ animationDelay: `${i * 40}ms` }}>
              <span className="truncate">
                {it.l} {it.q && <span className="text-ink/45">{it.q}</span>}
              </span>
              <span className="border-b border-dotted border-ink/25" />
              <span className={`shrink-0 font-bold ${it.neg ? "text-tang" : ""}`}>{it.s}</span>
            </div>
          ))}
        </div>
        <div className="my-2 border-t border-dashed border-ink/30" />
        <div className="min-h-[44px]">
          {showTotal && (
            <div className="animate-pop">
              <div className="flex items-baseline justify-between text-[13px]">
                <span className="font-bold tracking-widest">ИТОГО, BYN</span>
                <span className="text-[15px] font-bold text-moss">
                  <AnimatedTotal show={showTotal} />
                </span>
              </div>
              <p className="text-right text-[10px] text-ink/55">БЕЗНАЛ · VISA **** 4321</p>
            </div>
          )}
        </div>
        <div className={`min-h-[46px] transition-opacity duration-500 ${showBarcode ? "opacity-100" : "opacity-0"}`}>
          <Barcode className="mx-auto h-9 w-40 text-ink" label="СПАСИБО! ЖДЁМ ВАС СНОВА" />
        </div>
      </div>

      {/* клавиатура терминала */}
      <div className="mt-4 grid grid-cols-4 gap-1.5" aria-hidden>
        {["7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", "00", "C", "OK"].map((k) => (
          <span
            key={k}
            className={`rounded-md py-1.5 text-center font-mono text-[11px] transition-colors ${
              k === "OK" ? "bg-pine font-bold text-tape" : "bg-white/6 text-tape/60 hover:bg-white/12"
            }`}
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

function Stat({ to, suffix, label, inView }: { to: number; suffix: string; label: string; inView: boolean }) {
  const v = useCountUp(to, inView, 1300);
  return (
    <div>
      <p className="font-display text-[26px] font-bold leading-none text-ink md:text-[32px]">
        {v}
        <span className="text-tang">{suffix}</span>
      </p>
      <p className="mt-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink/50">{label}</p>
    </div>
  );
}

export default function Hero() {
  const title = useScramble("АВТОМАТИЗАЦИЯ", true, 40);
  const [statsRef, statsInView] = useInView<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden">
      <div className="grid-paper absolute inset-0 opacity-80" aria-hidden />
      <div className="absolute -right-16 top-16 hidden w-[400px] rotate-90 opacity-[0.07] lg:block" aria-hidden>
        <Barcode className="h-24 w-full text-ink" label="" />
      </div>
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-fern/12 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-14 md:pt-20 lg:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-pine">
              <span className="inline-block h-2.5 w-2.5 bg-tang" aria-hidden />
              Торговые системы для Беларуси
              <span className="animate-blink -ml-1 inline-block h-4 w-2 bg-pine" aria-hidden />
            </p>

            <h1 className="mt-6 font-display font-extrabold leading-[1.04] tracking-tight text-ink">
              <span className="block text-[clamp(2rem,5.4vw,4rem)]">{title || "\u00A0"}</span>
              <span className="outline-text block text-[clamp(2rem,5.4vw,4rem)]">МАГАЗИНА, КАФЕ</span>
              <span className="block text-[clamp(2rem,5.4vw,4rem)]">
                И РЕСТОРАНА<span className="text-tang">.</span>
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-ink/70">
              Хотите автоматизировать свой бизнес? <strong className="font-bold text-ink">Мы поможем.</strong>{" "}
              Программа Microinvest заменит десятки таблиц и документов на вашем столе: цены, продажи и скидки
              хранятся в единой базе, а внедрение занимает <strong className="font-bold text-ink">1–3 дня</strong>.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#catalog"
                className="group flex items-center gap-3 rounded-lg bg-pine px-7 py-3.5 text-sm font-bold text-tape transition-all duration-300 hover:-translate-y-0.5 hover:bg-moss hover:shadow-[0_16px_35px_-14px_rgba(15,122,77,0.9)]"
              >
                Каталог продуктов
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
              <a
                href="#how"
                className="group flex items-center gap-3 rounded-lg border border-ink/20 bg-tape/60 px-7 py-3.5 text-sm font-bold text-ink transition-all duration-300 hover:border-ink hover:bg-tape"
              >
                Как проходит внедрение
                <span className="font-mono text-[11px] text-tang transition-transform duration-300 group-hover:translate-x-1">→ 4 шага</span>
              </a>
            </div>

            <div ref={statsRef} className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/15 pt-8 md:grid-cols-4">
              <Stat to={15} suffix=" лет" label="на рынке РБ" inView={statsInView} />
              <Stat to={900} suffix="+" label="объектов запущено" inView={statsInView} />
              <Stat to={25} suffix="+" label="программ и модулей" inView={statsInView} />
              <Stat to={4} suffix="" label="областных центра" inView={statsInView} />
            </div>
          </div>

          {/* POS-терминал */}
          <div className="relative lg:col-span-5">
            <div
              className="animate-float absolute -right-3 -top-6 z-10 rotate-6 rounded-lg border-2 border-dashed border-ink/40 bg-amber px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink shadow-lg"
              style={{ "--float-rot": "6deg" } as CSSProperties}
            >
              2 мес. обслуживания = 0 BYN
            </div>
            <div
              className="animate-float absolute -left-4 bottom-16 z-10 -rotate-3 rounded-lg bg-ink px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-tape shadow-lg"
              style={{ "--float-rot": "-3deg", animationDelay: "1.2s" } as CSSProperties}
            >
              внедрение за 1–3 дня
            </div>

            <div className="rounded-[30px] bg-coal p-3.5 shadow-[0_40px_80px_-30px_rgba(20,32,26,0.55)] ring-1 ring-ink/20">
              <div className="mb-3 flex items-center justify-between px-2">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-tang/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-fern/80" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-tape/35">POS · касса 01</span>
              </div>
              <ReceiptScreen />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
