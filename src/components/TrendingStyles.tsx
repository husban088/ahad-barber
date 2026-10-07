import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { Photo } from "./Photo";
import { styles, styleImg, StyleCat } from "../lib/data";

type Tab = "All" | StyleCat;
const tabs: { id: Tab; label: string }[] = [
  { id: "All", label: "All styles" },
  { id: "Haircut", label: "Haircuts" },
  { id: "Beard", label: "Beard styles" },
  { id: "Combo", label: "Cut + Beard" },
];

export default function TrendingStyles({ initial = 8 }: { initial?: number }) {
  const [tab, setTab] = useState<Tab>("All");
  const [showAll, setShowAll] = useState(false);
  const list = styles.filter((s) => tab === "All" || s.cat === tab);
  const shown = showAll ? list : list.slice(0, initial);

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24 text-white">
      <div
        className="kx-guilloche"
        style={{ left: "auto", right: -200, top: -160, bottom: "auto" }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kx-eyebrow-light">TRENDING NOW</p>
          <h2 className="mt-3 font-display text-4xl font-black sm:text-6xl">
            Cuts &amp; beards{" "}
            <span className="gold-text-light">everyone is asking for</span>
          </h2>
          <p className="kx-muted-light mt-4">
            Pick a style, show it to Ahad and walk out with it. Every look is
            tailored to your face shape and hair type.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setShowAll(false);
              }}
              className={`rounded-full border px-5 py-2.5 text-xs font-semibold tracking-widest transition duration-300 ${
                tab === t.id
                  ? "border-white bg-white text-zinc-900 shadow-lg"
                  : "border-zinc-700 text-zinc-300 hover:border-zinc-400 hover:text-white"
              }`}
            >
              {t.label.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {shown.map((s, i) => (
            <Reveal key={s.slug + tab} delay={(i % 4) * 80} from="zoom">
              <div className="group relative overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-zinc-800 transition duration-500 hover:-translate-y-2 hover:ring-zinc-400 hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
                <Photo
                  src={styleImg(s.slug)}
                  alt={s.name}
                  className="aspect-[3/4] w-full transition duration-[900ms] group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-semibold tracking-widest text-zinc-100 backdrop-blur">
                  {s.cat.toUpperCase()}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="font-display text-lg font-bold leading-tight sm:text-2xl">
                    {s.name}
                  </h3>
                  <p className="mt-1 hidden text-xs text-zinc-300 sm:block">
                    {s.note}
                  </p>
                  <Link
                    to="/book"
                    className="link-line mt-3 inline-block text-[11px] font-semibold tracking-widest text-zinc-100 opacity-100 transition duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                  >
                    BOOK THIS STYLE →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {list.length > initial && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="kx-btn-ghost-light"
            >
              {showAll ? "SHOW LESS" : `SHOW ALL ${list.length} STYLES`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
