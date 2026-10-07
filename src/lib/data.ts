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

export const services = [
  {
    slug: "haircut",
    name: "Signature Haircut",
    price: "Rs 1,500",
    amount: 1500,
    note: "Consultation, precision cut and hot towel finish.",
    img: "/images/spcr.png",
  },
  {
    slug: "beard",
    name: "Royal Beard Sculpt",
    price: "Rs 1,200",
    amount: 1200,
    note: "Shape, line-up and warm oil treatment.",
    img: "/images/services/beard.jpg",
  },
  {
    slug: "shave",
    name: "Classic Hot Shave",
    price: "Rs 1,000",
    amount: 1000,
    note: "Straight razor with steamed towels.",
    img: "/images/services/shave.jpg",
  },
  {
    slug: "fade",
    name: "Fade & Taper",
    price: "Rs 1,800",
    amount: 1800,
    note: "Skin, low, mid or high, blended clean.",
    img: "/images/services/fade.jpg",
  },
  {
    slug: "wash",
    name: "Hair Wash & Style",
    price: "Rs 700",
    amount: 700,
    note: "Deep cleanse, scalp massage and styling.",
    img: "/images/services/wash.jpg",
  },
  {
    slug: "groom",
    name: "Groom Package",
    price: "Rs 5,000",
    amount: 5000,
    note: "Cut, beard, facial and styling for the big day.",
    img: "/images/services/groom.jpg",
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
};

export const styleImg = (slug: string) =>
  styleImgOverride[slug] ?? `/images/styles/${slug}.jpg`;

export const gallery = [
  { img: "/images/gallery-1.jpg", label: "The chair" },
  { img: "/images/gallery-2.jpg", label: "Clean edges" },
  { img: "/images/spcr.png", label: "Fresh fade" },
  { img: "/images/gallery-4.jpg", label: "Beard detail" },
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
