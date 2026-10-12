import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import CountUp from "../components/CountUp";
import { Frame, Photo } from "../components/Photo";
import HeroVideo from "../components/HeroVideo";
import TrendingStyles from "../components/TrendingStyles";
import Showreel from "../components/Showreel";
import {
  HERO_VIDEO,
  OWNER_PHOTO,
  gallery,
  services,
  steps,
  styles,
  why,
} from "../lib/data";

const ICON = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const icons: Record<string, JSX.Element> = {
  craft: (
    <svg {...ICON}>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
    </svg>
  ),
  shield: (
    <svg {...ICON}>
      <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  star: (
    <svg {...ICON}>
      <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />
    </svg>
  ),
  clock: (
    <svg {...ICON}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
};

export default function Home() {
  const ticker = [...styles, ...styles];
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="kx-hero">
        <HeroVideo src={HERO_VIDEO} />
        <div className="kx-guilloche" />
        <div className="kx-hero-inner mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-16 md:py-24">
          <div>
            <p className="hero-in kx-live">OPEN NOW · BARBER SINCE 2019</p>
            <h1
              className="hero-in mt-5 font-display text-[2.6rem] font-black leading-[1.08] min-[400px]:text-5xl sm:text-6xl lg:text-7xl"
              style={{ animationDelay: ".2s" }}
            >
              A sharp cut,
              <br />
              <span className="gold-text-light">a calm chair.</span>
            </h1>
            <p
              className="hero-in kx-muted-light mt-6 max-w-md"
              style={{ animationDelay: ".4s" }}
            >
              Muhammad Ahad brings 7 years of fades, beards and hot shaves to
              every client who sits down.
            </p>
            <div
              className="hero-in mt-8 flex flex-wrap gap-3 sm:mt-9 sm:gap-4"
              style={{ animationDelay: ".6s" }}
            >
              <Link to="/book" className="kx-btn-light">
                BOOK YOUR CHAIR
              </Link>
              <Link to="/services" className="kx-btn-ghost-light">
                VIEW SERVICES
              </Link>
            </div>
            <div
              className="hero-in mt-8 grid max-w-md grid-cols-3 gap-2.5 sm:mt-10 sm:gap-3"
              style={{ animationDelay: ".8s" }}
            >
              {[
                ["7+", "Years"],
                ["6", "Services"],
                ["10–10", "Daily"],
              ].map(([n, l]) => (
                <div key={l} className="kx-glass px-3 py-3 sm:px-4">
                  <p className="font-display text-2xl font-bold">{n}</p>
                  <p className="kx-eyebrow-light !text-[9px]">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="hero-in kx-float relative mx-auto w-full max-w-sm pb-4 pr-4"
            style={{ animationDelay: ".4s" }}
          >
            <Frame src={OWNER_PHOTO} alt="Muhammad Ahad, barber" rings />
            <div className="kx-glass absolute -left-3 bottom-16 z-10 px-4 py-3 backdrop-blur sm:-left-8">
              <p className="kx-eyebrow-light !text-[9px]">MASTER BARBER</p>
              <p className="font-display text-lg font-bold">Muhammad Ahad</p>
            </div>
            <div className="kx-glass absolute -right-2 top-10 z-10 px-4 py-3 text-center backdrop-blur sm:-right-6">
              <p className="font-display text-2xl font-bold">7+</p>
              <p className="kx-eyebrow-light !text-[9px]">YEARS</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className="border-b border-navy-100 bg-white py-4">
        <div className="kx-marquee">
          <div className="kx-marquee-track">
            {ticker.map((s, i) => (
              <span key={i} className="kx-marquee-item">
                <span className="h-1.5 w-1.5 rounded-full bg-navy" />
                <b className="text-navy-700">{s.name}</b>
                <span className="text-ink/50">{s.cat}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="pole" />

      {/* ================= WHY ================= */}
      <section className="kx-page">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <p className="kx-eyebrow">WHY AHAD</p>
            <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
              Why choose <span className="gold-text">us</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(([t, d, ic], i) => (
              <Reveal key={t} delay={i * 90} className="kx-card p-7">
                <span className="kx-icon">{icons[ic]}</span>
                <h3 className="mt-5 font-display text-xl font-bold">{t}</h3>
                <p className="mt-2 text-sm text-ink/60">{d}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              [7, "", "Years behind the chair"],
              [6, "", "Signature services"],
              [10, " am", "We open daily"],
              [10, " pm", "We close daily"],
            ].map(([n, suf, l], i) => (
              <Reveal
                key={i}
                delay={i * 80}
                from="zoom"
                className="text-center"
              >
                <p className="font-display text-5xl font-black gold-text">
                  <CountUp to={n as number} suffix={suf as string} />
                </p>
                <p className="mt-1 text-sm text-ink/55">{l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRENDING STYLES ================= */}
      <TrendingStyles />

      {/* ================= POPULAR SERVICES ================= */}
      <section id="popular" className="bg-navy-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="flex items-end justify-between gap-4">
            <div>
              <p className="kx-eyebrow">SIGNATURE MENU</p>
              <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
                Popular services
              </h2>
            </div>
            <Link
              to="/services"
              className="link-line text-sm font-semibold tracking-widest text-navy-700"
            >
              ALL SERVICES
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-3">
            {services.slice(0, 3).map((s, i) => (
              <Reveal
                key={s.slug}
                delay={i * 100}
                className="kx-card group overflow-hidden !rounded-3xl"
              >
                <div className="kx-tile !rounded-none">
                  <Photo
                    src={s.img}
                    alt={s.name}
                    fit="cover"
                    pos={s.pos}
                    then={s.then}
                    art={s.art}
                    className="aspect-[4/5] w-full"
                  />
                  <span className="kx-chip absolute right-4 top-4 z-[2] !bg-white !text-navy-700 shadow-lg">
                    {s.price}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold">{s.name}</h3>
                  <p className="mt-2 text-sm text-ink/60">{s.note}</p>
                  <Link
                    to="/book"
                    className="link-line mt-5 inline-block text-sm font-semibold tracking-widest text-navy-700"
                  >
                    BOOK THIS →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SHOWREEL ================= */}
      <Showreel />

      {/* ================= STEPS ================= */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <p className="kx-eyebrow">HOW IT WORKS</p>
          <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            Three steps to a sharp look
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(([n, t, d], i) => (
            <Reveal
              key={n}
              delay={i * 120}
              from={i === 0 ? "left" : i === 2 ? "right" : "up"}
              className="kx-card p-8"
            >
              <p className="font-display text-5xl font-black gold-text">{n}</p>
              <h3 className="mt-4 font-display text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm text-ink/60">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section id="gallery" className="kx-page">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <Reveal>
            <p className="kx-eyebrow">THE ATELIER</p>
            <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
              Inside the shop
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 pb-8 sm:mt-12 sm:gap-4 md:grid-cols-4">
            {gallery.map((g, i) => (
              <Reveal
                key={g.label}
                delay={(i + 1) * 80}
                from="zoom"
                className={`kx-tile ${i % 2 ? "md:translate-y-8" : ""}`}
              >
                <Photo
                  src={g.img}
                  alt={g.label}
                  fit="cover"
                  pos={g.pos}
                  then={g.then}
                  className="aspect-[3/4] w-full"
                />
                <div className="kx-tile-cap">
                  <p className="font-display text-lg font-bold">{g.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="kx-hero py-16 text-center sm:py-20">
        <div className="kx-guilloche" />
        <Reveal className="kx-hero-inner px-6">
          <h2 className="font-display text-4xl font-black sm:text-5xl lg:text-6xl">
            Your chair is <span className="gold-text-light">waiting.</span>
          </h2>
          <p className="kx-muted-light mx-auto mt-4 max-w-md">
            Pick a day and time. Ahad takes care of the rest.
          </p>
          <Link to="/book" className="kx-btn-light mt-8">
            BOOK NOW
          </Link>
        </Reveal>
      </section>
    </>
  );
}
