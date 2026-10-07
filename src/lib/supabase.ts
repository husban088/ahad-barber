import { createClient } from "@supabase/supabase-js";

const url = (
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) || ""
).trim();
const key = (
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || ""
).trim();

// .env galat ya khali ho to bhi app crash nahi hoga (white screen nahi aayegi)
export const envOk =
  /^https?:\/\//.test(url) && key.length > 20 && !url.includes("YOUR-PROJECT");

export const supabase = createClient(
  envOk ? url : "https://placeholder.supabase.co",
  envOk ? key : "placeholder-anon-key-placeholder",
);
export const API_URL =
  ((import.meta.env.VITE_API_URL as string | undefined) || "").trim() ||
  "http://localhost:4000";
