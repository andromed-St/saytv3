import { useState } from "react";
import { EQUIPMENT, SOFTWARE, Product } from "../data";
import { Reveal, SectionHead } from "./ui";
import { ArrowIcon } from "./Icons";

type Tab = "soft" | "hard";

function Badge({ kind }: { kind: NonNullable<Product["badge"]> }) {
  const cls =
    kind === "Хит"
      ? "bg-tang text-tape"
      : kind === "Новинка"
      ? "bg-amber text-ink"
      : "bg-pine text-tape";
  return (
    <span className={`absolute right-4 top-4 rounded-md px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] ${cls}`}>
      {kind}
    </span>
  );
}

function ProductCard({ p, i }: { p: Product; i: number }) {
  return (
    <article
      className="group animate-pop relative flex flex-col rounded-xl border border-ink/12 bg-tape p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-pine/60 hover:shadow-[0_26px_50px_-32px_rgba(10,74,47,0.55)]"
      style={{ animationDelay: `${i * 55}ms` }}
    >
      {p.badge && <Badge kind={p.badge} />}
      <p className="pr-16 font-display text-[15px] font-bold leading-snug text-ink">{p.name}</p>
      <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink/60">{p.desc}</p>
      <div className="mt-6 flex items-end justify-between border-t border-dashed border-ink/20 pt-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">цена</p>
          <p className="font-mono text-lg font-bold text-ink">
            {p.price}
            {p.period ? (
              <span className="ml-1 text-[11px] font-medium text-ink/50">{p.period}</span>
            ) : p.price !== "по запросу" ? (
              <span className="ml-1 text-[11px] font-medium text-ink/50">BYN</span>
            ) : null}
          </p>
        </div>
        <a
          href="#contacts"
          aria-label={`Запросить ${p.name}`}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15 text-ink/50 transition-all duration-300 group-hover:border-pine group-hover:bg-pine group-hover:text-tape"
        >
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

export default function Catalog() {
  const [tab, setTab] = useState<Tab>("soft");
  const items = tab === "soft" ? SOFTWARE : EQUIPMENT;

  return (
    <section id="catalog" className="relative scroll-mt-24 border-y border-ink/10 bg-mist/45 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="Каталог продуктов"
            title={
              <>
                ПО и оборудование — <span className="text-pine">в одном месте</span>
              </>
            }
            desc="Соберите комплект под свой объект: программные модули Microinvest плюс кассовые аппараты, сканеры, весы и POS-терминалы. Всё есть на складе в Минске."
          />

          <div className="flex max-w-full flex-wrap rounded-xl border border-ink/15 bg-tape p-1.5" role="tablist" aria-label="Категории каталога">
            {(
              [
                { id: "soft", label: "Программное обеспечение" },
                { id: "hard", label: "Торговое оборудование" },
              ] as { id: Tab; label: string }[]
            ).map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`whitespace-nowrap rounded-lg px-4 py-2.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] transition-all duration-300 md:px-5 md:text-[11px] ${
                  tab === t.id ? "bg-ink text-tape shadow-md" : "text-ink/55 hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div key={tab} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <ProductCard key={p.name} p={p} i={i} />
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 rounded-xl border border-dashed border-ink/25 bg-tape/70 px-6 py-5 text-center font-mono text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink/60">
            <span>
              Все цены <strong className="text-pine">фиксированы</strong>
            </span>
            <span className="hidden h-1.5 w-1.5 rounded-full bg-tang sm:inline-block" aria-hidden />
            <span>Цены в белорусских рублях, с НДС</span>
            <span className="hidden h-1.5 w-1.5 rounded-full bg-tang sm:inline-block" aria-hidden />
            <span>Доставка и монтаж по всей Беларуси</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
