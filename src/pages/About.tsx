import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { Frame } from "../components/Photo";
import { Photo } from "../components/Photo";
import { ABOUT_PHOTO, SHOWREEL_POSTER } from "../lib/data";

const values = [
  [
    "Listen first",
    "We talk about your face shape, hair type and routine before the first cut.",
  ],
  [
    "Detail always",
    "Edges, neckline and finish get the same care as the main cut.",
  ],
  [
    "Clean and safe",
    "Fresh towels and sterilised tools for every single client.",
  ],
];

export default function About() {
  return (
    <>
      <section className="kx-hero">
        <div className="kx-guilloche" />
        <div className="kx-hero-inner mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-16 md:py-24">
          <div className="relative mx-auto w-full max-w-sm pb-4 pr-4">
            <Reveal from="left">
              <Frame src={ABOUT_PHOTO} alt="Muhammad Ahad" rings />
              <div className="kx-glass absolute -right-2 bottom-14 z-10 px-5 py-3 text-center backdrop-blur sm:-right-8">
                <p className="font-display text-3xl font-black">2019</p>
                <p className="kx-eyebrow-light !text-[9px]">BEHIND THE CHAIR</p>
              </div>
            </Reveal>
          </div>
          <Reveal from="right">
            <p className="kx-eyebrow-light">ABOUT THE BARBER</p>
            <h1 className="mt-4 font-display text-4xl font-black min-[400px]:text-5xl sm:text-6xl">
              Muhammad <span className="gold-text-light">Ahad</span>
            </h1>
            <p className="kx-muted-light mt-6 max-w-md">
              I picked up the clippers in 2019 and have been behind the chair
              for 7 years. Fades, tapers, scissor cuts, beard work and straight
              razor shaves: each one is done slowly and finished by hand.
            </p>
            <p className="kx-muted-light mt-4 max-w-md">
              A good cut should look natural, last for weeks and make you feel
              like yourself.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Skin fades",
                "Tapers",
                "Scissor cuts",
                "Beard sculpting",
                "Hot shaves",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs tracking-wide text-zinc-200"
                >
                  {t}
                </span>
              ))}
            </div>
            <Link to="/book" className="kx-btn-light mt-8">
              BOOK WITH AHAD
            </Link>
          </Reveal>
        </div>
      </section>
      <div className="pole" />
      <section className="kx-page">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-14 sm:grid-cols-3 sm:gap-6 sm:px-6 sm:py-20">
          {values.map(([t, d], i) => (
            <Reveal key={t} delay={i * 100} className="kx-card p-7 sm:p-9">
              <p className="font-display text-4xl font-black gold-text">
                0{i + 1}
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold">{t}</h2>
              <p className="mt-3 text-sm text-ink/60">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-zinc-950 py-14 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-12">
          <Reveal from="left" className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-[28px] border border-zinc-700 shadow-[0_40px_90px_-40px_rgba(0,0,0,1)]">
              <Photo
                src={SHOWREEL_POSTER}
                alt="Ahad at work"
                fit="cover"
                pos="50% 20%"
                className="aspect-[3/4] w-full"
              />
            </div>
          </Reveal>
          <Reveal from="right">
            <p className="kx-eyebrow-light">AT WORK</p>
            <h2 className="mt-3 font-display text-3xl font-black min-[400px]:text-4xl sm:text-5xl">
              Every client gets{" "}
              <span className="gold-text-light">full focus</span>
            </h2>
            <p className="kx-muted-light mt-5 max-w-md">
              No rushing and no shortcuts. A clean fade, a sharp line-up and a
              finish you can style at home: that is how every chair ends.
            </p>
            <Link to="/book" className="kx-btn-light mt-8">
              RESERVE YOUR CHAIR
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
