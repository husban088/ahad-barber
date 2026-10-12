import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import Reveal from "../components/Reveal";
import { API_URL } from "../lib/supabase";

export default function Contact() {
  const [busy, setBusy] = useState(false);
  async function send(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const d = new FormData(f);
    setBusy(true);
    try {
      const r = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: d.get("name"),
          email: d.get("email"),
          message: d.get("message"),
        }),
      });
      if (!r.ok) throw new Error((await r.json()).error || "Request failed");
      toast.success("Message sent. We will reply soon.");
      f.reset();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not send message",
      );
    } finally {
      setBusy(false);
    }
  }
  const info = [
    ["Open daily", "10:00 am to 10:00 pm"],
    ["Phone", "+92 300 0000000"],
    ["Email", "hello@ahadbarber.com"],
  ];
  return (
    <section className="kx-page min-h-[calc(100vh-68px)]">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-16 md:grid-cols-2">
        <Reveal from="left" className="kx-hero rounded-3xl p-6 sm:p-10">
          <div className="kx-guilloche" />
          <div className="kx-hero-inner">
            <p className="kx-eyebrow-light">CONTACT</p>
            <h1 className="mt-3 font-display text-4xl font-black min-[400px]:text-5xl">
              Say <span className="gold-text-light">hello</span>
            </h1>
            <p className="kx-muted-light mt-5 max-w-sm text-sm">
              Questions about a style, a group booking or a wedding package?
              Write to Muhammad Ahad directly.
            </p>
            <div className="mt-10 space-y-3">
              {info.map(([l, v]) => (
                <div key={l} className="kx-glass px-4 py-4 sm:px-5">
                  <p className="kx-eyebrow-light !text-[10px]">{l}</p>
                  <p className="mt-1 break-words font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal from="right" className="kx-card !rounded-3xl p-5 sm:p-10">
          <form onSubmit={send} className="grid gap-5">
            <input
              name="name"
              required
              placeholder="Your name"
              className="field"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="field"
            />
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Your message"
              className="field resize-none"
            />
            <button disabled={busy} className="btn">
              {busy ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
