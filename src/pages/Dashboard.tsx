import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";
import { services } from "../lib/data";
import CountUp from "../components/CountUp";
import "./dashboard.css";

type Booking = {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: string;
};
type Msg = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};
type Tab = "overview" | "bookings" | "messages";
type Filter = "all" | "pending" | "confirmed" | "cancelled";

const I = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const ICONS: Record<Tab, JSX.Element> = {
  overview: (
    <svg {...I}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  ),
  bookings: (
    <svg {...I}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  messages: (
    <svg {...I}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z" />
    </svg>
  ),
};
const TABS: { key: Tab; label: string; title: string; blurb: string }[] = [
  {
    key: "overview",
    label: "Overview",
    title: "Shop overview",
    blurb: "Bookings, revenue and messages at a glance.",
  },
  {
    key: "bookings",
    label: "Bookings",
    title: "Bookings",
    blurb: "Confirm or cancel client chairs.",
  },
  {
    key: "messages",
    label: "Messages",
    title: "Messages",
    blurb: "Notes sent from the contact form.",
  },
];
const priceOf = (name: string) =>
  services.find((s) => s.name === name)?.amount ?? 0;
const chip = (s: string) =>
  s === "confirmed"
    ? "kx-chip-up"
    : s === "cancelled"
      ? "kx-chip-down"
      : "kx-chip-wait";

export default function Dashboard() {
  const { user, loading, isOwner } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [tab, setTab] = useState<Tab>("overview");
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setBusy(true);
    const b = await supabase
      .from("bookings")
      .select("*")
      .order("date", { ascending: false });
    const m = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (b.error) toast.error(b.error.message);
    else setBookings(b.data as Booking[]);
    if (m.error) toast.error(m.error.message);
    else setMessages(m.data as Msg[]);
    setBusy(false);
  }, []);
  useEffect(() => {
    if (isOwner) load();
  }, [isOwner, load]);

  async function setStatus(id: string, status: string) {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Booking ${status}`);
    load();
  }

  const count = (s: string) => bookings.filter((b) => b.status === s).length;
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = bookings.filter(
    (b) => b.date === today && b.status !== "cancelled",
  ).length;
  const revenue = useMemo(
    () =>
      bookings
        .filter((b) => b.status === "confirmed")
        .reduce((a, b) => a + priceOf(b.service), 0),
    [bookings],
  );
  const perService = useMemo(
    () =>
      services.map((s) => ({
        name: s.name,
        n: bookings.filter(
          (b) => b.service === s.name && b.status !== "cancelled",
        ).length,
      })),
    [bookings],
  );
  const maxSvc = Math.max(1, ...perService.map((s) => s.n));
  const shown = bookings.filter(
    (b) =>
      (filter === "all" || b.status === filter) &&
      (!q ||
        `${b.name} ${b.phone} ${b.service}`
          .toLowerCase()
          .includes(q.toLowerCase())),
  );
  const upcoming = bookings
    .filter((b) => b.date >= today && b.status !== "cancelled")
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 5);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!isOwner) return <Navigate to="/" replace />;

  const active = TABS.find((t) => t.key === tab)!;
  const name = String(user.user_metadata?.full_name || user.email || "Owner");
  const total = Math.max(1, bookings.length);

  const stats: [string, number, string, string][] = [
    ["Total bookings", bookings.length, "", ""],
    ["Pending", count("pending"), "", "kx-chip-wait"],
    ["Confirmed", count("confirmed"), "", "kx-chip-up"],
    ["Messages", messages.length, "", ""],
  ];

  return (
    <div className="kx-page min-h-[calc(100vh-68px)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="vault-shell grid min-h-[720px] grid-cols-[minmax(0,1fr)] lg:grid-cols-[272px_minmax(0,1fr)]">
          {/* ===== sidebar ===== */}
          <aside className="vault-side flex min-w-0 flex-col gap-6 p-5 lg:p-6">
            <Link
              to="/"
              className="inline-block self-start font-display text-xl font-bold tracking-wide gold-text-light transition-transform hover:scale-[1.03]"
            >
              AHAD{" "}
              <span className="align-top font-sans text-[9px] tracking-[0.25em] text-white">
                BARBER ATELIER
              </span>
            </Link>
            <div className="vside-user">
              <span className="vside-avatar">{name[0].toUpperCase()}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{name}</p>
                <p className="kx-live !text-[11px]">Owner · online</p>
              </div>
            </div>
            <nav className="flex flex-col gap-1.5" aria-label="Dashboard">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  aria-current={tab === t.key ? "page" : undefined}
                  className="vault-nav-item"
                >
                  {ICONS[t.key]}
                  {t.label}
                  {t.key === "bookings" && (
                    <span className="vault-badge">{count("pending")}</span>
                  )}
                  {t.key === "messages" && (
                    <span className="vault-badge">{messages.length}</span>
                  )}
                </button>
              ))}
            </nav>
            <div className="mt-auto kx-glass p-4 text-sm">
              <p className="kx-eyebrow-light !text-[10px]">TODAY</p>
              <p className="mt-1 font-display text-3xl font-bold">
                <CountUp to={todayCount} />
              </p>
              <p className="kx-muted-light text-xs">chairs booked today</p>
            </div>
          </aside>

          {/* ===== main ===== */}
          <section className="vault-main min-w-0 p-5 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="kx-eyebrow">DASHBOARD</p>
                <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
                  {active.title}
                </h1>
                <p className="mt-1 text-sm text-ink/55">{active.blurb}</p>
              </div>
              <button
                onClick={load}
                disabled={busy}
                className="btn !px-5 !py-2.5"
              >
                {busy ? "REFRESHING..." : "REFRESH"}
              </button>
            </div>

            {tab === "overview" && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                  {stats.map(([l, n, , c], i) => (
                    <div
                      key={l}
                      className="vault-card p-5"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <p className="kx-eyebrow !text-[10px]">{l}</p>
                      <p className="mt-2 font-display text-4xl font-bold">
                        <CountUp to={n} />
                      </p>
                      {c && (
                        <span className={`kx-chip mt-2 ${c}`}>
                          {l.toLowerCase()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
                  <div className="vault-card dark p-6">
                    <p className="kx-eyebrow-light">CONFIRMED REVENUE (EST.)</p>
                    <p className="mt-2 font-display text-5xl font-black">
                      <CountUp to={revenue} prefix="Rs " />
                    </p>
                    <p className="kx-muted-light mt-1 text-sm">
                      From confirmed bookings at menu prices.
                    </p>
                    <div
                      className="vbar mt-6"
                      style={{ background: "rgba(255,255,255,.15)" }}
                    >
                      <span
                        style={{
                          width: `${(count("confirmed") / total) * 100}%`,
                          background: "#34d399",
                        }}
                      />
                      <span
                        style={{
                          width: `${(count("pending") / total) * 100}%`,
                          background: "#fbbf24",
                        }}
                      />
                      <span
                        style={{
                          width: `${(count("cancelled") / total) * 100}%`,
                          background: "#fb7185",
                        }}
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-white/70">
                      <span>● Confirmed {count("confirmed")}</span>
                      <span>● Pending {count("pending")}</span>
                      <span>● Cancelled {count("cancelled")}</span>
                    </div>
                  </div>
                  <div className="vault-card p-6">
                    <h2 className="font-display text-xl font-bold">
                      Upcoming chairs
                    </h2>
                    <div className="mt-4 space-y-2">
                      {upcoming.map((b) => (
                        <div
                          key={b.id}
                          className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-navy-50"
                        >
                          <div className="min-w-0">
                            <p className="truncate font-semibold">{b.name}</p>
                            <p className="truncate text-xs text-ink/50">
                              {b.service}
                            </p>
                          </div>
                          <span className="whitespace-nowrap text-xs text-navy-700">
                            {b.date} {b.time.slice(0, 5)}
                          </span>
                        </div>
                      ))}
                      {!upcoming.length && (
                        <p className="text-sm text-ink/50">
                          Nothing upcoming yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="vault-card p-6">
                  <h2 className="font-display text-xl font-bold">
                    Bookings by service
                  </h2>
                  <div className="mt-4">
                    {perService.map((s) => (
                      <div key={s.name} className="vrow">
                        <span className="truncate">{s.name}</span>
                        <div className="vbar">
                          <span
                            style={{
                              width: `${(s.n / maxSvc) * 100}%`,
                              background:
                                "linear-gradient(90deg,#1e3a8a,#5a82cf)",
                            }}
                          />
                        </div>
                        <b className="text-right">{s.n}</b>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "bookings" && (
              <div className="mt-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="vault-chips">
                    {(
                      ["all", "pending", "confirmed", "cancelled"] as Filter[]
                    ).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        aria-current={filter === f}
                        className="vault-chip"
                      >
                        {f[0].toUpperCase() + f.slice(1)}{" "}
                        {f === "all" ? bookings.length : count(f)}
                      </button>
                    ))}
                  </div>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search name, phone, service"
                    className="field !w-full sm:!w-72"
                  />
                </div>
                <div className="vault-card mt-5 overflow-x-auto !rounded-2xl hover:!translate-y-0">
                  <table className="vtable">
                    <thead>
                      <tr>
                        {[
                          "Client",
                          "Phone",
                          "Service",
                          "When",
                          "Status",
                          "",
                        ].map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {shown.map((b) => (
                        <tr key={b.id}>
                          <td className="font-semibold">{b.name}</td>
                          <td>{b.phone}</td>
                          <td>{b.service}</td>
                          <td className="whitespace-nowrap">
                            {b.date} {b.time.slice(0, 5)}
                          </td>
                          <td>
                            <span className={`kx-chip ${chip(b.status)}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="space-x-2 whitespace-nowrap text-right">
                            <button
                              onClick={() => setStatus(b.id, "confirmed")}
                              className="vbtn vbtn-ok"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setStatus(b.id, "cancelled")}
                              className="vbtn vbtn-no"
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                      {!shown.length && (
                        <tr>
                          <td
                            colSpan={6}
                            className="py-12 text-center text-ink/50"
                          >
                            No bookings here yet. They appear when clients book.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "messages" && (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {messages.map((m, i) => (
                  <div
                    key={m.id}
                    className="vault-card p-6"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="vside-avatar !h-10 !w-10 !text-sm text-white">
                        {m.name[0]?.toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{m.name}</p>
                        <a
                          href={`mailto:${m.email}`}
                          className="link-line truncate text-xs text-navy-700"
                        >
                          {m.email}
                        </a>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-ink/70">
                      {m.message}
                    </p>
                    <p className="mt-3 text-xs text-ink/40">
                      {new Date(m.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
                {!messages.length && (
                  <p className="text-ink/50">No messages yet.</p>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
