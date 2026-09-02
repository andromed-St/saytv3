import { useEffect, useRef, useState } from "react";

/** Уважает системную настройку prefers-reduced-motion */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Однократное появление элемента во вьюпорте */
export function useInView<T extends HTMLElement>(
  threshold = 0.18
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const SCRAMBLE_CHARS = "▮#%&$@0123456789XKMW≡+";

/** Эффект «расшифровки» заголовка */
export function useScramble(text: string, start: boolean, speed = 34): string {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  useEffect(() => {
    if (reduced || !start) {
      if (reduced) setOut(text);
      return;
    }
    let frame = 0;
    const id = window.setInterval(() => {
      frame += 1;
      const lock = Math.floor(frame / 2);
      if (lock >= text.length) {
        setOut(text);
        window.clearInterval(id);
        return;
      }
      const head = text.slice(0, lock);
      let tail = "";
      for (let i = lock; i < text.length; i++) {
        const ch = text[i];
        tail +=
          ch === " " ? " " : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setOut(head + tail);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, start, speed, reduced]);
  return out;
}

/** Плавный счётчик до target, когда inView = true */
export function useCountUp(target: number, inView: boolean, duration = 1400): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration, reduced]);
  return value;
}
