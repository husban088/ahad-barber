import { useId } from "react";

/* ============================================================
   StyleArt: HD vector illustrations (kabhi blur / stretch nahi hoti).
   Jab tak aap apni real photo (public/images/...) nahi daalte, Photo
   component isi art ko dikhata hai. Real photo aate hi wo khud
   replace ho jati hai.
   ============================================================ */

export type HairKind =
  | "crop"
  | "frenchCrop"
  | "quiff"
  | "pompadour"
  | "slickBack"
  | "sidePart"
  | "buzz"
  | "curly"
  | "undercut"
  | "mullet"
  | "none";

export type FadeKind =
  | "none"
  | "taper"
  | "low"
  | "mid"
  | "high"
  | "burst"
  | "drop";

export type BeardKind =
  | "none"
  | "full"
  | "boxed"
  | "stubble"
  | "goatee"
  | "vandyke"
  | "circle"
  | "anchor"
  | "faded";

export type ExtraKind = "none" | "foam" | "drops" | "bowtie";

export interface ArtSpec {
  hair?: HairKind;
  fade?: FadeKind;
  beard?: BeardKind;
  extra?: ExtraKind;
  crown?: boolean;
}

const HAIR = "#141417";
const HAIR_HI = "#41414b";

const FACE =
  "M90 175 C90 120 118 98 150 98 C182 98 210 120 210 175 C210 235 190 282 150 282 C110 282 90 235 90 175 Z";

const MOUSTACHE =
  "M116 228 C128 212 146 221 150 226 C154 221 172 212 184 228 C172 238 158 235 150 233 C142 235 128 238 116 228Z";

/** Top-of-head hair shapes (front view) */
const HAIR_TOP: Record<Exclude<HairKind, "none" | "curly">, string> = {
  crop: "M94 152 C86 100 114 74 150 74 C188 74 214 100 206 152 C202 130 196 118 186 112 C170 124 130 124 114 112 C104 118 98 130 94 152Z",
  frenchCrop:
    "M94 156 C86 104 114 80 150 80 C186 80 214 104 206 156 C202 136 198 128 150 128 C102 128 98 136 94 156Z",
  quiff:
    "M96 152 C80 100 98 50 150 46 C200 42 224 96 204 152 C200 126 190 112 176 106 C160 100 130 104 118 114 C106 122 100 134 96 152Z",
  pompadour:
    "M94 152 C70 96 102 28 156 34 C208 38 226 96 206 152 C202 124 190 108 170 100 C146 94 122 100 112 112 C104 122 98 134 94 152Z",
  slickBack:
    "M92 158 C82 104 112 70 152 70 C192 70 218 104 208 158 C204 132 192 112 150 106 C108 112 98 132 92 158Z",
  sidePart:
    "M92 158 C82 100 112 68 150 68 C190 68 218 100 208 158 C204 130 190 108 160 104 C130 100 108 114 92 158Z",
  buzz: "M95 156 C88 108 116 84 150 84 C184 84 212 108 205 156 C200 134 184 120 150 118 C116 120 100 134 95 156Z",
  undercut:
    "M104 140 C94 94 116 58 152 58 C190 58 210 94 198 140 C190 122 170 112 150 112 C130 112 112 122 104 140Z",
  mullet:
    "M94 152 C86 100 114 76 150 76 C188 76 214 100 206 152 C202 130 196 118 186 112 C170 122 130 122 114 112 C104 118 98 130 94 152Z",
};

/** highlight strokes offset per hair kind */
const HAIR_LIFT: Partial<Record<HairKind, number>> = {
  quiff: -24,
  pompadour: -34,
  undercut: -12,
  slickBack: -2,
};

/** [from-top-y, bottom-y, opacity] per fade type */
const FADE_BAND: Record<
  Exclude<FadeKind, "none" | "burst" | "drop">,
  [number, number, number]
> = {
  taper: [190, 224, 0.55],
  low: [176, 222, 0.95],
  mid: [150, 222, 0.95],
  high: [122, 224, 1],
};

function curlyCircles(): { x: number; y: number; r: number }[] {
  const out: { x: number; y: number; r: number }[] = [];
  for (let a = 190; a <= 350; a += 20) {
    const rad = (a * Math.PI) / 180;
    out.push({
      x: 150 + 64 * Math.cos(rad),
      y: 128 + 64 * Math.sin(rad),
      r: 17,
    });
  }
  for (let a = 215; a <= 325; a += 22) {
    const rad = (a * Math.PI) / 180;
    out.push({
      x: 150 + 38 * Math.cos(rad),
      y: 112 + 38 * Math.sin(rad),
      r: 16,
    });
  }
  out.push({ x: 150, y: 84, r: 18 });
  return out;
}
const CURLS = curlyCircles();

export function StyleArt({ spec, label }: { spec: ArtSpec; label?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const {
    hair = "crop",
    fade = "none",
    beard = "none",
    extra = "none",
    crown = false,
  } = spec;
  const lift = HAIR_LIFT[hair] ?? 0;
  const band =
    fade === "none" || fade === "burst" || fade === "drop"
      ? null
      : FADE_BAND[fade];

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 18%, #52525b 0%, #27272a 42%, #09090b 100%)",
      }}
    >
      <svg
        viewBox="0 0 300 400"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={label || "Barber style illustration"}
      >
        <defs>
          <linearGradient id={`${uid}skin`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e2bd97" />
            <stop offset="1" stopColor="#b88a63" />
          </linearGradient>
          <linearGradient id={`${uid}neck`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8f6a4a" />
            <stop offset="1" stopColor="#b88a63" />
          </linearGradient>
          <linearGradient id={`${uid}shirt`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3f3f46" />
            <stop offset="1" stopColor="#18181b" />
          </linearGradient>
          <linearGradient id={`${uid}fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={HAIR} stopOpacity="1" />
            <stop offset="1" stopColor={HAIR} stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${uid}burst`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={HAIR} stopOpacity="1" />
            <stop offset="0.65" stopColor={HAIR} stopOpacity="0.55" />
            <stop offset="1" stopColor={HAIR} stopOpacity="0" />
          </radialGradient>
          <clipPath id={`${uid}face`}>
            <path d={FACE} />
          </clipPath>
        </defs>

        {/* soft rings behind the head */}
        {[118, 150, 182].map((r) => (
          <circle
            key={r}
            cx="150"
            cy="190"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
            strokeDasharray={r === 150 ? "3 7" : undefined}
          />
        ))}

        {/* back hair (mullet) */}
        {hair === "mullet" && (
          <g fill={HAIR}>
            <path d="M98 140 C78 190 76 252 92 306 L122 272 L112 196Z" />
            <path d="M202 140 C222 190 224 252 208 306 L178 272 L188 196Z" />
          </g>
        )}

        {/* shoulders + neck */}
        <path
          d="M10 400 C22 342 76 318 126 312 L174 312 C224 318 278 342 290 400Z"
          fill={`url(#${uid}shirt)`}
        />
        <path
          d="M126 246 L126 320 C140 334 160 334 174 320 L174 246Z"
          fill={`url(#${uid}neck)`}
        />
        {extra === "bowtie" && (
          <g>
            <path d="M120 312 L150 360 L180 312Z" fill="#f4f4f5" />
            <path
              d="M150 338 L120 322 L120 354Z M150 338 L180 322 L180 354Z"
              fill="#0b0b0d"
              stroke="#a1a1aa"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle
              cx="150"
              cy="338"
              r="6"
              fill="#0b0b0d"
              stroke="#a1a1aa"
              strokeWidth="1.5"
            />
          </g>
        )}

        {/* ears */}
        <ellipse cx="88" cy="192" rx="10" ry="19" fill={`url(#${uid}skin)`} />
        <ellipse cx="212" cy="192" rx="10" ry="19" fill={`url(#${uid}skin)`} />

        {/* face */}
        <path d={FACE} fill={`url(#${uid}skin)`} />

        {/* beard */}
        <g fill={HAIR}>
          {beard === "full" && (
            <>
              <path d="M90 180 C90 244 112 296 150 304 C188 296 210 244 210 180 C206 202 196 216 184 220 C170 212 130 212 116 220 C104 216 94 202 90 180Z" />
              <path d={MOUSTACHE} />
            </>
          )}
          {beard === "faded" && (
            <g clipPath={`url(#${uid}face)`}>
              <path
                d="M82 150 C82 244 112 298 150 306 C188 298 218 244 218 150 C210 190 196 216 184 220 C170 212 130 212 116 220 C104 216 90 190 82 150Z"
                fill={`url(#${uid}fade)`}
                opacity="0.98"
              />
              <path
                d="M90 176 C94 218 110 250 150 262 C190 250 206 218 210 176 L210 300 L90 300Z"
                opacity="0"
              />
              <path
                d="M92 214 C100 262 124 296 150 304 C176 296 200 262 208 214 C198 226 190 222 184 222 C170 214 130 214 116 222 C110 222 102 226 92 214Z"
                opacity="0.95"
              />
              <path d={MOUSTACHE} />
            </g>
          )}
          {beard === "boxed" && (
            <>
              <path d="M92 184 L92 250 Q92 278 118 284 L182 284 Q208 278 208 250 L208 184 C202 206 190 218 180 220 C165 212 135 212 120 220 C110 218 98 206 92 184Z" />
              <path d={MOUSTACHE} />
            </>
          )}
          {beard === "stubble" && (
            <>
              <path
                d="M90 180 C90 244 112 296 150 304 C188 296 210 244 210 180 C206 202 196 216 184 220 C170 212 130 212 116 220 C104 216 94 202 90 180Z"
                opacity="0.34"
              />
              <path d={MOUSTACHE} opacity="0.5" />
            </>
          )}
          {beard === "goatee" && (
            <>
              <path d="M124 242 C124 272 138 292 150 294 C162 292 176 272 176 242 C166 252 134 252 124 242Z" />
              <path d={MOUSTACHE} />
            </>
          )}
          {beard === "vandyke" && (
            <>
              <path d="M132 246 C136 272 146 298 150 312 C154 298 164 272 168 246 C160 254 140 254 132 246Z" />
              <path d={MOUSTACHE} />
              <path d="M114 230 C106 228 100 220 98 212 C106 218 112 220 118 222Z M186 230 C194 228 200 220 202 212 C194 218 188 220 182 222Z" />
            </>
          )}
          {beard === "circle" && (
            <>
              <ellipse
                cx="150"
                cy="248"
                rx="30"
                ry="28"
                fill="none"
                stroke={HAIR}
                strokeWidth="15"
              />
              <path d={MOUSTACHE} />
            </>
          )}
          {beard === "anchor" && (
            <>
              <path d="M92 196 C96 250 118 288 150 296 C182 288 204 250 208 196 L200 200 C196 240 180 270 150 280 C120 270 104 240 100 200Z" />
              <path d="M132 250 C136 270 146 288 150 298 C154 288 164 270 168 250Z" />
              <path d={MOUSTACHE} />
            </>
          )}
        </g>

        {/* eyes, brows, nose, mouth */}
        <g>
          <path
            d="M113 162 Q128 153 143 160 M157 160 Q172 153 187 162"
            stroke="#17171a"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="128" cy="178" rx="6.5" ry="3.4" fill="#1b1b1f" />
          <ellipse cx="172" cy="178" rx="6.5" ry="3.4" fill="#1b1b1f" />
          <path
            d="M150 180 C146 198 142 206 146 212 C150 215 154 215 158 212"
            stroke="rgba(80,50,30,0.55)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M138 243 Q150 249 162 243"
            stroke="#8a5444"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* shave foam */}
        {extra === "foam" && (
          <g fill="#f8f8f9">
            <path d="M94 200 C86 232 98 266 120 278 C132 294 168 294 180 278 C202 266 214 232 206 200 C198 216 182 216 172 208 C160 214 140 214 128 208 C118 216 102 216 94 200Z" />
            {[
              [108, 252, 9],
              [192, 252, 9],
              [124, 280, 8],
              [176, 280, 8],
              [150, 290, 9],
            ].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} />
            ))}
          </g>
        )}

        {/* fades */}
        {band && (
          <g clipPath={`url(#${uid}face)`}>
            <path
              d={`M88 ${band[0]} L114 ${band[0]} L104 ${band[1]} L88 ${band[1]}Z`}
              fill={`url(#${uid}fade)`}
              opacity={band[2]}
            />
            <path
              d={`M212 ${band[0]} L186 ${band[0]} L196 ${band[1]} L212 ${band[1]}Z`}
              fill={`url(#${uid}fade)`}
              opacity={band[2]}
            />
          </g>
        )}
        {fade === "burst" && (
          <g clipPath={`url(#${uid}face)`}>
            <ellipse
              cx="94"
              cy="196"
              rx="38"
              ry="46"
              fill={`url(#${uid}burst)`}
            />
            <ellipse
              cx="206"
              cy="196"
              rx="38"
              ry="46"
              fill={`url(#${uid}burst)`}
            />
          </g>
        )}
        {fade === "drop" && (
          <g clipPath={`url(#${uid}face)`}>
            <path
              d="M88 136 L116 136 C106 176 114 226 100 262 L88 262Z"
              fill={`url(#${uid}fade)`}
            />
            <path
              d="M212 136 L184 136 C194 176 186 226 200 262 L212 262Z"
              fill={`url(#${uid}fade)`}
            />
          </g>
        )}

        {/* top hair */}
        {hair !== "none" && hair !== "curly" && (
          <g>
            <path d={HAIR_TOP[hair]} fill={HAIR} />
            <g
              transform={`translate(0 ${lift})`}
              fill="none"
              stroke={HAIR_HI}
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity="0.8"
            >
              <path d="M118 92 C138 80 170 80 190 94" />
              <path d="M110 104 C134 92 172 92 196 106" />
              <path d="M124 80 C140 74 160 74 178 80" />
            </g>
            {hair === "sidePart" && (
              <path
                d="M122 70 C124 84 126 96 134 106"
                stroke="#6b6b76"
                strokeWidth="2.6"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>
        )}
        {hair === "curly" && (
          <g fill={HAIR} stroke={HAIR_HI} strokeWidth="1.4">
            {CURLS.map((c, i) => (
              <circle key={i} cx={c.x.toFixed(1)} cy={c.y.toFixed(1)} r={c.r} />
            ))}
          </g>
        )}

        {/* water drops */}
        {extra === "drops" && (
          <g fill="#c7dcff" opacity="0.92">
            {[
              [60, 70, 1.3],
              [238, 96, 1.1],
              [84, 130, 0.9],
              [222, 150, 1.4],
              [44, 190, 1],
              [256, 214, 0.9],
            ].map(([x, y, s], i) => (
              <path
                key={i}
                transform={`translate(${x} ${y}) scale(${s})`}
                d="M0 -12 C7 0 10 7 0 12 C-10 7 -7 0 0 -12Z"
              />
            ))}
          </g>
        )}

        {/* crown (groom) */}
        {crown && (
          <path
            d="M126 62 L130 38 L141 52 L150 32 L159 52 L170 38 L174 62Z"
            fill="#e5c07b"
            stroke="#a67c2e"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}
