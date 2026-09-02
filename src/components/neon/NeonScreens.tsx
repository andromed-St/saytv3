import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CASES, CONTACTS, EQUIPMENT, FAQ, REVIEWS, SOFTWARE } from "../../data";
import { usePrefersReducedMotion } from "../../lib/hooks";
import { Reveal } from "../ui";
import {
  ArrowIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  PlusIcon,
  StarIcon,
} from "../Icons";
import { NeonFooter, NeonHero, NeonNav, ParticleField, StatsBar } from "./NeonChrome";

gsap.registerPlugin(ScrollTrigger);

/* ---------- ripple ---------- */
function spawnRipple(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const d = Math.max(r.width, r.height) * 1.4;
  const s = document.createElement("span");
  s.className = "ripple-ink";
  s.style.width = s.style.height = `${d}px`;
  s.style.left = `${e.clientX - r.left - d / 2}px`;
  s.style.top = `${e.clientY - r.top - d / 2}px`;
  el.appendChild(s);
  window.setTimeout(() => s.remove(), 700);
}

/* ---------- 3D tilt ---------- */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (reduced || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ref.current.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateZ(8px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
      className={`${className} transition-transform duration-200 ease-out`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

/* ---------- анимированное число ---------- */
function useAnimatedNumber(target: number) {
  const reduced = usePrefersReducedMotion();
  const [v, setV] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    if (reduced) {
      setV(target);
      fromRef.current = target;
      return;
    }
    const from = fromRef.current;
    const t0 = performance.now();
    let raf = 0;
    const dur = 520;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const val = Math.round(from + (target - from) * (1 - Math.pow(1 - p, 3)));
      setV(val);
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced]);
  return v;
}

/* ---------- заголовок экрана ---------- */
function ScreenHead({ kicker, accent, title, sub }: { kicker: string; accent: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.32em]" style={{ color: accent }}>
          <span className="text-white/30">//</span> {kicker}
        </p>
        <h2 className="mt-4 font-inter text-3xl font-extrabold tracking-tight text-white md:text-[44px] md:leading-[1.05]">{title}</h2>
      </div>
      {sub && <p className="max-w-md text-[14px] leading-relaxed text-white/50">{sub}</p>}
    </div>
  );
}

/* ---------- 03 · Продукты ---------- */
const ACCENTS = [
  { chip: "border-cy/40 bg-cy/10 text-cy", hover: "hover:border-cy/50 hover:shadow-[0_0_48px_-14px_rgba(0,245,212,0.55)]" },
  { chip: "border-mg/40 bg-mg/10 text-mg", hover: "hover:border-mg/50 hover:shadow-[0_0_48px_-14px_rgba(255,0,110,0.5)]" },
  { chip: "border-[#8338ec]/60 bg-[#8338ec]/15 text-[#b18cff]", hover: "hover:border-[#8338ec] hover:shadow-[0_0_48px_-14px_rgba(131,56,236,0.6)]" },
];

function Products() {
  const soft = SOFTWARE.slice(0, 6);
  const hard = EQUIPMENT;
  return (
    <section id="products" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScreenHead
          kicker="01 · каталог"
          accent="#00f5d4"
          title={
            <>
              Продукты и <span className="text-cy text-glow-cy">оборудование</span>
            </>
          }
          sub="Готовое ПО и «железо» под ключ. Цены фиксированы — без подводных камней, смета не меняется после подписания."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {soft.map((p, i) => {
            const a = ACCENTS[i % 3];
            return (
              <Reveal key={p.name} delay={i * 80}>
                <TiltCard className={`glass group flex h-full flex-col rounded-2xl p-7 transition-colors duration-300 ${a.hover}`}>
                  <div className="flex items-center justify-between">
                    {p.badge ? (
                      <span className={`rounded-full border px-3 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] ${a.chip}`}>
                        {p.badge}
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">soft</span>
                    )}
                    <span className="font-mono text-[10px] text-white/25">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-inter text-[17px] font-bold text-white transition-colors duration-300 group-hover:text-cy">
                    {p.name}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-white/50">{p.desc}</p>
                  <p className="mt-6 border-t border-white/8 pt-4 font-mono text-[14px] font-bold text-cy">{p.price}</p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <p className="mt-12 font-mono text-[10.5px] font-bold uppercase tracking-[0.26em] text-white/35">
            Торговое оборудование · в наличии на складе
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {hard.map((h) => (
              <a
                key={h.name}
                href="#calc"
                className="glass group flex flex-col rounded-xl px-5 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-cy/50 hover:shadow-[0_0_30px_-10px_rgba(0,245,212,0.5)]"
              >
                <span className="text-[12.5px] font-semibold text-white/80 transition-colors group-hover:text-white">{h.name}</span>
                <span className="mt-1 font-mono text-[11.5px] font-bold text-cy">{h.price}</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 04 · Как мы работаем ---------- */
const STEPS = [
  { n: "01", t: "Заявка и аудит", d: "Менеджер изучает ваш объект и задачи. Консультация и выезд — бесплатно." },
  { n: "02", t: "Смета и конфигурация", d: "Фиксируем цену и состав системы. Никаких «подводных камней»." },
  { n: "03", t: "Внедрение за 1–3 дня", d: "Ставим ПО, подключаем оборудование, наполняем товарную базу." },
  { n: "04", t: "Обучение и поддержка", d: "Обучаем персонал. 2 месяца обслуживания после запуска — бесплатно." },
];

function Process({ reduced }: { reduced: boolean }) {
  const secRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lit, setLit] = useState<boolean[]>(() => Array(STEPS.length).fill(reduced));

  useEffect(() => {
    if (reduced) {
      if (lineRef.current) lineRef.current.style.transform = "scaleX(1)";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const i = Number((en.target as HTMLElement).dataset.i);
          setLit((prev) => (prev[i] ? prev : prev.map((v, j) => (j === i ? true : v))));
        });
      },
      { threshold: 0.5 }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));

    const onScroll = () => {
      const sec = secRef.current;
      const line = lineRef.current;
      if (!sec || !line) return;
      const r = sec.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - r.top) / r.height));
      line.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return (
    <section id="process" className="relative border-y border-white/8 bg-carbon2/50 py-24 md:py-32">
      <div className="grid-dark absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6">
        <ScreenHead
          kicker="02 · процесс"
          accent="#ff006e"
          title={
            <>
              Запуск за <span className="text-mg">4 шага</span>
            </>
          }
          sub="От заявки до первого чека — в среднем 7 дней. Точки загораются по мере прохождения этапов."
        />

        <div ref={secRef} className="relative mt-16">
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/10 lg:block" aria-hidden>
            <div
              ref={lineRef}
              className="h-full w-full origin-left bg-gradient-to-r from-cy via-vl to-mg shadow-[0_0_14px_rgba(0,245,212,0.6)]"
              style={{ transform: reduced ? "scaleX(1)" : "scaleX(0)" }}
            />
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => (
              <div key={s.n} data-i={i} ref={(el) => { stepRefs.current[i] = el; }}>
                <span
                  className={`relative z-10 block h-[15px] w-[15px] rounded-full border-2 transition-all duration-500 ${
                    lit[i] ? "border-cy bg-cy shadow-[0_0_18px_rgba(0,245,212,0.9)]" : "border-white/25 bg-carbon"
                  }`}
                />
                <p className={`mt-6 font-mono text-xs font-bold tracking-[0.2em] transition-colors duration-500 ${lit[i] ? "text-cy" : "text-white/30"}`}>
                  /{s.n}
                </p>
                <h3 className="mt-2 font-inter text-lg font-bold text-white">{s.t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/50">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 05 · Калькулятор ---------- */
const BIZ = [
  { id: "store", label: "Магазин", base: 890 },
  { id: "cafe", label: "Кафе / ресторан", base: 1240 },
  { id: "fun", label: "Досуг / услуги", base: 990 },
];
const EQUIP = [
  { id: "scan", label: "Сканер штрихкода", price: 240 },
  { id: "print", label: "Чековый принтер", price: 320 },
  { id: "pos", label: "POS-монитор", price: 590 },
  { id: "kkm", label: "Кассовый аппарат", price: 290 },
  { id: "scale", label: "Весы с печатью этикеток", price: 380 },
  { id: "disp", label: "Дисплей покупателя", price: 210 },
];
const PER_STATION = 190;

function Calculator() {
  const [biz, setBiz] = useState(BIZ[0]);
  const [stations, setStations] = useState(2);
  const [equip, setEquip] = useState<Set<string>>(new Set(["scan", "print"]));

  const equipSum = EQUIP.filter((e) => equip.has(e.id)).reduce((s, e) => s + e.price, 0);
  const total = biz.base + stations * PER_STATION + equipSum;
  const animated = useAnimatedNumber(total);

  const toggle = (id: string) =>
    setEquip((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const fill = `${((stations - 1) / 7) * 100}%`;

  return (
    <section id="calc" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScreenHead
          kicker="03 · калькулятор"
          accent="#b18cff"
          title={
            <>
              Смета в <span className="text-[#b18cff]">реальном времени</span>
            </>
          }
          sub="Подвигайте ползунки — итог пересчитается мгновенно. Ровно эту сумму мы зафиксируем в договоре."
        />

        <div className="glass mt-14 grid gap-12 rounded-3xl p-8 md:p-12 lg:grid-cols-2">
          {/* управление */}
          <div>
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/40">Тип бизнеса</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {BIZ.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBiz(b)}
                  aria-pressed={biz.id === b.id}
                  className={`rounded-2xl border px-3 py-3.5 text-[12.5px] font-bold transition-all duration-200 ${
                    biz.id === b.id
                      ? "border-cy bg-cy/12 text-cy shadow-[0_0_24px_-6px_rgba(0,245,212,0.5)]"
                      : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {b.label}
                  <span className="mt-1 block font-mono text-[10.5px] font-medium opacity-70">{b.base} BYN</span>
                </button>
              ))}
            </div>

            <div className="mt-9">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/40">
                  Кассовых станций
                </p>
                <p className="rounded-lg border border-cy/40 bg-cy/10 px-3 py-1 font-mono text-sm font-bold text-cy">{stations}</p>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                value={stations}
                onChange={(e) => setStations(Number(e.target.value))}
                className="neon-range mt-4"
                style={{ "--fill": fill } as React.CSSProperties}
                aria-label="Количество кассовых станций"
              />
              <div className="mt-2 flex justify-between font-mono text-[10px] text-white/30">
                <span>1</span>
                <span>+{PER_STATION} BYN за станцию</span>
                <span>8</span>
              </div>
            </div>

            <p className="mt-9 font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/40">Оборудование</p>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {EQUIP.map((e) => {
                const on = equip.has(e.id);
                return (
                  <button
                    key={e.id}
                    onClick={() => toggle(e.id)}
                    aria-pressed={on}
                    className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                      on ? "border-cy/60 bg-cy/8" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
                          on ? "border-cy bg-cy text-[#06251f]" : "border-white/25"
                        }`}
                      >
                        {on && <CheckIcon className="h-3 w-3" />}
                      </span>
                      <span className={`text-[12.5px] font-semibold ${on ? "text-white" : "text-white/60"}`}>{e.label}</span>
                    </span>
                    <span className={`font-mono text-[11.5px] font-bold ${on ? "text-cy" : "text-white/40"}`}>+{e.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* итог */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-carbon2/80 p-7 md:p-8">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/40">Ваша смета</p>
            <dl className="mt-5 space-y-3 font-mono text-[12.5px]">
              <div className="flex justify-between gap-4">
                <dt className="text-white/55">ПО «{biz.label}» · Microinvest</dt>
                <dd className="font-bold text-white">{biz.base.toLocaleString("ru-RU")} BYN</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/55">Монтаж и пусконаладка · {stations} шт.</dt>
                <dd className="font-bold text-white">{(stations * PER_STATION).toLocaleString("ru-RU")} BYN</dd>
              </div>
              {EQUIP.filter((e) => equip.has(e.id)).map((e) => (
                <div key={e.id} className="flex justify-between gap-4">
                  <dt className="text-white/55">{e.label}</dt>
                  <dd className="font-bold text-white">{e.price.toLocaleString("ru-RU")} BYN</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4">
                <dt className="text-cy">2 месяца обслуживания</dt>
                <dd className="font-bold text-cy">0 BYN</dd>
              </div>
            </dl>
            <div className="my-6 border-t border-dashed border-white/20" />
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/40">Итого под ключ</p>
                <p className="mt-2 font-mono text-[42px] font-bold leading-none text-cy text-glow-cy md:text-[52px]">
                  {animated.toLocaleString("ru-RU")}
                  <span className="ml-2 text-xl text-white/50">BYN</span>
                </p>
              </div>
            </div>
            <p className="mt-4 font-mono text-[10.5px] text-white/35">
              * Оценка предварительная. Точная смета — после бесплатного аудита объекта.
            </p>
            <a
              href="#contacts"
              onClick={spawnRipple}
              className="relative mt-7 overflow-hidden rounded-2xl bg-cy px-7 py-4 text-center text-sm font-extrabold text-[#06251f] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,245,212,0.6)]"
            >
              Зафиксировать эту смету
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 06 · Портфолио (parallax) ---------- */
const SPEEDS = [-6, 7, 5, -7, 6];

function Portfolio() {
  return (
    <section id="cases" className="relative border-y border-white/8 bg-carbon2/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScreenHead
          kicker="04 · портфолио"
          accent="#00f5d4"
          title={
            <>
              Автоматизированные <span className="text-cy text-glow-cy">объекты</span>
            </>
          }
          sub="Магазины, кафе и корпоративные столовые по всей Беларуси. Фото двигаются с разной скоростью — просто листайте."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {CASES.map((c, i) => (
            <Reveal key={c.name} delay={i * 70} className={i % 2 === 1 ? "md:mt-16" : ""}>
              <figure data-speed={SPEEDS[i % SPEEDS.length]} className="group relative overflow-hidden rounded-2xl border border-white/8 will-change-transform">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-72 w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 md:h-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" aria-hidden />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <span className="rounded-md border border-cy/40 bg-carbon/70 px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-cy backdrop-blur-sm">
                      {c.type}
                    </span>
                    <p className="mt-2.5 font-inter text-[16px] font-bold leading-snug text-white">{c.name}</p>
                    <p className="mt-1 font-mono text-[11px] text-white/55">
                      {c.city} · {c.metrics[0].k}: <span className="text-cy">{c.metrics[0].v}</span>
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 07 · Отзывы (drag-карусель) ---------- */
function Reviews({ reduced }: { reduced: boolean }) {
  const n = REVIEWS.length;
  const [idx, setIdx] = useState(0);
  const [dx, setDx] = useState(0);
  const [step, setStep] = useState(450);
  const [hover, setHover] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const startX = useRef(0);
  const vp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      const el = vp.current?.querySelector<HTMLElement>("[data-slide]");
      if (el) setStep(el.offsetWidth + 20);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reduced || hover || isDrag) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % n), 4500);
    return () => window.clearInterval(id);
  }, [reduced, hover, isDrag, n]);

  return (
    <section id="reviews" className="relative overflow-hidden py-24 md:py-32">
      <ParticleField className="pointer-events-none absolute inset-0 h-full w-full opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <ScreenHead
            kicker="05 · отзывы"
            accent="#ff006e"
            title={
              <>
                Что говорят <span className="text-mg">владельцы</span>
              </>
            }
          />
          <div className="flex gap-3">
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              aria-label="Предыдущий отзыв"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white/70 transition-all duration-200 hover:border-cy hover:text-cy active:scale-95"
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
            </button>
            <button
              onClick={() => setIdx((i) => Math.min(n - 1, i + 1))}
              aria-label="Следующий отзыв"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white/70 transition-all duration-200 hover:border-cy hover:text-cy active:scale-95"
            >
              <ArrowIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={vp}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onPointerDown={(e) => {
          setIsDrag(true);
          startX.current = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (isDrag) setDx(e.clientX - startX.current);
        }}
        onPointerUp={() => {
          if (!isDrag) return;
          setIsDrag(false);
          if (dx < -60) setIdx((i) => Math.min(n - 1, i + 1));
          else if (dx > 60) setIdx((i) => Math.max(0, i - 1));
          setDx(0);
        }}
        onPointerCancel={() => {
          setIsDrag(false);
          setDx(0);
        }}
        className="mt-12 cursor-grab select-none overflow-hidden [touch-action:pan-y] active:cursor-grabbing"
      >
        <div
          className="flex gap-5 px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
          style={{
            transform: `translateX(${-idx * step + dx}px)`,
            transition: isDrag ? "none" : "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {REVIEWS.map((r) => (
            <article key={r.name} data-slide className="glass w-[86vw] max-w-[430px] shrink-0 rounded-2xl p-8">
              <div className="flex gap-1 text-amber" aria-label="Оценка 5 из 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-white/70">{r.text}</p>
              <p className="mt-6 border-t border-dashed border-white/15 pt-4 font-inter text-[13.5px] font-bold text-white">{r.name}</p>
              <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/40">{r.role}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {REVIEWS.map((r, i) => (
          <button
            key={r.name}
            onClick={() => setIdx(i)}
            aria-label={`Отзыв ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-8 bg-cy shadow-[0_0_10px_rgba(0,245,212,0.7)]" : "w-3 bg-white/20 hover:bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- 08 · FAQ ---------- */
function FaqNeon() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative border-t border-white/8 bg-carbon2/50 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <ScreenHead
                kicker="06 · faq"
                accent="#b18cff"
                title={
                  <>
                    Вопросы <span className="text-[#b18cff]">до внедрения</span>
                  </>
                }
                sub="То, что чаще всего спрашивают владельцы магазинов и кафе. Не нашли ответ — звоните, это быстро."
              />
              <a
                href="tel:+375296154200"
                className="group mt-9 inline-flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.03] px-6 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cy/60"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cy/12 text-cy transition-colors duration-300 group-hover:bg-cy group-hover:text-[#06251f]">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">горячая линия</span>
                  <span className="block font-mono text-[15px] font-bold text-white">{CONTACTS.phone1}</span>
                </span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={f.q}
                    className={`glass rounded-2xl transition-all duration-300 ${isOpen ? "border-cy/50 shadow-[0_0_36px_-14px_rgba(0,245,212,0.5)]" : "hover:border-white/20"}`}
                  >
                    <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left">
                      <span className="flex items-center gap-4">
                        <span className="font-mono text-[11px] font-bold text-mg">0{i + 1}</span>
                        <span className="font-inter text-[14.5px] font-bold leading-snug text-white">{f.q}</span>
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                          isOpen ? "rotate-45 border-cy bg-cy text-[#06251f]" : "border-white/15 text-white/60"
                        }`}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </span>
                    </button>
                    <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="min-h-0 overflow-hidden">
                        <p className="px-6 pb-6 pl-[4.2rem] text-[13.5px] leading-relaxed text-white/60">{f.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 09 · CTA + форма ---------- */
type Form = { name: string; phone: string; biz: string; msg: string; agree: boolean };

function CtaForm() {
  const [form, setForm] = useState<Form>({ name: "", phone: "", biz: "Магазин / торговля", msg: "", agree: false });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Partial<Record<keyof Form, string>> = {};
    if (form.name.trim().length < 2) er.name = "Укажите имя";
    if (!/^\+?[\d\s\-()]{9,18}$/.test(form.phone.trim())) er.phone = "Формат: +375 (__) ___-__-__";
    if (!form.agree) er.agree = "Нужно согласие на обработку данных";
    setErrors(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  const rows = [
    { icon: PhoneIcon, label: "телефон", value: CONTACTS.phone1, href: "tel:+375296154200" },
    { icon: MailIcon, label: "почта", value: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
    { icon: PinIcon, label: "офис", value: CONTACTS.address },
    { icon: ClockIcon, label: "график", value: CONTACTS.hours },
  ];

  return (
    <section id="contacts" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -right-40 top-0 h-[480px] w-[480px] rounded-full bg-vl/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full bg-cy/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2">
        <div>
          <ScreenHead
            kicker="07 · контакты"
            accent="#00f5d4"
            title={
              <>
                Обсудим ваш объект <span className="text-cy text-glow-cy">сегодня?</span>
              </>
            }
            sub="Оставьте заявку — перезвоним в течение рабочего дня, уточним задачи и зафиксируем смету. Бесплатный выезд по Минску и областным центрам."
          />
          <div className="mt-9 space-y-3">
            {rows.map((r) => {
              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] text-cy transition-all duration-300 group-hover:border-cy group-hover:shadow-[0_0_20px_rgba(0,245,212,0.35)]">
                    <r.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{r.label}</span>
                    <span className="block font-mono text-[13.5px] font-bold text-white">{r.value}</span>
                  </span>
                </>
              );
              return r.href ? (
                <a key={r.label} href={r.href} className="group flex items-center gap-4">{inner}</a>
              ) : (
                <div key={r.label} className="group flex items-center gap-4">{inner}</div>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-3xl p-8 md:p-9">
          {sent ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <span className="animate-pop flex h-20 w-20 items-center justify-center rounded-full border border-cy/50 bg-cy/12 text-cy shadow-[0_0_40px_rgba(0,245,212,0.4)]">
                <CheckIcon className="h-9 w-9" />
              </span>
              <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-cy">✓ заявка принята</p>
              <h3 className="mt-3 font-inter text-xl font-extrabold text-white">Спасибо, {form.name.trim()}!</h3>
              <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-white/55">
                Менеджер свяжется по номеру <span className="font-mono font-bold text-white">{form.phone}</span> в течение рабочего дня и подберёт конфигурацию.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", phone: "", biz: "Магазин / торговля", msg: "", agree: false });
                }}
                className="mt-7 rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-cy hover:text-cy"
              >
                Отправить ещё одну
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3 className="font-inter text-lg font-extrabold text-white">Заявка на автоматизацию</h3>
              <div className="relative mt-6">
                <input
                  id="n-name"
                  className={`neon-field ${errors.name ? "!border-mg" : ""}`}
                  placeholder=" "
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
                <label htmlFor="n-name" className="float-label">Ваше имя</label>
                {errors.name && <p className="mt-1.5 font-mono text-[11px] font-bold text-mg">{errors.name}</p>}
              </div>
              <div className="relative mt-4">
                <input
                  id="n-phone"
                  type="tel"
                  className={`neon-field ${errors.phone ? "!border-mg" : ""}`}
                  placeholder=" "
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
                <label htmlFor="n-phone" className="float-label">Телефон</label>
                {errors.phone && <p className="mt-1.5 font-mono text-[11px] font-bold text-mg">{errors.phone}</p>}
              </div>
              <div className="mt-4">
                <label htmlFor="n-biz" className="mb-1.5 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                  Тип бизнеса
                </label>
                <div className="relative">
                  <select id="n-biz" className="neon-field" value={form.biz} onChange={(e) => set("biz", e.target.value)}>
                    {["Магазин / торговля", "Кафе / ресторан / столовая", "Салон красоты / СПА", "Фитнес-клуб", "Боулинг / досуг", "Другое"].map((t) => (
                      <option key={t} className="bg-carbon2">{t}</option>
                    ))}
                  </select>
                  <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cy" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9.5l6 6 6-6" />
                  </svg>
                </div>
              </div>
              <div className="relative mt-4">
                <textarea
                  id="n-msg"
                  rows={3}
                  className="neon-field resize-none"
                  placeholder=" "
                  value={form.msg}
                  onChange={(e) => set("msg", e.target.value)}
                />
                <label htmlFor="n-msg" className="float-label">Комментарий (необязательно)</label>
              </div>
              <label className="mt-4 flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={form.agree} onChange={(e) => set("agree", e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#00f5d4]" />
                <span className="text-[12px] leading-relaxed text-white/50">
                  Согласен(на) на обработку персональных данных по законодательству РБ.
                  {errors.agree && <span className="ml-1 font-bold text-mg">{errors.agree}</span>}
                </span>
              </label>
              <button
                type="submit"
                onClick={spawnRipple}
                className="relative mt-7 w-full overflow-hidden rounded-2xl bg-cy px-7 py-4 text-sm font-extrabold text-[#06251f] transition-shadow duration-300 hover:shadow-[0_0_44px_rgba(0,245,212,0.65)] active:scale-[0.99]"
              >
                Отправить заявку
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- сборка темы + GSAP ScrollTrigger ---------- */
export default function NeonTheme() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      /* scroll-driven «видео»: кадрирование hero по скроллу */
      gsap.fromTo(
        "[data-hero-img]",
        { scale: 1.08 },
        {
          scale: 1.26,
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
        }
      );
      /* аннотации появляются по мере скролла */
      gsap.utils.toArray<HTMLElement>("[data-pin]").forEach((pin, i) => {
        gsap.fromTo(
          pin,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "[data-hero]",
              start: `top+=${140 + i * 180} top`,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      /* parallax: элементы с data-speed */
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const sp = parseFloat(el.dataset.speed || "0");
        gsap.to(el, {
          yPercent: sp,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={rootRef} className="relative overflow-x-clip bg-carbon font-body text-white">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(1100px_560px_at_82%_-8%,rgba(131,56,236,0.16),transparent_60%),radial-gradient(900px_500px_at_-8%_34%,rgba(0,245,212,0.07),transparent_55%)]"
        aria-hidden
      />
      <NeonNav />
      <main className="relative z-10">
        <NeonHero reduced={reduced} />
        <StatsBar />
        <Products />
        <Process reduced={reduced} />
        <Calculator />
        <Portfolio />
        <Reviews reduced={reduced} />
        <FaqNeon />
        <CtaForm />
      </main>
      <NeonFooter />
    </div>
  );
}
