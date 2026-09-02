import { createContext, useContext, useEffect, useState } from "react";

export type ThemeId = "neon" | "paper";

export interface ThemeMeta {
  id: ThemeId;
  name: string;
  desc: string;
  swatch: [string, string, string, string];
  tags: string[];
  version: string;
}

export const THEMES: ThemeMeta[] = [
  {
    id: "neon",
    name: "NeonPOS",
    desc: "Тёмная тема: графит, неоновые акценты, glassmorphism и scroll-анимации. Калькулятор сметы, parallax-портфолио.",
    swatch: ["#0d1117", "#00f5d4", "#ff006e", "#8338ec"],
    tags: ["Тёмная", "Неон", "Бесплатно"],
    version: "1.2.0",
  },
  {
    id: "paper",
    name: "Microinvest Business",
    desc: "Чистая белая бизнес-тема: блог с рубриками и комментариями, виджеты, каталог с табами, зелёно-оранжевые акценты.",
    swatch: ["#ffffff", "#0f7a4d", "#f0641e", "#ffc24b"],
    tags: ["Белая", "Бизнес", "Бесплатно"],
    version: "2.5.0",
  },
];

const ThemeCtx = createContext<{ theme: ThemeId; setTheme: (t: ThemeId) => void }>({
  theme: "paper",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeCtx);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    try {
      const saved = localStorage.getItem("mi-theme-v2");
      return saved === "paper" || saved === "neon" ? saved : "paper";
    } catch {
      return "paper";
    }
  });

  const setTheme = (t: ThemeId) => {
    setThemeState(t);
    try {
      localStorage.setItem("mi-theme-v2", t);
    } catch {
      /* noop */
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [theme]);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

/** Панель выбора темы в стиле «Внешний вид → Темы» WordPress */
export function ThemePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { theme, setTheme } = useTheme();
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[84]" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-label="Выбор темы оформления"
        className="animate-pop fixed right-3 top-12 z-[85] w-[min(94vw,400px)] rounded-xl border border-[#3c434a] bg-[#1d2327] p-4 text-[#c3c4c7] shadow-2xl md:right-5 md:top-10"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-bold text-white">Темы · WordPress</p>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[#2c3338] hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
          {THEMES.map((t) => {
            const active = theme === t.id;
            return (
              <div
                key={t.id}
                className={`rounded-lg border p-3.5 transition-colors ${
                  active ? "border-[#2271b1] bg-[#2271b1]/10" : "border-[#3c434a] bg-[#2c3338]/40 hover:border-[#50575e]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* мини-превью темы */}
                  <div
                    className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md border border-black/40"
                    style={{ background: t.swatch[0] }}
                    aria-hidden
                  >
                    <span className="absolute left-1.5 top-1.5 h-1.5 w-8 rounded-full" style={{ background: t.swatch[1] }} />
                    <span className="absolute left-1.5 top-4 h-1 w-12 rounded-full bg-white/25" />
                    <span className="absolute left-1.5 top-6.5 h-1 w-9 rounded-full bg-white/15" />
                    <span className="absolute bottom-1.5 left-1.5 h-2.5 w-7 rounded-sm" style={{ background: t.swatch[2] }} />
                    <span className="absolute bottom-1.5 right-1.5 h-2.5 w-2.5 rounded-full" style={{ background: t.swatch[3] }} />
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-[13px] font-bold text-white">
                      {t.name}
                      <span className="font-mono text-[10px] font-medium text-[#8c8f94]">v{t.version}</span>
                      {active && (
                        <span className="rounded-full bg-[#00a32a] px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-white">
                          Активна
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 flex flex-wrap gap-1">
                      {t.tags.map((tag) => (
                        <span key={tag} className="rounded-sm bg-[#3c434a] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-[#c3c4c7]">
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                <p className="mt-2.5 text-[11.5px] leading-relaxed text-[#9ea2a7]">{t.desc}</p>
                <button
                  onClick={() => {
                    setTheme(t.id);
                    onClose();
                  }}
                  disabled={active}
                  className={`mt-3 w-full rounded-md px-4 py-2 text-[12.5px] font-bold transition-all ${
                    active
                      ? "cursor-default bg-[#2c3338] text-[#8c8f94]"
                      : "bg-[#2271b1] text-white hover:bg-[#135e96] active:scale-[0.98]"
                  }`}
                >
                  {active ? "Используется сейчас" : "Активировать"}
                </button>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-center font-mono text-[10px] text-[#8c8f94]">
          Бесплатные темы · каталог wordpress.org/themes
        </p>
      </div>
    </>
  );
}
