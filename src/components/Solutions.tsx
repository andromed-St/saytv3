import { SOLUTIONS } from "../data";
import { Reveal, SectionHead } from "./ui";
import { CafeIcon, CheckIcon, LeisureIcon, StoreIcon, ArrowIcon } from "./Icons";

const ICONS = { store: StoreIcon, cafe: CafeIcon, leisure: LeisureIcon };

export default function Solutions() {
  return (
    <section id="solutions" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Для вас · решения"
            title={
              <>
                Подбираем систему <span className="text-pine">под вашу сферу</span>
              </>
            }
            desc="Продукты Microinvest созданы для среднего и малого бизнеса: от продуктового магазина у дома до корпоративной столовой. Выберите модуль — остальное настроим мы."
          />
          <Reveal delay={150}>
            <a
              href="#catalog"
              className="group flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-pine transition-colors hover:text-moss"
            >
              Весь каталог
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {SOLUTIONS.map((s, i) => {
            const Icon = ICONS[s.icon];
            if (s.featured) {
              return (
                <Reveal key={s.id} className="lg:col-span-7" delay={i * 90}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-moss p-8 text-tape transition-transform duration-300 hover:-translate-y-1.5 md:p-10">
                    <Icon className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 text-tape/[0.06] transition-transform duration-500 group-hover:rotate-6" />
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-fern/20 text-fern">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-amber">{s.tag}</span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold leading-tight md:text-[28px]">{s.title}</h3>
                    <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-tape/70">{s.desc}</p>
                    <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[13.5px] font-medium text-tape/85">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-fern" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      <a
                        href="#contacts"
                        className="inline-flex items-center gap-2.5 rounded-lg bg-amber px-6 py-3 text-[13px] font-bold text-ink transition-all duration-300 hover:bg-tape"
                      >
                        Обсудить проект
                        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            }
            return (
              <Reveal key={s.id} className="lg:col-span-5" delay={i * 90}>
                <article className="group flex h-full flex-col rounded-2xl border border-ink/12 bg-tape p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-pine/60 hover:shadow-[0_24px_50px_-30px_rgba(10,74,47,0.5)]">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pine/10 text-pine transition-colors duration-300 group-hover:bg-pine group-hover:text-tape">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">{s.tag}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink/65">{s.desc}</p>
                  <ul className="mt-5 space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-[13.5px] font-medium text-ink/75">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-tang" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
