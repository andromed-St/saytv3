import { useRef, useState } from "react";
import { FAQ, PARTNERS, REVIEWS } from "../data";
import { Reveal, SectionHead } from "./ui";
import { ArrowIcon, PlusIcon, StarIcon, PhoneIcon } from "./Icons";
import { CONTACTS } from "../data";

function Reviews() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * 400, behavior: "smooth" });

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Отзывы клиентов"
            title={
              <>
                Что говорят <span className="text-pine">владельцы объектов</span>
              </>
            }
          />
          <Reveal delay={120}>
            <div className="flex gap-2.5">
              <button
                onClick={() => scroll(-1)}
                aria-label="Предыдущие отзывы"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-ink/15 text-ink transition-all duration-200 hover:border-pine hover:bg-pine hover:text-tape active:scale-95"
              >
                <ArrowIcon className="h-4 w-4 rotate-180" />
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Следующие отзывы"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-ink/15 text-ink transition-all duration-200 hover:border-pine hover:bg-pine hover:text-tape active:scale-95"
              >
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={150}>
        <div ref={track} className="snap-scroll mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="group relative min-w-[300px] snap-start rounded-2xl border border-ink/12 bg-tape p-7 transition-all duration-300 hover:-translate-y-1 hover:border-pine/60 md:min-w-[380px]"
            >
              <span className="absolute right-6 top-5 font-display text-5xl font-extrabold text-mist leading-none select-none" aria-hidden>
                ”
              </span>
              <div className="flex gap-1 text-amber" aria-label="Оценка 5 из 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-4 pr-8 text-[14px] leading-relaxed text-ink/75">{r.text}</blockquote>
              <figcaption className="mt-5 border-t border-dashed border-ink/20 pt-4">
                <p className="font-display text-[13.5px] font-bold text-ink">{r.name}</p>
                <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/45">{r.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Partners() {
  return (
    <section className="border-y border-ink/10 bg-tape py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.24em] text-ink/40">
            Работаем с оборудованием и платформами
          </p>
          <ul className="flex flex-wrap items-center gap-3">
            {PARTNERS.map((p) => (
              <li
                key={p}
                className="cursor-default rounded-lg border border-ink/12 px-4 py-2 font-display text-[12px] font-semibold text-ink/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-pine hover:text-pine"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHead
                eyebrow="Вопросы и ответы"
                title={
                  <>
                    Спрашивают <span className="text-pine">до внедрения</span>
                  </>
                }
                desc="Собрали вопросы, которые чаще всего задают владельцы магазинов и кафе. Не нашли свой — позвоните, ответим за пару минут."
              />
              <Reveal delay={180}>
                <a
                  href="tel:+375296154200"
                  className="group mt-8 inline-flex items-center gap-4 rounded-xl border border-ink/15 bg-tape px-6 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-pine"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-pine/10 text-pine transition-colors duration-300 group-hover:bg-pine group-hover:text-tape">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">горячая линия</span>
                    <span className="block font-display text-[15px] font-bold text-ink">{CONTACTS.phone1}</span>
                  </span>
                </a>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const isOpen = open === i;
                return (
                  <Reveal key={f.q} delay={Math.min(i * 60, 240)}>
                    <div
                      className={`rounded-xl border transition-colors duration-300 ${
                        isOpen ? "border-pine bg-tape" : "border-ink/12 bg-tape/70 hover:border-ink/30"
                      }`}
                    >
                      <button
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                      >
                        <span className="flex items-center gap-4">
                          <span className="font-mono text-[11px] font-bold text-tang">0{i + 1}</span>
                          <span className="font-display text-[14.5px] font-bold leading-snug text-ink">{f.q}</span>
                        </span>
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                            isOpen ? "rotate-45 border-pine bg-pine text-tape" : "border-ink/15 text-ink/50"
                          }`}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </span>
                      </button>
                      <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <div className="min-h-0 overflow-hidden">
                          <p className="px-6 pb-6 pl-[4.4rem] text-[13.5px] leading-relaxed text-ink/65">{f.a}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Trust() {
  return (
    <>
      <Reviews />
      <Partners />
      <Faq />
    </>
  );
}
