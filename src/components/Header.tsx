import { useEffect, useState } from "react";
import { CONTACTS, NAV } from "../data";
import { BurgerIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon, XIcon } from "./Icons";

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-3">
      <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-pine transition-colors duration-300 group-hover:bg-moss">
        {/* зубчатый край чека + M */}
        <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden>
          <path d="M0 0h40v6l-4 3 4 3v6l-4 3 4 3v6l-4 3 4 3v6H0v-6l4-3-4-3v-6l4-3-4-3V9l4-3-4-3z" fill="#fcfcf7" opacity="0.16" />
          <path
            d="M9 28V13l6 8 6-8v15M26 28V13h3.5a3.5 3.5 0 010 7H26"
            fill="none"
            stroke="#fcfcf7"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[15px] font-bold tracking-tight text-ink">
          МИКРО<span className="text-pine">ИНВЕСТ</span>
        </span>
        <span className="mt-1 block font-mono text-[9px] font-medium uppercase tracking-[0.3em] text-ink/45">
          склад pro · by
        </span>
      </span>
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="top">
      {/* верхняя служебная полоса */}
      <div className="hidden bg-moss text-tape md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-2 font-mono text-[11px] tracking-wide text-tape/85">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <PinIcon className="h-3.5 w-3.5 text-fern" />
              {CONTACTS.address}
            </span>
            <span className="flex items-center gap-2">
              <ClockIcon className="h-3.5 w-3.5 text-fern" />
              {CONTACTS.hours}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`mailto:${CONTACTS.email}`} className="flex items-center gap-2 transition-colors hover:text-amber">
              <MailIcon className="h-3.5 w-3.5 text-fern" />
              {CONTACTS.email}
            </a>
            <a href="tel:+375296154200" className="flex items-center gap-2 font-bold text-amber transition-colors hover:text-tape">
              <PhoneIcon className="h-3.5 w-3.5" />
              {CONTACTS.phone1}
            </a>
          </div>
        </div>
      </div>

      {/* основная шапка */}
      <header
        className={`sticky top-0 z-50 border-b border-ink/10 bg-paper/92 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(20,32,26,0.45)]" : ""
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 transition-all duration-300 ${
            scrolled ? "py-2.5" : "py-4"
          }`}
        >
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative text-[13.5px] font-semibold text-ink/70 transition-colors hover:text-ink"
              >
                {n.label}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-tang transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#contacts"
              className="group hidden items-center gap-2.5 rounded-lg bg-ink px-5 py-2.5 text-[13px] font-bold text-tape transition-all duration-300 hover:bg-pine hover:shadow-[0_10px_25px_-12px_rgba(15,122,77,0.8)] sm:flex"
            >
              Оставить заявку
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h15M13.5 5.5L20 12l-6.5 6.5" />
              </svg>
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

        {/* мобильное меню */}
        <div
          className={`grid overflow-hidden transition-all duration-300 lg:hidden ${
            open ? "grid-rows-[1fr] border-t border-ink/10" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <nav className="flex flex-col px-6 py-4" aria-label="Мобильная навигация">
              {NAV.map((n, i) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-ink/8 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:text-pine"
                >
                  {n.label}
                  <span className="font-mono text-[10px] text-ink/30">0{i + 1}</span>
                </a>
              ))}
              <a
                href="#contacts"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-lg bg-pine px-5 py-3 text-center text-sm font-bold text-tape"
              >
                Оставить заявку
              </a>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}
