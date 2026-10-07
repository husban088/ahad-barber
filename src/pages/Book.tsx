import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import Reveal from "../components/Reveal";
import { supabase } from "../lib/supabase";
import { services } from "../lib/data";

export default function Book() {
  const [busy, setBusy] = useState(false);
  async function book(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const d = new FormData(f);
    setBusy(true);
    const { error } = await supabase.from("bookings").insert({
      name: String(d.get("name")),
      phone: String(d.get("phone")),
      service: String(d.get("service")),
      date: String(d.get("date")),
      time: String(d.get("time")),
    });
    setBusy(false);
    if (error) return toast.error("Booking failed: " + error.message);
    toast.success("Booking received. We will confirm by phone.");
    f.reset();
  }
  return (
    <section className="kx-page min-h-[calc(100vh-68px)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-[1fr_1.2fr]">
        <Reveal from="left" className="kx-hero rounded-3xl p-10">
          <div className="kx-guilloche" />
          <div className="kx-hero-inner">
            <p className="kx-eyebrow-light">RESERVE</p>
            <h1 className="mt-3 font-display text-4xl font-black leading-tight">
              Reserve your <span className="gold-text-light">chair</span>
            </h1>
            <p className="kx-muted-light mt-4 text-sm">
              Choose a service, pick a time. We confirm by phone.
            </p>
            <ul className="mt-8 space-y-2">
              {services.map((s) => (
                <li
                  key={s.slug}
                  className="kx-glass flex items-center justify-between px-4 py-3 text-sm"
                >
                  <span>{s.name}</span>
                  <b>{s.price}</b>
                </li>
              ))}
            </ul>
            <p className="kx-live mt-8">Open daily, 10:00 am to 10:00 pm</p>
          </div>
        </Reveal>
        <Reveal from="right" className="kx-card !rounded-3xl p-8 sm:p-10">
          <form onSubmit={book} className="grid gap-5 sm:grid-cols-2">
            <input
              name="name"
              required
              placeholder="Your name"
              className="field"
            />
            <input
              name="phone"
              required
              placeholder="Phone number"
              className="field"
            />
            <select
              name="service"
              required
              defaultValue=""
              className="field sm:col-span-2"
            >
              <option value="" disabled>
                Choose a service
              </option>
              {services.map((s) => (
                <option key={s.slug}>{s.name}</option>
              ))}
            </select>
            <input name="date" type="date" required className="field" />
            <input name="time" type="time" required className="field" />
            <button disabled={busy} className="btn sm:col-span-2">
              {busy ? "SENDING..." : "CONFIRM BOOKING"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
