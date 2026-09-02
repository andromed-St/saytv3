import { useState } from "react";
import { CONTACTS, POSTS } from "../data";
import { Barcode } from "./ui";
import { ArrowIcon } from "./Icons";

export default function WpFooter() {
  const [year] = useState(new Date().getFullYear());

  return (
    <footer className="bg-screen text-tape/70">
      <div className="mx-auto max-w-7xl px-6 pt-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-lg font-bold text-tape">
              МИКРО<span className="text-fern">ИНВЕСТ</span>
            </p>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-tape/55">
              Автоматизация торговли, кафе и ресторанов на платформе Microinvest. Программное обеспечение,
              торговое оборудование, внедрение и поддержка — по всей Республике Беларусь.
            </p>
            <Barcode className="mt-7 h-9 w-44 text-tape/35" label="MICROINVEST · SINCE 2008" />
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-tape/40">Свежие записи</p>
            <ul className="mt-4 space-y-3">
              {POSTS.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <a href="#blog" className="group block">
                    <span className="block text-[13px] font-semibold leading-snug text-tape/75 transition-colors group-hover:text-amber">
                      {p.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] text-tape/35">{p.date}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-tape/40">Разделы</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {[
                ["Решения", "#solutions"],
                ["Каталог", "#catalog"],
                ["Преимущества", "#why"],
                ["Объекты", "#cases"],
                ["Блог", "#blog"],
                ["Вопрос-ответ", "#faq"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="transition-colors hover:text-amber">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-tape/40">Контакты</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li>
                <a href="tel:+375296154200" className="font-bold text-tape transition-colors hover:text-amber">
                  {CONTACTS.phone1}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACTS.email}`} className="transition-colors hover:text-amber">
                  {CONTACTS.email}
                </a>
              </li>
              <li className="text-tape/55">{CONTACTS.address}</li>
              <li className="text-tape/55">{CONTACTS.hours}</li>
            </ul>
            <a
              href="https://microinvest.by"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-lg border border-tape/20 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-tape/70 transition-all hover:border-amber hover:text-amber"
            >
              microinvest.by ↗
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-tape/10 py-6 font-mono text-[11px] text-tape/40">
          <p>
            © 2008–{year} ООО «Микроинвест» · {CONTACTS.unp}
          </p>
          <p className="flex items-center gap-2">
            Сайт работает на{" "}
            <span className="flex items-center gap-1.5 text-tape/70">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#3858e9]" fill="currentColor" aria-hidden>
                <circle cx="12" cy="12" r="10" opacity="0.25" />
                <path d="M5.5 8.5h1.8l2.6 7.4 2.1-5.4 2.1 5.4 2.6-7.4h1.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              WordPress
            </span>
            · Тема: <span className="text-fern">Microinvest Business</span>
          </p>
          <a
            href="#top"
            aria-label="Наверх"
            className="group flex h-10 w-10 items-center justify-center rounded-lg border border-tape/20 transition-all hover:border-amber hover:text-amber"
          >
            <ArrowIcon className="h-4 w-4 -rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
