import { FormEvent, useEffect, useState } from "react";
import { CONTACTS } from "../data";
import { ArrowIcon, BurgerIcon, ClockIcon, MailIcon, PhoneIcon, XIcon } from "./Icons";

type MenuItem = { label: string; href: string; children?: { label: string; href: string }[] };

const MENU: MenuItem[] = [
  { label: "Главная", href: "#top" },
  {
    label: "Решения",
    href: "#solutions",
    children: [
      { label: "Для магазинов", href: "#solutions" },
      { label: "Для кафе и ресторанов", href: "#solutions" },
      { label: "Для сфер досуга", href: "#solutions" },
      { label: "Преимущества Microinvest", href: "#why" },
    ],
  },
  {
    label: "Каталог",
    href: "#catalog",
    children: [
      { label: "Программное обеспечение", href: "#catalog" },
      { label: "Торговое оборудование", href: "#catalog" },
      { label: "Автоматизированные объекты", href: "#cases" },
    ],
  },
  { label: "Блог", href: "#blog" },
  { label: "Вопрос-ответ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

export default function WpHeader({ onSearch }: { onSearch: (q: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(q.trim());
    setSearchOpen(false);
  };

  return (
    <header className="sticky top-[46px] z-50 md:top-8">
      {/* верхняя инфополоса (сворачивается при скролле) */}
      <div
        className={`overflow-hidden bg-moss text-tape transition-all duration-300 ${
          scrolled ? "max-h-0" : "max-h-24"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 font-mono text-[11px] tracking-wide text-tape/85">
          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-2 sm:flex">
              <PhoneIcon className="h-3.5 w-3.5 text-fern" />
              <a href="tel:+375296154200" className="font-bold text-amber transition-colors hover:text-tape">
                {CONTACTS.phone1}
              </a>
            </span>
            <span className="hidden items-center gap-2 md:flex">
              <MailIcon className="h-3.5 w-3.5 text-fern" />
              {CONTACTS.email}
            </span>
          </div>
          <span className="flex items-center gap-2">
            <ClockIcon className="h-3.5 w-3.5 text-fern" />
            {CONTACTS.hours}
          </span>
        </div>
      </div>

      {/* основная полоса */}
      <div className={`border-b border-ink/10 bg-paper/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-[0_12px_30px_-20px_rgba(20,32,26,0.5)]" : ""}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-3.5">
          <a href="#top" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-pine transition-colors duration-300 group-hover:bg-moss">
              <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden>
                <path d="M0 0h40v6l-4 3 4 3v6l-4 3 4 3v6l-4 3 4 3v6H0v-6l4-3-4-3v-6l4-3-4-3V9l4-3-4-3z" fill="#fcfcf7" opacity="0.16" />
                <path d="M9 28V13l6 8 6-8v15M26 28V13h3.5a3.5 3.5 0 010 7H26" fill="none" stroke="#fcfcf7" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="leading-none">
              <span className="block font-display text-[15px] font-bold tracking-tight text-ink">
                МИКРО<span className="text-pine">ИНВЕСТ</span>
              </span>
              <span className="mt-1 block font-mono text-[8.5px] font-medium uppercase tracking-[0.26em] text-ink/45">
                автоматизация · беларусь
              </span>
            </span>
          </a>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Поиск по сайту"
              aria-expanded={searchOpen}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-200 ${
                searchOpen ? "border-pine bg-pine text-tape" : "border-ink/15 text-ink hover:border-pine hover:text-pine"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="M15.5 15.5L21 21" />
              </svg>
            </button>
            <a
              href="#contacts"
              className="group hidden items-center gap-2.5 rounded-lg bg-ink px-5 py-2.5 text-[13px] font-bold text-tape transition-all duration-300 hover:bg-pine sm:flex"
            >
              Оставить заявку
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/15 text-ink transition-colors hover:border-pine hover:text-pine lg:hidden"
            >
              {open ? <XIcon className="h-5 w-5" /> : <BurgerIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* строка поиска */}
        <div className={`grid transition-all duration-300 ${searchOpen ? "grid-rows-[1fr] border-t border-ink/10" : "grid-rows-[0fr]"}`}>
          <div className="min-h-0 overflow-hidden">
            <form onSubmit={submit} className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-3">
              <input
                autoFocus={searchOpen}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Найти запись в блоге: «ЭСЧФ», «OpenCart», «освещение»…"
                className="field"
                aria-label="Поисковый запрос"
              />
              <button type="submit" className="shrink-0 rounded-lg bg-pine px-6 py-3 text-[13px] font-bold text-tape transition-colors hover:bg-moss">
                Искать
              </button>
            </form>
          </div>
        </div>

        {/* меню темы */}
        <nav className="hidden border-t border-ink/10 bg-tape lg:block" aria-label="Меню темы">
          <ul className="mx-auto flex max-w-7xl items-center px-6">
            {MENU.map((m) => (
              <li key={m.label} className="group relative">
                <a
                  href={m.href}
                  className="flex items-center gap-1.5 border-b-2 border-transparent px-4 py-3.5 text-[12.5px] font-bold uppercase tracking-[0.08em] text-ink/70 transition-colors duration-200 hover:border-tang hover:text-ink"
                >
                  {m.label}
                  {m.children && (
                    <svg viewBox="0 0 24 24" className="h-3 w-3 text-ink/40 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9.5l6 6 6-6" />
                    </svg>
                  )}
                </a>
                {m.children && (
                  <div className="pointer-events-none absolute left-0 top-full z-40 w-64 translate-y-2 border border-ink/10 bg-tape opacity-0 shadow-[0_24px_50px_-24px_rgba(20,32,26,0.4)] transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                    {m.children.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        className="flex items-center gap-2.5 border-b border-ink/6 px-4 py-3 text-[13px] font-semibold text-ink/70 transition-colors last:border-0 hover:bg-paper hover:text-pine"
                      >
                        <span className="h-1 w-1 bg-tang" aria-hidden />
                        {c.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <li className="ml-auto">
              <span className="rounded-md bg-amber/20 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink/60">
                тема: Microinvest Business
              </span>
            </li>
          </ul>
        </nav>

        {/* мобильное меню */}
        <div className={`grid overflow-hidden border-ink/10 transition-all duration-300 lg:hidden ${open ? "grid-rows-[1fr] border-t bg-tape" : "grid-rows-[0fr]"}`}>
          <div className="min-h-0 overflow-hidden">
            <div className="px-6 py-4">
              {MENU.map((m, i) => (
                <div key={m.label} className="border-b border-ink/8 last:border-0">
                  <a
                    href={m.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3 text-[14.5px] font-bold text-ink"
                  >
                    {m.label}
                    <span className="font-mono text-[10px] text-ink/30">0{i + 1}</span>
                  </a>
                  {m.children && (
                    <div className="pb-2 pl-4">
                      {m.children.map((c) => (
                        <a key={c.label} href={c.href} onClick={() => setOpen(false)} className="block py-1.5 text-[13px] font-medium text-ink/60 transition-colors hover:text-pine">
                          — {c.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a href="#contacts" onClick={() => setOpen(false)} className="mt-4 block rounded-lg bg-pine px-5 py-3 text-center text-sm font-bold text-tape">
                Оставить заявку
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
