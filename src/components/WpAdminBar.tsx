import { useState } from "react";
import { POSTS } from "../data";

const totalComments = POSTS.reduce((s, p) => s + p.comments.length, 0);

function WpLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M5.5 8.5h1.8l2.6 7.4 2.1-5.4 2.1 5.4 2.6-7.4h1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function WpAdminBar() {
  const [toast, setToast] = useState<string | null>(null);

  const demo = (what: string) => {
    setToast(`Демо-версия темы: ${what} доступно в консоли WordPress`);
    window.setTimeout(() => setToast(null), 2600);
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[80] h-[46px] bg-[#1d2327] font-body text-[13px] text-[#c3c4c7] md:h-8">
        <div className="mx-auto flex h-full max-w-none items-center justify-between px-3 md:px-4">
          <div className="flex h-full items-center gap-1">
            <a
              href="#top"
              className="flex h-full items-center gap-2 px-2 transition-colors hover:bg-[#2c3338] hover:text-white"
              aria-label="Перейти на сайт"
            >
              <WpLogo className="h-5 w-5" />
              <span className="hidden font-semibold sm:inline">Микроинвест</span>
            </a>
            <a
              href="#blog"
              className="group flex h-full items-center gap-1.5 px-2 transition-colors hover:bg-[#2c3338] hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M4 5h16v10.5H9.5L5 19.5v-4H4z" strokeLinejoin="round" />
              </svg>
              <span className="hidden sm:inline">Комментарии</span>
              <span className="rounded-full bg-[#3c434a] px-1.5 py-0.5 font-mono text-[10.5px] leading-none text-white">
                {totalComments}
              </span>
            </a>
            <div className="group relative h-full">
              <button
                onClick={() => demo("создание записей")}
                className="flex h-full items-center gap-1.5 px-2 transition-colors hover:bg-[#2c3338] hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M12 8.5v7M8.5 12h7" strokeLinecap="round" />
                </svg>
                <span className="hidden sm:inline">Добавить</span>
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M6 9.5l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="pointer-events-none absolute left-0 top-full w-48 translate-y-0 bg-[#2c3338] py-1.5 opacity-0 shadow-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                {["Запись", "Страницу", "Медиафайл", "Пользователя"].map((item) => (
                  <button
                    key={item}
                    onClick={() => demo(`добавление: ${item.toLowerCase()}`)}
                    className="block w-full px-4 py-1.5 text-left text-[13px] text-[#c3c4c7] transition-colors hover:bg-[#2271b1] hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden h-full items-center gap-2 md:flex">
            <a
              href="#top"
              className="flex h-full items-center gap-2 px-2 transition-colors hover:bg-[#2c3338] hover:text-white"
            >
              <span>Привет, admin</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2271b1] font-display text-[11px] font-bold text-white">
                А
              </span>
            </a>
          </div>
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="animate-pop fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-md border border-[#3c434a] bg-[#1d2327] px-5 py-3 text-[13px] font-semibold text-white shadow-2xl"
        >
          {toast}
        </div>
      )}
    </>
  );
}
