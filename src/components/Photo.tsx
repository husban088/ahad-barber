import { useEffect, useMemo, useRef, useState } from "react";
import { StyleArt, type ArtSpec } from "./StyleArt";

const Scissors = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
  </svg>
);

/** haircut.jpg daalo ya .png / .webp / .jpeg, sab chalega: ek ek karke try hota hai */
function candidates(src: string): string[] {
  const m = src.match(/^(.*)\.(jpg|jpeg|png|webp)$/i);
  if (!m) return [src];
  const base = m[1];
  const own = m[2].toLowerCase();
  const all = ["jpg", "webp", "png", "jpeg"];
  return [src, ...all.filter((e) => e !== own).map((e) => `${base}.${e}`)];
}

export function Photo({
  src,
  alt,
  className = "",
  fit = "contain",
  pos = "center",
  zoom = 1,
  art,
  then,
}: {
  src: string;
  alt: string;
  className?: string;
  /** contain = poori image dikhe (blur background), cover = frame bhar de */
  fit?: "contain" | "cover";
  /** object-position, jaise "50% 20%" (chehra upar rakhne ke liye) */
  pos?: string;
  /** 1 = normal, 1.8 = close-up crop (real photo ka zoomed hissa) */
  zoom?: number;
  /** photo na mile to ye HD illustration dikhao */
  art?: ArtSpec;
  /** pehli photo na mile to ye doosri (maujooda) photo ka crop dikhao */
  then?: { src: string; pos?: string; zoom?: number };
}) {
  const list = useMemo(() => candidates(src), [src]);
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const bad = idx >= list.length;

  // src badle to dobara shuru
  useEffect(() => {
    setIdx(0);
    setReady(false);
  }, [src]);

  // cached image ka onLoad kabhi kabhi miss ho jata hai, isliye check karo
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth > 0) setReady(true);
  }, [idx, src]);

  if (bad) {
    if (then)
      return (
        <Photo
          src={then.src}
          alt={alt}
          fit="cover"
          pos={then.pos}
          zoom={then.zoom}
          art={art}
          className={className}
        />
      );
    if (art)
      return (
        <div className={`relative overflow-hidden bg-zinc-900 ${className}`}>
          <StyleArt spec={art} label={alt} />
        </div>
      );
    return (
      <div
        className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-950 p-4 text-center text-zinc-300 ${className}`}
      >
        <span className="text-zinc-400">
          <Scissors />
        </span>
        <span className="font-display text-base font-bold text-white">
          {alt}
        </span>
        <span className="text-[10px] tracking-wide text-zinc-500">
          Add photo: public{src}
        </span>
      </div>
    );
  }

  const current = list[idx];
  const imgStyle =
    zoom !== 1
      ? {
          objectPosition: pos,
          transform: `scale(${zoom})`,
          transformOrigin: pos,
        }
      : { objectPosition: pos };

  return (
    <div className={`relative overflow-hidden bg-zinc-900 ${className}`}>
      {!ready && <div className="kx-skel absolute inset-0" />}

      {/* blurred background: sirf contain mode mein, khali jagah bharne ke liye */}
      {fit === "contain" && zoom === 1 && (
        <img
          key={`bg-${current}`}
          src={current}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={`absolute inset-0 h-full w-full scale-125 object-cover blur-2xl brightness-50 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        />
      )}

      <img
        key={current}
        ref={img}
        src={current}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        onLoad={() => setReady(true)}
        onError={() => {
          setReady(false);
          setIdx((i) => i + 1);
        }}
        style={imgStyle}
        className={`relative block h-full w-full max-w-none transition-opacity duration-700 ${
          fit === "cover" ? "object-cover" : "object-contain"
        } ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

/** Portrait frame with rotating rings (for Ahad's photo) */
export function Frame({
  src,
  alt,
  className = "",
  rings = false,
}: {
  src: string;
  alt: string;
  className?: string;
  rings?: boolean;
}) {
  return (
    <div className={`group kx-orbit ${className}`}>
      {rings && (
        <>
          <div className="kx-ring kx-ring--a" />
          <div className="kx-ring kx-ring--b" />
        </>
      )}
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[28px] border border-zinc-400/50 transition duration-500 group-hover:translate-x-2 group-hover:translate-y-2 sm:translate-x-4 sm:translate-y-4" />
      <div className="relative overflow-hidden rounded-[28px] border-[6px] border-white shadow-navy-lg">
        <Photo
          src={src}
          alt={alt}
          fit="cover"
          pos="50% 18%"
          className="aspect-[3/4] w-full"
        />
      </div>
    </div>
  );
}
