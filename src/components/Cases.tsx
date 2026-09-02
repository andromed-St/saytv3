import { CASES, REGIONS } from "../data";
import { useCountUp, useInView } from "../lib/hooks";
import { Reveal, SectionHead } from "./ui";
import { PinIcon, ArrowIcon } from "./Icons";

function RegionStat({ city, count, inView, delay }: { city: string; count: number; inView: boolean; delay: number }) {
  const v = useCountUp(count, inView, 1200 + delay);
  return (
    <div className="group flex items-center justify-between gap-4 rounded-xl border border-ink/12 bg-tape px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-pine/60">
      <div>
        <p className="flex items-center gap-2 text-[13.5px] font-bold text-ink">
          <PinIcon className="h-4 w-4 text-tang" />
          {city}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">автоматизированных объектов</p>
      </div>
      <p className="font-display text-2xl font-bold text-pine md:text-[28px]">{v}+</p>
    </div>
  );
}

export default function Cases() {
  const [regRef, regInView] = useInView<HTMLDivElement>();

  return (
    <section id="cases" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Автоматизированные объекты"
          title={
            <>
              От киоска до корпоративной столовой — <span className="text-pine">по всей Беларуси</span>
            </>
          }
          desc="Партнёрская сеть Microinvest работает в четырёх областных центрах. Вот лишь несколько объектов, которые мы запустили за последние годы."
        />

        <div ref={regRef} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REGIONS.map((r, i) => (
            <Reveal key={r.city} delay={i * 80}>
              <RegionStat city={r.city} count={r.count} inView={regInView} delay={i * 120} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal key={c.name} delay={i * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/12 bg-tape transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-35px_rgba(10,74,47,0.6)]">
                <div className="grid-paper relative h-52 overflow-hidden bg-mist">
                  <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-md bg-ink/80 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-tape backdrop-blur-sm">
                    {c.type}
                  </span>
                  <span className="absolute bottom-3 right-4 rounded-md bg-amber px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-ink">
                    {c.city}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[16px] font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-pine">
                    {c.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink/62">{c.desc}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-dashed border-ink/20 pt-4">
                    {c.metrics.map((m) => (
                      <div key={m.k}>
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/45">{m.k}</p>
                        <p className="font-display text-[15px] font-bold text-ink">{m.v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <a
            href="#contacts"
            className="group mx-auto mt-10 flex w-fit items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-pine transition-colors hover:text-moss"
          >
            Хочу так же — обсудить мой объект
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
