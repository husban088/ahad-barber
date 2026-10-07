import "dotenv/config";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());
const db = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message)
    return res
      .status(400)
      .json({ error: "Name, email and message are required" });
  if (!/^\S+@\S+\.\S+$/.test(email))
    return res.status(400).json({ error: "Enter a valid email address" });
  const { error } = await db.from("messages").insert({ name, email, message });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true });
});

// Logged-in user apna account delete karta hai (token verify hota hai)
app.delete("/api/account", async (req, res) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Not signed in" });
  const { data, error } = await db.auth.getUser(token);
  if (error || !data.user)
    return res.status(401).json({ error: "Invalid session" });
  const { error: delErr } = await db.auth.admin.deleteUser(data.user.id);
  if (delErr) return res.status(500).json({ error: delErr.message });
  res.json({ ok: true });
});

app.listen(process.env.PORT || 4000, () =>
  console.log("API running on port " + (process.env.PORT || 4000)),
);
