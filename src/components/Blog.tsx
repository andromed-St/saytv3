import { FormEvent, useMemo, useState } from "react";
import { ARCHIVES, BLOG_CATS, POSTS, TAG_CLOUD, type Post, type PostComment } from "../data";
import { Reveal, SectionHead } from "./ui";
import { ArrowIcon, CheckIcon, ClockIcon, SendIcon, UserIcon } from "./Icons";

const PER_PAGE = 4;

function Meta({ post, onOpenCat }: { post: Post; onOpenCat?: (c: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink/45">
      <span className="flex items-center gap-1.5">
        <ClockIcon className="h-3.5 w-3.5 text-tang" />
        {post.date}
      </span>
      <span className="flex items-center gap-1.5">
        <UserIcon className="h-3.5 w-3.5 text-tang" />
        {post.author}
      </span>
      {onOpenCat ? (
        <button onClick={() => onOpenCat(post.cat)} className="flex items-center gap-1.5 transition-colors hover:text-pine">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-tang" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 6.5h6l2 2.5h10v11H3z" strokeLinejoin="round" />
          </svg>
          {post.cat}
        </button>
      ) : (
        <span className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-tang" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 6.5h6l2 2.5h10v11H3z" strokeLinejoin="round" />
          </svg>
          {post.cat}
        </span>
      )}
      <a href="#blog" className="flex items-center gap-1.5 transition-colors hover:text-pine">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-tang" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 5h16v10.5H9.5L5 19.5v-4H4z" strokeLinejoin="round" />
        </svg>
        {post.comments.length}
      </a>
    </div>
  );
}

/* ---------- сайдбар с виджетами ---------- */
function Sidebar({
  query,
  onSearch,
  cat,
  onCat,
  onTag,
  onOpenPost,
}: {
  query: string;
  onSearch: (q: string) => void;
  cat: string | null;
  onCat: (c: string | null) => void;
  onTag: (t: string) => void;
  onOpenPost: (id: string) => void;
}) {
  const [sub, setSub] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const cats = useMemo(
    () => BLOG_CATS.map((c) => ({ c, n: POSTS.filter((p) => p.cat === c).length })),
    []
  );

  return (
    <aside className="space-y-6">
      <Reveal>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(query);
          }}
          className="rounded-xl border border-ink/12 bg-tape p-5"
        >
          <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-ink">Поиск</p>
          <div className="mt-3 flex gap-2">
            <input
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Записи блога…"
              className="field"
              aria-label="Поиск по блогу"
            />
          </div>
        </form>
      </Reveal>

      <Reveal delay={60}>
        <div className="rounded-xl border border-ink/12 bg-tape p-5">
          <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-ink">Рубрики</p>
          <ul className="mt-3 space-y-1">
            <li>
              <button
                onClick={() => onCat(null)}
                className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-[13.5px] font-semibold transition-colors ${
                  cat === null ? "bg-pine text-tape" : "text-ink/65 hover:bg-paper hover:text-pine"
                }`}
              >
                Все записи
                <span className={`font-mono text-[11px] ${cat === null ? "text-tape/80" : "text-ink/40"}`}>{POSTS.length}</span>
              </button>
            </li>
            {cats.map(({ c, n }) => (
              <li key={c}>
                <button
                  onClick={() => onCat(c)}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-[13.5px] font-semibold transition-colors ${
                    cat === c ? "bg-pine text-tape" : "text-ink/65 hover:bg-paper hover:text-pine"
                  }`}
                >
                  {c}
                  <span className={`font-mono text-[11px] ${cat === c ? "text-tape/80" : "text-ink/40"}`}>{n}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="rounded-xl border border-ink/12 bg-tape p-5">
          <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-ink">Свежие записи</p>
          <ul className="mt-3 space-y-3">
            {POSTS.slice(0, 3).map((p) => (
              <li key={p.id}>
                <button onClick={() => onOpenPost(p.id)} className="group flex gap-3 text-left">
                  <img src={p.img} alt="" referrerPolicy="no-referrer" className="h-12 w-14 shrink-0 rounded-md bg-mist object-cover" />
                  <span>
                    <span className="block text-[12.5px] font-bold leading-snug text-ink transition-colors group-hover:text-pine">
                      {p.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] text-ink/40">{p.date}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div className="rounded-xl border border-ink/12 bg-tape p-5">
          <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-ink">Метки</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {TAG_CLOUD.map((t) => (
              <button
                key={t}
                onClick={() => onTag(t)}
                className="rounded-md border border-ink/15 px-2.5 py-1 text-[11.5px] font-semibold text-ink/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-pine hover:bg-pine hover:text-tape"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="rounded-xl border border-ink/12 bg-tape p-5">
          <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-ink">Архивы</p>
          <ul className="mt-3 space-y-1">
            {ARCHIVES.map((a) => (
              <li key={a.label} className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-[13.5px] font-semibold text-ink/65 transition-colors hover:bg-paper hover:text-pine">
                {a.label}
                <span className="font-mono text-[11px] text-ink/40">({a.count})</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={240}>
        <div className="overflow-hidden rounded-xl bg-moss p-5 text-tape">
          <p className="font-display text-[13px] font-bold uppercase tracking-[0.08em]">Подписка на блог</p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-tape/65">Раз в месяц — только полезные материалы по автоматизации.</p>
          {subscribed ? (
            <p className="mt-4 flex items-center gap-2 rounded-lg bg-fern/15 px-3 py-2.5 text-[12.5px] font-bold text-fern">
              <CheckIcon className="h-4 w-4" /> Вы подписаны!
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (/.+@.+\..+/.test(sub)) setSubscribed(true);
              }}
              className="mt-4"
            >
              <input
                type="email"
                value={sub}
                onChange={(e) => setSub(e.target.value)}
                placeholder="ваш@email.by"
                className="w-full rounded-lg border border-tape/20 bg-tape/10 px-3.5 py-2.5 text-[13px] font-medium text-tape placeholder:text-tape/40 outline-none transition-all focus:border-fern focus:ring-4 focus:ring-fern/20"
                aria-label="Email для подписки"
              />
              <button type="submit" className="mt-2.5 w-full rounded-lg bg-amber py-2.5 text-[12.5px] font-bold text-ink transition-colors hover:bg-tape">
                Подписаться
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </aside>
  );
}

/* ---------- форма комментария ---------- */
function CommentForm({ onAdd }: { onAdd: (c: PostComment) => void }) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 5) return setErr("Комментарий слишком короткий");
    if (name.trim().length < 2) return setErr("Укажите имя");
    if (!/.+@.+\..+/.test(email)) return setErr("Некорректный email");
    setErr(null);
    onAdd({ name: name.trim(), date: "сегодня", text: text.trim() });
    setText("");
    setOk(true);
    window.setTimeout(() => setOk(false), 3500);
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-ink/12 bg-tape p-6">
      <h4 className="font-display text-[15px] font-bold text-ink">Оставить комментарий</h4>
      <p className="mt-1.5 text-[12px] text-ink/50">Ваш адрес email не будет опубликован. Обязательные поля помечены *</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        placeholder="Ваш комментарий…"
        className="field mt-4 resize-none"
        aria-label="Текст комментария"
      />
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя *" className="field" aria-label="Ваше имя" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email *" className="field" aria-label="Ваш email" />
      </div>
      {err && <p className="mt-3 rounded-md bg-tang/10 px-3.5 py-2 text-[12.5px] font-bold text-tang">{err}</p>}
      {ok && (
        <p className="animate-pop mt-3 flex items-center gap-2 rounded-md bg-pine/10 px-3.5 py-2 text-[12.5px] font-bold text-pine">
          <CheckIcon className="h-4 w-4" /> Комментарий добавлен!
        </p>
      )}
      <button type="submit" className="mt-4 inline-flex items-center gap-2.5 rounded-lg bg-pine px-6 py-3 text-[13px] font-bold text-tape transition-all duration-300 hover:bg-moss active:scale-[0.98]">
        Отправить комментарий
        <SendIcon className="h-4 w-4" />
      </button>
    </form>
  );
}

/* ---------- полная запись ---------- */
function SinglePost({
  post,
  onBack,
  onAddComment,
  onOpenPost,
  onOpenCat,
  ...side
}: {
  post: Post;
  onBack: () => void;
  onAddComment: (id: string, c: PostComment) => void;
  onOpenPost: (id: string) => void;
  onOpenCat: (c: string) => void;
  query: string;
  onSearch: (q: string) => void;
  cat: string | null;
  onCat: (c: string | null) => void;
  onTag: (t: string) => void;
}) {
  const related = POSTS.filter((p) => p.id !== post.id && p.cat === post.cat).concat(POSTS.filter((p) => p.id !== post.id && p.cat !== post.cat)).slice(0, 2);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <button onClick={onBack} className="group inline-flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-pine transition-colors hover:text-moss">
          <ArrowIcon className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
          Все записи
        </button>
        <article className="mt-5">
          <h1 className="font-display text-[22px] font-bold leading-tight text-ink md:text-[30px]">{post.title}</h1>
          <div className="mt-4">
            <Meta post={post} onOpenCat={onOpenCat} />
          </div>
          <div className="grid-paper mt-6 overflow-hidden rounded-2xl border border-ink/12 bg-mist">
            <img src={post.img} alt={post.title} referrerPolicy="no-referrer" onError={(e) => (e.currentTarget.style.display = "none")} className="h-64 w-full object-cover md:h-80" />
          </div>
          <div className="prose-p mt-7 space-y-5 text-[15px] leading-[1.75] text-ink/78">
            {post.body.map((par, i) => (
              <p key={i} className={i === 0 ? "font-semibold text-ink/90" : ""}>
                {par}
              </p>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-dashed border-ink/20 pt-5">
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-ink/40">Метки:</span>
            {post.tags.map((t) => (
              <span key={t} className="rounded-md bg-mist px-2.5 py-1 text-[11.5px] font-semibold text-ink/65">
                #{t}
              </span>
            ))}
          </div>

          {/* автор */}
          <div className="mt-8 flex items-center gap-4 rounded-xl border border-ink/12 bg-tape p-5">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-pine font-display text-lg font-bold text-tape">
              {post.author.charAt(0)}
            </span>
            <div>
              <p className="font-display text-[14px] font-bold text-ink">{post.author}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink/55">
                Специалист отдела внедрения «Микроинвест». Помогает магазинам и кафе запускаться на Microinvest Склад Pro с 2012 года.
              </p>
            </div>
          </div>

          {/* комментарии */}
          <section className="mt-10" aria-label="Комментарии">
            <h3 className="font-display text-lg font-bold text-ink">
              {post.comments.length > 0 ? `${post.comments.length} комментари${post.comments.length === 1 ? "й" : "я"}` : "Комментариев пока нет"}
            </h3>
            <div className="mt-5 space-y-4">
              {post.comments.map((c, i) => (
                <div key={i} className={`rounded-xl border p-5 ${c.admin ? "ml-6 border-pine/40 bg-pine/[0.06]" : "border-ink/12 bg-tape"}`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-[13px] font-bold ${c.admin ? "bg-pine text-tape" : "bg-mist text-ink/60"}`}>
                      {c.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-[13px] font-bold text-ink">
                        {c.name}
                        {c.admin && <span className="ml-2 rounded bg-pine/15 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-pine">автор</span>}
                      </p>
                      <p className="font-mono text-[10px] text-ink/40">{c.date}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink/70">{c.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <CommentForm onAdd={(c) => onAddComment(post.id, c)} />
            </div>
          </section>

          {/* похожие записи */}
          <div className="mt-10">
            <h3 className="font-display text-lg font-bold text-ink">Похожие записи</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <button key={p.id} onClick={() => onOpenPost(p.id)} className="group overflow-hidden rounded-xl border border-ink/12 bg-tape text-left transition-all duration-300 hover:-translate-y-1 hover:border-pine/60">
                  <div className="grid-paper h-28 bg-mist">
                    <img src={p.img} alt="" referrerPolicy="no-referrer" onError={(e) => (e.currentTarget.style.display = "none")} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="text-[13px] font-bold leading-snug text-ink transition-colors group-hover:text-pine">{p.title}</p>
                    <p className="mt-1.5 font-mono text-[10px] text-ink/40">{p.date} · {p.comments.length} комм.</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </article>
      </div>
      <div className="lg:col-span-4">
        <Sidebar {...side} onOpenPost={onOpenPost} />
      </div>
    </div>
  );
}

/* ---------- сам блог ---------- */
export default function Blog({ query, onQuery }: { query: string; onQuery: (q: string) => void }) {
  const [postId, setPostId] = useState<string | null>(null);
  const [cat, setCat] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState(POSTS);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (!cat || p.cat === cat) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [posts, cat, query]);

  const searching = query.trim().length > 0 || cat !== null;
  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown = searching ? filtered : filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const activePost = posts.find((p) => p.id === postId);

  const openPost = (id: string) => {
    setPostId(id);
    window.scrollTo({ top: document.getElementById("blog")?.offsetTop ?? 0, behavior: "smooth" });
  };

  const addComment = (id: string, c: PostComment) =>
    setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, comments: [...p.comments, c] } : p)));

  return (
    <section id="blog" className="border-t border-ink/10 bg-paper py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Блог · новости компании"
          title={
            <>
              Свежие записи <span className="text-pine">блога</span>
            </>
          }
          desc="Новости платформы Microinvest, разборы законодательства и практические советы для владельцев магазинов и кафе."
        />

        <div className="mt-12">
          {activePost ? (
            <SinglePost
              post={activePost}
              onBack={() => setPostId(null)}
              onAddComment={addComment}
              onOpenPost={openPost}
              onOpenCat={(c) => {
                setCat(c);
                setPostId(null);
              }}
              query={query}
              onSearch={onQuery}
              cat={cat}
              onCat={(c) => {
                setCat(c);
                setPostId(null);
              }}
              onTag={(t) => {
                onQuery(t);
                setPostId(null);
              }}
            />
          ) : (
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                {searching && (
                  <div className="mb-5 flex flex-wrap items-center gap-3 rounded-lg border border-pine/30 bg-pine/[0.07] px-4 py-3">
                    <p className="text-[13px] font-semibold text-ink/70">
                      Найдено записей: <strong className="text-pine">{filtered.length}</strong>
                      {query.trim() && (
                        <>
                          {" "}по запросу <em className="not-italic font-bold text-pine">«{query.trim()}»</em>
                        </>
                      )}
                      {cat && (
                        <>
                          {" "}в рубрике <em className="not-italic font-bold text-pine">«{cat}»</em>
                        </>
                      )}
                    </p>
                    <button
                      onClick={() => {
                        onQuery("");
                        setCat(null);
                        setPage(0);
                      }}
                      className="ml-auto rounded-md border border-ink/20 px-3 py-1 text-[11.5px] font-bold text-ink/60 transition-colors hover:border-tang hover:text-tang"
                    >
                      Сбросить
                    </button>
                  </div>
                )}

                <div className="space-y-7">
                  {shown.map((p, i) => (
                    <Reveal key={p.id} delay={Math.min(i * 80, 240)}>
                      <article className="group grid gap-5 overflow-hidden rounded-2xl border border-ink/12 bg-tape p-5 transition-all duration-300 hover:-translate-y-1 hover:border-pine/60 hover:shadow-[0_26px_50px_-32px_rgba(10,74,47,0.55)] md:grid-cols-[240px_1fr]">
                        <button onClick={() => openPost(p.id)} className="grid-paper relative block h-44 overflow-hidden rounded-xl bg-mist md:h-full" aria-label={`Читать: ${p.title}`}>
                          <img
                            src={p.img}
                            alt=""
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <span className="absolute left-3 top-3 rounded bg-ink/80 px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.12em] text-tape">
                            {p.cat}
                          </span>
                        </button>
                        <div className="flex flex-col">
                          <Meta post={p} onOpenCat={(c) => { setCat(c); setPage(0); }} />
                          <h3 className="mt-3">
                            <button onClick={() => openPost(p.id)} className="text-left font-display text-[17px] font-bold leading-snug text-ink transition-colors duration-200 hover:text-pine md:text-[19px]">
                              {p.title}
                            </button>
                          </h3>
                          <p className="mt-2.5 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-ink/62">{p.excerpt}</p>
                          <button
                            onClick={() => openPost(p.id)}
                            className="group/link mt-4 flex w-fit items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-pine transition-colors hover:text-moss"
                          >
                            Читать далее
                            <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                          </button>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                  {shown.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-ink/25 bg-tape p-12 text-center">
                      <p className="font-display text-lg font-bold text-ink">Ничего не найдено</p>
                      <p className="mt-2 text-[13.5px] text-ink/55">Попробуйте другой запрос или сбросьте фильтры.</p>
                    </div>
                  )}
                </div>

                {/* пагинация WP */}
                {!searching && pages > 1 && (
                  <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Страницы блога">
                    <button
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="rounded-lg border border-ink/15 px-3.5 py-2.5 text-[13px] font-bold text-ink/60 transition-all hover:border-pine hover:text-pine disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      ←
                    </button>
                    {Array.from({ length: pages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i)}
                        aria-current={page === i ? "page" : undefined}
                        className={`h-10 w-10 rounded-lg text-[13.5px] font-bold transition-all duration-200 ${
                          page === i ? "bg-pine text-tape shadow-md" : "border border-ink/15 text-ink/60 hover:border-pine hover:text-pine"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
                      disabled={page === pages - 1}
                      className="rounded-lg border border-ink/15 px-3.5 py-2.5 text-[13px] font-bold text-ink/60 transition-all hover:border-pine hover:text-pine disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      →
                    </button>
                  </nav>
                )}
              </div>
              <div className="lg:col-span-4">
                <Sidebar query={query} onSearch={onQuery} cat={cat} onCat={(c) => { setCat(c); setPage(0); }} onTag={(t) => { onQuery(t); setPage(0); }} onOpenPost={openPost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
