import { NEWS, STEPS } from "../data";
import { Reveal, SectionHead } from "./ui";
import { ArrowIcon } from "./Icons";

/* реальные страницы новостей на microinvest.by */
const NEWS_URLS = [
  "https://microinvest.by/news_detail/id-36/%D0%9E%D0%B1%D0%BC%D0%B5%D0%BD-%D0%9C%D0%B8%D0%BA%D1%80%D0%BE%D0%B8%D0%BD%D0%B2%D0%B5%D1%81%D1%82-%D1%81-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%D0%BE%D0%BC-%D0%BD%D0%B0-%D0%B1%D0%B0%D0%B7%D0%B5-OpenCart-.htm",
  "https://microinvest.by/news_detail/id-31/%D0%9A%D0%B0%D0%BA-%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D1%8C%D0%BD%D0%BE-%D0%BE%D1%80%D0%B3%D0%B0%D0%BD%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-%D0%BE%D1%81%D0%B2%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD%D0%B0-.htm",
  "https://microinvest.by/news_detail/id-33/%D0%9E%D1%80%D0%B8%D0%B5%D0%BD%D1%82%D0%B8%D1%80%D1%83%D0%B9%D1%82%D0%B5-%D0%B8-%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D1%8F%D0%B9%D1%82%D0%B5-%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82%D0%BE%D0%B2-.htm",
  "https://microinvest.by/news_detail/id-32/%D0%9A%D0%B0%D0%BA-%D0%BD%D0%B0%D0%B1%D0%B8%D1%82%D1%8C-%D0%B1%D0%B0%D0%B7%D1%83-%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D0%BE%D0%B2-%D0%B1%D1%8B%D1%81%D1%82%D1%80%D0%BE-.htm",
];

export default function Flow() {
  return (
    <>
      {/* ШАГИ ВНЕДРЕНИЯ */}
      <section id="how" className="relative scroll-mt-24 border-y border-ink/10 bg-mist/45 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="Внедрение"
              title={
                <>
                  От заявки до первого чека — <span className="text-pine">1–3 дня</span>
                </>
              }
            />
            <Reveal delay={120}>
              <p className="max-w-xs border-l-2 border-tang pl-4 text-[13px] leading-relaxed text-ink/60">
                «Нет каких-либо подводных камней. Все цены фиксированы» — так мы работаем с 2008 года.
              </p>
            </Reveal>
          </div>

          <div className="relative mt-14">
            {/* пунктирная нить */}
            <div className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-ink/20 lg:block" aria-hidden />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 110}>
                  <div className="group relative">
                    <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-ink bg-paper font-display text-lg font-bold text-ink transition-all duration-300 group-hover:-translate-y-1 group-hover:border-pine group-hover:bg-pine group-hover:text-tape">
                      {s.n}
                    </span>
                    <h3 className="mt-5 font-display text-[15.5px] font-bold text-ink">{s.title}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/62">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* НОВОСТИ */}
      <section id="news" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="Новости и советы"
              title={
                <>
                  Пишем о ритейле <span className="text-pine">без воды</span>
                </>
              }
            />
            <Reveal delay={120}>
              <a
                href="https://microinvest.by/news/News.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-pine transition-colors hover:text-moss"
              >
                Все новости
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {NEWS.map((n, i) => (
              <Reveal key={n.title} delay={(i % 2) * 100 + Math.floor(i / 2) * 60}>
                <a
                  href={NEWS_URLS[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-xl border border-ink/12 bg-tape p-7 transition-all duration-300 hover:-translate-y-1 hover:border-pine/60 hover:shadow-[0_24px_50px_-30px_rgba(10,74,47,0.55)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold tracking-[0.1em] text-ink/45">{n.date}</span>
                    <span className="rounded-md bg-pine/10 px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-pine">
                      {n.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[16.5px] font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-pine">
                    {n.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink/62">{n.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-tang">
                    Читать на microinvest.by
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
