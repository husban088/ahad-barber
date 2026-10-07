import { useState } from "react";

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

export function Photo({
  src,
  alt,
  className = "",
  fit = "contain",
}: {
  src: string;
  alt: string;
  className?: string;
  fit?: "contain" | "cover";
}) {
  const [bad, setBad] = useState(false);
  const [ready, setReady] = useState(false);
  if (bad)
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
  return (
    <div className={`relative overflow-hidden bg-zinc-900 ${className}`}>
      {!ready && <div className="kx-skel absolute inset-0" />}

      {/* blurred background: sirf contain mode mein, khali jagah bharne ke liye */}
      {fit === "contain" && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full scale-125 object-cover blur-2xl brightness-50 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        />
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setReady(true)}
        onError={() => setBad(true)}
        className={`relative z-[1] h-full w-full object-center transition-opacity duration-700 ${
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
      <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[28px] border border-zinc-400/50 transition duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
      <div className="relative overflow-hidden rounded-[28px] border-[6px] border-white shadow-navy-lg">
        <Photo src={src} alt={alt} className="aspect-[4/5] w-full" />
      </div>
    </div>
  );
}
