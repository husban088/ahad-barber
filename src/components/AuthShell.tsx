import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function AuthShell({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <section className="kx-page flex min-h-[100vh] items-center justify-center px-4 pb-10 pt-28">
      <div className="grid w-full max-w-5xl animate-pop overflow-hidden rounded-3xl border border-navy-100 shadow-navy-lg md:grid-cols-2">
        <div className="kx-hero hidden flex-col justify-between p-10 md:flex">
          <div className="kx-guilloche" />
          <div className="kx-hero-inner">
            <Link
              to="/"
              className="font-display text-2xl font-bold tracking-wide gold-text-light"
            >
              AHAD{" "}
              <span className="align-top font-sans text-[10px] tracking-[0.25em] text-white">
                BARBER ATELIER
              </span>
            </Link>
            <h2 className="mt-10 font-display text-3xl font-bold leading-tight">
              A sharp cut starts with a{" "}
              <span className="gold-text-light">good chair.</span>
            </h2>
            <p className="kx-muted-light mt-3 max-w-xs text-sm">
              Muhammad Ahad · Barber Atelier
            </p>
          </div>
          <div className="kx-hero-inner flex items-center justify-center py-8">
            <div className="kx-orbit h-36 w-36">
              <div
                className="kx-ring"
                style={{
                  inset: 0,
                  border: "1px solid rgba(161,161,170,.45)",
                  animation: "kxspin 12s linear infinite",
                }}
              />
              <div
                className="kx-ring"
                style={{
                  inset: 18,
                  border: "1px solid rgba(161,161,170,.25)",
                  animation: "kxspin 18s linear infinite reverse",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-display text-6xl font-black gold-text-light">
                A
              </div>
            </div>
          </div>
          <div className="kx-hero-inner space-y-3 text-sm text-white/70">
            {[
              "Book your chair in a minute",
              "Manage your profile & bookings",
              "Sterilised tools, every client",
            ].map((t) => (
              <p key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-navy-300" /> {t}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center bg-white p-8 sm:p-10">
          <h1 className="font-display text-3xl font-bold text-ink">{title}</h1>
          <p className="mb-8 mt-2 text-sm text-ink/55">{sub}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
