import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { Photo } from "../components/Photo";
import { services } from "../lib/data";

export default function Services() {
  return (
    <>
      <section className="kx-hero">
        <div className="kx-guilloche" />
        <div className="kx-hero-inner mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="hero-in kx-eyebrow-light">SIGNATURE MENU</p>
          <h1
            className="hero-in mt-3 font-display text-5xl font-black sm:text-6xl"
            style={{ animationDelay: ".15s" }}
          >
            Services <span className="gold-text-light">&amp; prices</span>
          </h1>
          <p
            className="hero-in kx-muted-light mt-5 max-w-lg"
            style={{ animationDelay: ".3s" }}
          >
            Every service starts with a short chat about what you want, then
            ends with a clean finish.
          </p>
        </div>
      </section>
      <div className="pole" />
      <section className="kx-page">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal
              key={s.slug}
              delay={(i % 3) * 100}
              className="kx-card group overflow-hidden !rounded-3xl"
            >
              <div className="kx-tile !rounded-none">
                <Photo
                  src={s.img}
                  alt={s.name}
                  fit="cover"
                  className="aspect-[3/4] w-full"
                />
                <span className="kx-chip absolute right-4 top-4 z-[2] !bg-white !text-navy-700 shadow-lg">
                  {s.price}
                </span>
                <div className="kx-tile-cap">
                  <p className="text-sm">{s.note}</p>
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold">{s.name}</h2>
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
      </section>
    </>
  );
}
