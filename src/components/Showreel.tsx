import { useState } from "react";
import Reveal from "./Reveal";
import { Photo } from "./Photo";
import { SHOWREEL_POSTER, SHOWREEL_VIDEO } from "../lib/data";

/** Video section. public/videos/showreel.mp4 ho to video chalti hai, warna cutting wali photo dikhti hai. */
export default function Showreel() {
  const [hasVideo, setHasVideo] = useState(false);
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-black py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:gap-14">
        <Reveal from="left">
          <div className="group relative mx-auto max-w-md overflow-hidden rounded-[28px] border border-zinc-700 bg-zinc-900 shadow-[0_40px_90px_-40px_rgba(0,0,0,1)]">
            {!hasVideo && (
              <Photo
                src={SHOWREEL_POSTER}
                alt="Ahad cutting hair in the chair"
                fit="cover"
                pos="50% 20%"
                className="aspect-[3/4] w-full transition duration-[900ms] group-hover:scale-105"
              />
            )}
            <video
              className={
                hasVideo
                  ? "block max-h-[80vh] w-full bg-black object-contain"
                  : "hidden"
              }
              src={SHOWREEL_VIDEO}
              poster={SHOWREEL_POSTER}
              controls
              playsInline
              preload="metadata"
              onLoadedMetadata={() => setHasVideo(true)}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
            {!hasVideo && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="kx-eyebrow-light !text-[10px]">IN THE CHAIR</p>
                <p className="font-display text-xl font-bold">
                  Precision, one cut at a time
                </p>
              </div>
            )}
          </div>
        </Reveal>
        <Reveal from="right">
          <p className="kx-eyebrow-light">BEHIND THE CHAIR</p>
          <h2 className="mt-3 font-display text-3xl font-black min-[400px]:text-4xl sm:text-5xl">
            Watch the craft <span className="gold-text-light">up close</span>
          </h2>
          <p className="kx-muted-light mt-5 max-w-md">
            Slow scissor work, sharp clipper lines and a hot towel finish. Every
            cut and beard is built step by step, and finished by hand.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-zinc-300">
            {[
              "Precision fades and tapers",
              "Scissor-over-comb texture",
              "Beard sculpting and razor line-ups",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
