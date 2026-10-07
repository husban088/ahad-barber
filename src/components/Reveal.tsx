import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  from = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right" | "zoom";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("show");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const dir = from === "up" ? "" : `from-${from}`;
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${dir} ${className}`}
    >
      {children}
    </div>
  );
}
