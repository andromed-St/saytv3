import { FormEvent, useState } from "react";
import { CONTACTS } from "../data";
import { Reveal, SectionHead, Barcode } from "./ui";
import { CheckIcon, ClockIcon, MailIcon, PhoneIcon, PinIcon, SendIcon } from "./Icons";

type Form = { name: string; phone: string; type: string; msg: string; agree: boolean };
type Errors = Partial<Record<keyof Form, string>>;

function ContactBlock() {
  const [form, setForm] = useState<Form>({ name: "", phone: "", type: "Магазин / торговля", msg: "", agree: false });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (form.name.trim().length < 2) er.name = "Укажите имя";
    if (!/^\+?[\d\s\-()]{9,18}$/.test(form.phone.trim())) er.phone = "Телефон в формате +375 (__) ___-__-__";
    if (!form.agree) er.agree = "Нужно согласие на обработку данных";
    setErrors(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  const rows = [
    { icon: PhoneIcon, label: "Телефоны", value: `${CONTACTS.phone1} · ${CONTACTS.phone2}`, href: "tel:+375296154200" },
    { icon: MailIcon, label: "Почта", value: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
    { icon: PinIcon, label: "Офис", value: CONTACTS.address },
    { icon: ClockIcon, label: "Режим работы", value: CONTACTS.hours },
  ];

  return (
    <section id="contacts" className="relative scroll-mt-24 overflow-hidden bg-moss py-20 text-tape md:py-28">
      <div className="grid-paper absolute inset-0 opacity-[0.06]" aria-hidden />
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-fern/15 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead
              dark
              eyebrow="Контакты · заявка"
              title={
                <>
                  Обсудим ваш объект <span className="text-amber">уже сегодня?</span>
                </>
              }
              desc="Оставьте заявку — менеджер перезвонит в течение рабочего дня, уточнит задачи и подготовит фиксированную смету. Либо звоните напрямую: в Минске, Гомеле, Могилёве и Бресте работают местные команды."
            />
            <div className="mt-9 space-y-4">
              {rows.map((r, i) => {
                const Inner = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-fern/15 text-fern transition-colors duration-300 group-hover:bg-amber group-hover:text-ink">
                      <r.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-tape/45">{r.label}</span>
                      <span className="block text-[14.5px] font-bold text-tape">{r.value}</span>
                    </span>
                  </>
                );
                return (
                  <Reveal key={r.label} delay={i * 70}>
                    {r.href ? (
                      <a href={r.href} className="group flex items-center gap-4 rounded-xl border border-tape/10 bg-tape/[0.04] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-fern/50">
                        {Inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4 rounded-xl border border-tape/10 bg-tape/[0.04] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-fern/50">
                        {Inner}
                      </div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={150}>
              <div className="rounded-2xl bg-tape p-7 text-ink shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)] md:p-9">
                {sent ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <span className="animate-pop flex h-20 w-20 items-center justify-center rounded-full bg-pine text-tape">
                      <CheckIcon className="h-9 w-9" />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-bold">Заявка принята!</h3>
                    <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-ink/60">
                      Спасибо, {form.name.trim()}! Менеджер свяжется с вами по номеру{" "}
                      <strong className="text-ink">{form.phone}</strong> в течение рабочего дня и подберёт конфигурацию.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({ name: "", phone: "", type: "Магазин / торговля", msg: "", agree: false });
                      }}
                      className="mt-7 rounded-lg border border-ink/20 px-6 py-3 text-sm font-bold transition-colors hover:border-pine hover:text-pine"
                    >
                      Отправить ещё одну
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-lg font-bold">Заявка на автоматизацию</h3>
                      <span className="hidden rounded-md bg-amber px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink sm:block">
                        смета за 1 день
                      </span>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="f-name" className="mb-1.5 block font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink/50">
                          Ваше имя *
                        </label>
                        <input
                          id="f-name"
                          className={`field ${errors.name ? "field-error" : ""}`}
                          placeholder="Например, Сергей"
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                        />
                        {errors.name && <p className="mt-1.5 text-[12px] font-semibold text-tang">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="f-phone" className="mb-1.5 block font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink/50">
                          Телефон *
                        </label>
                        <input
                          id="f-phone"
                          type="tel"
                          className={`field ${errors.phone ? "field-error" : ""}`}
                          placeholder="+375 (29) 000-00-00"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                        />
                        {errors.phone && <p className="mt-1.5 text-[12px] font-semibold text-tang">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="f-type" className="mb-1.5 block font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink/50">
                        Тип бизнеса
                      </label>
                      <select id="f-type" className="field appearance-none" value={form.type} onChange={(e) => set("type", e.target.value)}>
                        {["Магазин / торговля", "Кафе / ресторан / столовая", "Салон красоты / СПА", "Фитнес-клуб", "Боулинг / досуговый центр", "Другое"].map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="f-msg" className="mb-1.5 block font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink/50">
                        Комментарий
                      </label>
                      <textarea
                        id="f-msg"
                        rows={3}
                        className="field resize-none"
                        placeholder="Пара слов об объекте: площадь, количество касс, что уже используете…"
                        value={form.msg}
                        onChange={(e) => set("msg", e.target.value)}
                      />
                    </div>
                    <label className="mt-4 flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={(e) => set("agree", e.target.checked)}
                        className="mt-0.5 h-4.5 w-4.5 accent-pine"
                      />
                      <span className="text-[12.5px] leading-relaxed text-ink/60">
                        Согласен(на) на обработку персональных данных в соответствии с законодательством РБ.
                        {errors.agree && <span className="ml-1 font-semibold text-tang">{errors.agree}</span>}
                      </span>
                    </label>
                    <button
                      type="submit"
                      className="group mt-7 flex w-full items-center justify-center gap-3 rounded-lg bg-pine px-7 py-4 text-sm font-bold text-tape transition-all duration-300 hover:bg-moss hover:shadow-[0_16px_35px_-14px_rgba(15,122,77,0.8)] active:scale-[0.99]"
                    >
                      Отправить заявку
                      <SendIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-screen text-tape/70">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-lg font-bold text-tape">
              МИКРО<span className="text-fern">ИНВЕСТ</span>
            </p>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-tape/55">
              Автоматизация торговли, кафе и ресторанов на платформе Microinvest. Программное обеспечение,
              торговое оборудование, внедрение и поддержка — по всей Республике Беларусь.
            </p>
            <Barcode className="mt-7 h-9 w-44 text-tape/35" label="MICROINVEST · SINCE 2008" />
          </div>
          <div className="md:col-span-3">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-tape/40">Разделы</p>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {[
                ["Решения для бизнеса", "#solutions"],
                ["Каталог продуктов", "#catalog"],
                ["Почему Microinvest", "#why"],
                ["Автоматизированные объекты", "#cases"],
                ["Вопросы и ответы", "#faq"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="transition-colors hover:text-amber">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
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
              <li>{CONTACTS.address}</li>
              <li>{CONTACTS.hours}</li>
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
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-tape/10 pt-6 font-mono text-[11px] text-tape/40">
          <p>© 2008–2026 ООО «Микроинвест» · {CONTACTS.unp}</p>
          <p>
            Работает на <span className="text-fern">Microinvest Sklad Pro</span> · сделано в Беларуси
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Contact() {
  return (
    <>
      <ContactBlock />
      <Footer />
    </>
  );
}
