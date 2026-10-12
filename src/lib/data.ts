import type { ArtSpec } from "../components/StyleArt";

// ============================================================
//  IMAGES: sab images LOCAL hain (public/images/ folder me).
//  Apni image lagani ho to bas usi naam se file us folder me daal do
//  (naam neeche list me hai). Code badalne ki zaroorat nahi.
//  Image na ho to site me khoobsurat placeholder dikhta hai, error nahi.
// ============================================================

export const OWNER_PHOTO = "/images/ahad.png"; // hero section wali photo
export const ABOUT_PHOTO = "/images/ahad.png"; // about section wali photo
export const HERO_VIDEO = "/videos/hero.mp4"; // optional: hero ka background video
export const SHOWREEL_VIDEO = "/videos/showreel.mp4"; // optional: showreel section ki video
export const SHOWREEL_POSTER = "/images/spcr.png"; // optional: video ka cover

export interface Crop {
  src: string;
  pos?: string;
  zoom?: number;
}
export interface Service {
  slug: string;
  name: string;
  price: string;
  amount: number;
  note: string;
  img: string;
  pos?: string;
  /** apni photo na ho to is maujooda photo ka close-up dikhta hai */
  then?: Crop;
  /** wo bhi na ho to ye HD illustration dikhta hai */
  art: ArtSpec;
}

export const services: Service[] = [
  {
    slug: "haircut",
    name: "Signature Haircut",
    price: "Rs 1,500",
    amount: 1500,
    note: "Consultation, precision cut and hot towel finish.",
    img: "/images/spcr.png",
    pos: "50% 20%",
    art: { hair: "sidePart", fade: "low" },
  },
  {
    slug: "beard",
    name: "Royal Beard Sculpt",
    price: "Rs 1,200",
    amount: 1200,
    note: "Shape, line-up and warm oil treatment.",
    img: "/images/styles/textured-crop.png",
    pos: "50% 100%",
    art: { hair: "crop", fade: "mid", beard: "full" },
  },
  {
    slug: "shave",
    name: "Classic Hot Shave",
    price: "Rs 1,000",
    amount: 1000,
    note: "Straight razor with steamed towels.",
    img: "/images/styles/french-crop.png",
    pos: "50% 100%",
    art: { hair: "slickBack", extra: "foam" },
  },
  {
    slug: "fade",
    name: "Fade & Taper",
    price: "Rs 1,800",
    amount: 1800,
    note: "Skin, low, mid or high, blended clean.",
    img: "/images/styles/taper-fade.png",
    pos: "50% 100%",
    art: { hair: "quiff", fade: "high" },
  },
  {
    slug: "wash",
    name: "Hair Wash & Style",
    price: "Rs 700",
    amount: 700,
    note: "Deep cleanse, scalp massage and styling.",
    img: "/images/styles/mid-fade.png",
    pos: "50% 100%",
    art: { hair: "slickBack", extra: "drops" },
  },
  {
    slug: "groom",
    name: "Groom Package",
    price: "Rs 5,000",
    amount: 5000,
    note: "Cut, beard, facial and styling for the big day.",
    img: "/images/styles/high-fade.png",
    pos: "50% 100%",
    art: {
      hair: "sidePart",
      fade: "low",
      beard: "boxed",
      extra: "bowtie",
      crown: true,
    },
  },
];

// Trending cuts + beard styles. File ka naam = public/images/styles/<slug>.jpg
export type StyleCat = "Haircut" | "Beard" | "Combo";
export interface BarberStyle {
  slug: string;
  name: string;
  cat: StyleCat;
  note: string;
}

export const styles: BarberStyle[] = [
  // ---- haircuts ----
  {
    slug: "low-fade",
    name: "Low Fade",
    cat: "Haircut",
    note: "Clean, subtle blend just above the ears.",
  },
  {
    slug: "mid-fade",
    name: "Mid Fade",
    cat: "Haircut",
    note: "The all-rounder: sharp, balanced, easy to style.",
  },
  {
    slug: "high-fade",
    name: "High Fade",
    cat: "Haircut",
    note: "Bold contrast with skin-tight sides.",
  },
  {
    slug: "taper-fade",
    name: "Taper Fade",
    cat: "Haircut",
    note: "Soft taper around the neckline and sideburns.",
  },
  {
    slug: "burst-fade",
    name: "Burst Fade",
    cat: "Haircut",
    note: "Curved fade that bursts around the ear.",
  },
  {
    slug: "drop-fade",
    name: "Drop Fade",
    cat: "Haircut",
    note: "Fade line that drops behind the ear.",
  },
  {
    slug: "textured-crop",
    name: "Textured Crop",
    cat: "Haircut",
    note: "Short, messy top with a crisp fringe.",
  },
  {
    slug: "french-crop",
    name: "French Crop",
    cat: "Haircut",
    note: "Short fringe, low maintenance, always sharp.",
  },
  {
    slug: "quiff",
    name: "Modern Quiff",
    cat: "Haircut",
    note: "Volume at the front, tight on the sides.",
  },
  {
    slug: "pompadour",
    name: "Pompadour",
    cat: "Haircut",
    note: "Classic height with a modern fade.",
  },
  {
    slug: "slick-back",
    name: "Slick Back",
    cat: "Haircut",
    note: "Polished, combed back and glossy.",
  },
  {
    slug: "side-part",
    name: "Side Part",
    cat: "Haircut",
    note: "Gentleman's cut with a hard part line.",
  },
  {
    slug: "buzz-cut",
    name: "Buzz Cut",
    cat: "Haircut",
    note: "Even, clean and zero fuss.",
  },
  {
    slug: "curly-fade",
    name: "Curly Top Fade",
    cat: "Haircut",
    note: "Defined curls on top, clean fade below.",
  },
  {
    slug: "undercut",
    name: "Undercut",
    cat: "Haircut",
    note: "Long on top, sharply disconnected sides.",
  },
  {
    slug: "mullet",
    name: "Modern Mullet",
    cat: "Haircut",
    note: "Short sides, relaxed length at the back.",
  },
  // ---- beards ----
  {
    slug: "full-beard",
    name: "Full Beard",
    cat: "Beard",
    note: "Thick, shaped and well conditioned.",
  },
  {
    slug: "boxed-beard",
    name: "Boxed Beard",
    cat: "Beard",
    note: "Short, squared edges and neat cheek line.",
  },
  {
    slug: "stubble",
    name: "Designer Stubble",
    cat: "Beard",
    note: "Even short stubble with razor lines.",
  },
  {
    slug: "goatee",
    name: "Goatee",
    cat: "Beard",
    note: "Chin and moustache, neatly connected.",
  },
  {
    slug: "van-dyke",
    name: "Van Dyke",
    cat: "Beard",
    note: "Pointed chin beard with a styled moustache.",
  },
  {
    slug: "circle-beard",
    name: "Circle Beard",
    cat: "Beard",
    note: "Moustache and goatee joined in a clean circle.",
  },
  {
    slug: "anchor-beard",
    name: "Anchor Beard",
    cat: "Beard",
    note: "Chin strap with a sculpted moustache.",
  },
  {
    slug: "faded-beard",
    name: "Faded Beard",
    cat: "Beard",
    note: "Beard blended into the sideburns and fade.",
  },
  // ---- combos ----
  {
    slug: "fade-beard",
    name: "Fade + Full Beard",
    cat: "Combo",
    note: "Skin fade with a sculpted full beard.",
  },
  {
    slug: "quiff-stubble",
    name: "Quiff + Stubble",
    cat: "Combo",
    note: "Volume on top, sharp stubble below.",
  },
  {
    slug: "slick-boxed",
    name: "Slick Back + Boxed Beard",
    cat: "Combo",
    note: "Sharp, formal and head-turning.",
  },
  {
    slug: "crop-goatee",
    name: "Textured Crop + Goatee",
    cat: "Combo",
    note: "Modern top with a classic chin line.",
  },
];

// Jis style ki apni alag image deni ho yahan add kar do: "slug": "/images/file.png"
const styleImgOverride: Record<string, string> = {
  "low-fade": "/images/spcr.png",
  "mid-fade": "/images/styles/mid-fade.png",
  "high-fade": "/images/styles/high-fade.png",
  "taper-fade": "/images/styles/taper-fade.png",
  "burst-fade": "/images/styles/burst-fade.png",
  "drop-fade": "/images/styles/drop-fade.png",
  "textured-crop": "/images/styles/textured-crop.png",
  "french-crop": "/images/styles/french-crop.png",
};

/**
 * In styles ki image me title, category aur "BOOK THIS STYLE" pehle se
 * chhape hue hain, isliye card in par apna text dobara nahi lagata.
 */
const styleBaked = new Set<string>([
  "mid-fade",
  "high-fade",
  "taper-fade",
  "burst-fade",
  "drop-fade",
  "textured-crop",
  "french-crop",
]);
export const styleIsBaked = (slug: string) => styleBaked.has(slug);

/** Style ki photo: public/images/styles/<slug>.jpg (.png/.webp bhi chalega) */
export const styleImg = (slug: string) =>
  styleImgOverride[slug] ?? `/images/styles/${slug}.jpg`;

/** Photo na ho to har style ka apna HD illustration dikhta hai */
const styleArtMap: Record<string, ArtSpec> = {
  "low-fade": { hair: "sidePart", fade: "low" },
  "mid-fade": { hair: "crop", fade: "mid" },
  "high-fade": { hair: "quiff", fade: "high" },
  "taper-fade": { hair: "crop", fade: "taper" },
  "burst-fade": { hair: "crop", fade: "burst", beard: "stubble" },
  "drop-fade": { hair: "slickBack", fade: "drop" },
  "textured-crop": { hair: "crop" },
  "french-crop": { hair: "frenchCrop" },
  quiff: { hair: "quiff", fade: "taper" },
  pompadour: { hair: "pompadour", fade: "low" },
  "slick-back": { hair: "slickBack" },
  "side-part": { hair: "sidePart" },
  "buzz-cut": { hair: "buzz" },
  "curly-fade": { hair: "curly", fade: "mid" },
  undercut: { hair: "undercut", fade: "high" },
  mullet: { hair: "mullet" },
  "full-beard": { hair: "sidePart", fade: "low", beard: "full" },
  "boxed-beard": { hair: "crop", fade: "mid", beard: "boxed" },
  stubble: { hair: "frenchCrop", fade: "taper", beard: "stubble" },
  goatee: { hair: "buzz", beard: "goatee" },
  "van-dyke": { hair: "slickBack", beard: "vandyke" },
  "circle-beard": { hair: "crop", fade: "low", beard: "circle" },
  "anchor-beard": { hair: "quiff", fade: "mid", beard: "anchor" },
  "faded-beard": { hair: "sidePart", fade: "high", beard: "faded" },
  "fade-beard": { hair: "crop", fade: "high", beard: "full" },
  "quiff-stubble": { hair: "quiff", fade: "low", beard: "stubble" },
  "slick-boxed": { hair: "slickBack", fade: "mid", beard: "boxed" },
  "crop-goatee": { hair: "crop", fade: "taper", beard: "goatee" },
};
export const styleArt = (slug: string): ArtSpec =>
  styleArtMap[slug] ?? { hair: "crop" };

export interface GalleryItem {
  img: string;
  label: string;
  pos?: string;
  then?: Crop;
}

/** Gallery: apni gallery-1.jpg ... gallery-4.jpg daalo, warna maujooda photos ke close-ups dikhte hain */
export const gallery: GalleryItem[] = [
  {
    img: "/images/gallery-1.jpg",
    label: "Master barber",
    then: { src: "/images/ahad.png", pos: "50% 20%", zoom: 1 },
  },
  {
    img: "/images/styles/drop-fade.png",
    label: "Clipper work",
    pos: "50% 100%",
  },
  {
    img: "/images/styles/burst-fade.png",
    label: "Fresh fade",
    pos: "50% 100%",
  },
  {
    img: "/images/styles/high-fade.png",
    label: "Beard detail",
    pos: "50% 100%",
  },
];

export const why = [
  [
    "7 years of craft",
    "Cutting since 2019, with thousands of happy regulars.",
    "craft",
  ],
  [
    "Sterilised tools",
    "Every blade and comb is cleaned before each client.",
    "shield",
  ],
  [
    "Premium products",
    "Quality oils, creams and razors, never shortcuts.",
    "star",
  ],
  [
    "On-time chairs",
    "Book a slot and your chair is ready when you arrive.",
    "clock",
  ],
];

export const steps = [
  [
    "01",
    "Pick your service",
    "Choose a cut, beard work or a full groom package.",
  ],
  ["02", "Reserve your chair", "Send your day and time. We confirm by phone."],
  ["03", "Sit back and relax", "Walk in, enjoy the chair and walk out sharp."],
];
