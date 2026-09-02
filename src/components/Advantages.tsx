import { ADVANTAGES } from "../data";
import { Reveal, SectionHead, NumBadge } from "./ui";
import {
  BoxIcon,
  ChipIcon,
  CoinsIcon,
  DocIcon,
  GiftIcon,
  ScaleLawIcon,
  SchemeIcon,
  UserIcon,
  WifiIcon,
} from "./Icons";

const ICONS: Record<string, (p: { className?: string }) => JSX.Element> = {
  coins: CoinsIcon,
  box: BoxIcon,
  chip: ChipIcon,
  user: UserIcon,
  scheme: SchemeIcon,
  wifi: WifiIcon,
  gift: GiftIcon,
  doc: DocIcon,
  law: ScaleLawIcon,
};

export default function Advantages() {
  return (
    <section id="why" className="relative scroll-mt-24 overflow-hidden bg-coal py-20 text-tape md:py-28">
      {/* фоновая перфорация чека */}
      <div className="grid-paper absolute inset-0 opacity-[0.06]" aria-hidden />
      <div className="absolute right-[-140px] top-[-140px] h-[420px] w-[420px] rounded-full bg-pine/15 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* sticky-колонка */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHead
                dark
                eyebrow="Почему Microinvest"
                title={
                  <>
                    9 причин автоматизироваться <span className="text-amber">с нами</span>
                  </>
                }
                desc="Автоматизация для небольшого предприятия часто кажется страшной: зачем отдавать деньги за «железки», если администратор и так справляется? Понимание приходит с первыми убытками от ошибок в закупках и нечистых на руку сотрудников. Мы делаем вход простым."
              />
              <Reveal delay={200}>
                <div className="mt-9 rounded-xl border border-tape/12 bg-screen/70 p-6">
                  <p className="font-mono text-[12px] leading-relaxed text-tape/75">
                    <span className="text-fern">$</span> microinvest install --business=cafe
                    <br />
                    <span className="text-tape/45">✓ конфигурация подобрана · смета 2 450 BYN</span>
                    <br />
                    <span className="text-tape/45">✓ запуск через 2 дня · обучение включено</span>
                    <span className="animate-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-fern" aria-hidden />
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* список преимуществ */}
          <div className="lg:col-span-7">
            <ol className="space-y-3.5">
              {ADVANTAGES.map((a, i) => {
                const Icon = ICONS[a.icon];
                return (
                  <Reveal key={a.title} delay={Math.min(i * 60, 300)}>
                    <li className="group flex gap-5 rounded-xl border border-tape/10 bg-tape/[0.04] p-5 transition-all duration-300 hover:border-fern/50 hover:bg-tape/[0.07] md:p-6">
                      <NumBadge n={String(i + 1).padStart(2, "0")} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 shrink-0 text-fern transition-colors duration-300 group-hover:text-amber" />
                          <h3 className="font-display text-[15.5px] font-bold text-tape">{a.title}</h3>
                        </div>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-tape/60">{a.text}</p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
