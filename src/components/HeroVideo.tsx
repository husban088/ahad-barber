import { useState } from "react";

/** Background video. Agar video file nahi mili to kuch bhi nahi dikhata (error nahi aata). */
export default function HeroVideo({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <video
      className="absolute inset-0 z-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      onError={() => setOk(false)}
    />
  );
}
