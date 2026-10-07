import { useEffect, useRef, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isOwner } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const links: string[][] = [
    ["/", "Home"],
    ["/services", "Services"],
    ["/about", "About"],
    ["/contact", "Contact"],
    ["/book", "Book"],
  ];
  if (isOwner) links.push(["/dashboard", "Dashboard"]);
  const name = String(user?.user_metadata?.full_name || user?.email || "?");

  // scroll progress line under the navbar
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const p = h.scrollHeight - h.clientHeight;
      if (bar.current)
        bar.current.style.transform = `scaleX(${p > 0 ? h.scrollTop / p : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const down = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenu(false);
    };
    document.addEventListener("mousedown", down);
    return () => document.removeEventListener("mousedown", down);
  }, [menu]);

  async function logout() {
    await supabase.auth.signOut();
    setOpen(false);
    setMenu(false);
    toast.success("Logged out");
    navigate("/");
  }

  return (
    <>
      <header className="kx-nav">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="font-display text-2xl font-bold tracking-wide gold-text-light transition-transform duration-300 hover:scale-[1.03]"
          >
            AHAD{" "}
            <span className="align-top font-sans text-[10px] tracking-[0.25em] text-white">
              BARBER ATELIER
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1.5 lg:flex"
            aria-label="Main"
          >
            {links.map(([to, t]) => (
              <NavLink key={to} to={to} end={to === "/"} className="kx-navlink">
                {t}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em]">
              OPEN 10AM – 10PM
            </span>
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenu((m) => !m)}
                  aria-label="Account menu"
                  className="kx-avatar"
                >
                  <span>{name[0].toUpperCase()}</span>
                </button>
                {menu && (
                  <div className="kx-menu absolute right-0 mt-3 w-60 animate-floatUp py-2">
                    <p className="truncate px-4 pt-2 text-sm font-semibold">
                      {String(user.user_metadata?.full_name || "Member")}
                    </p>
                    <p className="truncate px-4 pb-3 text-xs text-white/50">
                      {user.email}
                    </p>
                    <div className="my-1 border-t border-white/10" />
                    {isOwner && (
                      <Link to="/dashboard" className="kx-menu-item">
                        Dashboard
                      </Link>
                    )}
                    <Link to="/profile" className="kx-menu-item">
                      Profile &amp; account
                    </Link>
                    <Link to="/book" className="kx-menu-item">
                      Book a chair
                    </Link>
                    <div className="my-1 border-t border-white/10" />
                    <button
                      onClick={logout}
                      className="kx-menu-item kx-menu-item--danger"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="kx-btn-ghost-light !px-4 !py-2">
                  Log in
                </Link>
                <Link to="/signup" className="kx-btn-light !px-4 !py-2">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="-mr-2 p-2 text-white lg:hidden"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
        <div ref={bar} className="kx-progress" />

        {open && (
          <div className="flex animate-floatUp flex-col gap-2 border-t border-white/10 px-4 py-4 lg:hidden">
            {links.map(([to, t]) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className="kx-navlink !h-11 !justify-start"
              >
                {t}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link to="/profile" className="kx-navlink !h-11 !justify-start">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="kx-navlink !h-11 !justify-start !text-rose-300"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Link to="/login" className="kx-btn-ghost-light">
                  Log in
                </Link>
                <Link to="/signup" className="kx-btn-light">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="pt-[68px]">{children}</main>

      <footer className="kx-footer">
        <div className="pole" />
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Link
                to="/"
                className="font-display text-2xl font-bold tracking-wide gold-text-light"
              >
                AHAD{" "}
                <span className="align-top font-sans text-[10px] tracking-[0.25em] text-white">
                  BARBER ATELIER
                </span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                Muhammad Ahad · Cutting since 2019. Every cut, a signature.
              </p>
            </div>
            <div>
              <p className="kx-eyebrow-light mb-4">EXPLORE</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  ["/", "Home"],
                  ["/services", "Services"],
                  ["/about", "About"],
                ].map(([to, t]) => (
                  <li key={to}>
                    <Link to={to} className="kx-footer-link">
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kx-eyebrow-light mb-4">ACCOUNT</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  ["/book", "Book a chair"],
                  ["/login", "Log in"],
                  ["/signup", "Sign up"],
                ].map(([to, t]) => (
                  <li key={to}>
                    <Link to={to} className="kx-footer-link">
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="kx-eyebrow-light mb-4">VISIT</p>
              <ul className="flex flex-col gap-2.5 text-sm text-white/65">
                <li>Open daily, 10 am – 10 pm</li>
                <li>+92 300 0000000</li>
                <li>hello@ahadbarber.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
            <p className="text-xs text-white/45">
              Sterilised tools · Premium products · On-time chairs
            </p>
            <p className="text-xs text-white/45">© Muhammad Ahad</p>
          </div>
        </div>
      </footer>
    </>
  );
}
