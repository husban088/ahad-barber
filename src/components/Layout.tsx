import { useEffect, useRef, useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";

/* ---------------- icons ---------------- */
const I = (d: ReactNode) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {d}
  </svg>
);
const icons: Record<string, JSX.Element> = {
  home: I(
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </>,
  ),
  scissors: I(
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
    </>,
  ),
  styles: I(
    <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />,
  ),
  gallery: I(
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M21 16l-5-5-8 9" />
    </>,
  ),
  about: I(
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
    </>,
  ),
  contact: I(
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>,
  ),
  book: I(
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>,
  ),
  dash: I(
    <>
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </>,
  ),
  user: I(
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
    </>,
  ),
  login: I(
    <>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <path d="M10 17l5-5-5-5M15 12H3" />
    </>,
  ),
  logout: I(
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5M21 12H9" />
    </>,
  ),
  phone: I(
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  ),
  clock: I(
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>,
  ),
};

interface NavItem {
  path: string;
  hash?: string;
  label: string;
  icon: string;
}

const BASE_LINKS: NavItem[] = [
  { path: "/", label: "Home", icon: "home" },
  { path: "/services", label: "Services", icon: "scissors" },
  { path: "/", hash: "styles", label: "Styles", icon: "styles" },
  { path: "/", hash: "gallery", label: "Gallery", icon: "gallery" },
  { path: "/about", label: "About", icon: "about" },
  { path: "/contact", label: "Contact", icon: "contact" },
];

const hrefOf = (l: NavItem) => (l.hash ? `${l.path}#${l.hash}` : l.path);

const Logo = ({ small = false }: { small?: boolean }) => (
  <Link
    to="/"
    aria-label="Ahad Barber Atelier, home"
    className="inline-flex min-w-0 items-baseline whitespace-nowrap font-display font-bold tracking-wide gold-text-light transition-transform duration-300 hover:scale-[1.03]"
  >
    <span className={small ? "text-xl" : "text-xl sm:text-2xl"}>AHAD</span>
    <span
      className={`ml-1.5 align-top font-sans text-[9px] tracking-[0.25em] text-white sm:text-[10px] ${small ? "inline" : "hidden min-[400px]:inline"}`}
    >
      BARBER ATELIER
    </span>
  </Link>
);

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false); // sidebar drawer
  const [menu, setMenu] = useState(false); // desktop account menu
  const bar = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isOwner } = useAuth();
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  const links: NavItem[] = [...BASE_LINKS];
  if (isOwner)
    links.push({ path: "/dashboard", label: "Dashboard", icon: "dash" });

  const isActive = (l: NavItem) =>
    pathname === l.path &&
    (l.hash ? hash === `#${l.hash}` : l.path !== "/" || hash === "");

  const name = String(user?.user_metadata?.full_name || user?.email || "?");
  const initial = (name[0] || "?").toUpperCase();

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
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [pathname]);

  // page badalte hi sidebar / menu band
  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname, hash]);

  // sidebar khula ho to piche scroll lock + Esc se band
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", key);
    };
  }, [open]);

  // bari screen par aate hi sidebar band
  useEffect(() => {
    const on = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

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
      {/* ================= NAVBAR ================= */}
      <header className="kx-nav">
        <div className="mx-auto flex h-[68px] max-w-[88rem] items-center justify-between gap-3 px-4 sm:px-6 xl:px-8">
          <Logo />

          {/* desktop links */}
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={hrefOf(l)}
                to={hrefOf(l)}
                aria-current={isActive(l) ? "page" : undefined}
                className="kx-navlink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* desktop right side */}
          <div className="hidden items-center gap-3 xl:flex">
            <span className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] 2xl:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              OPEN 10AM – 10PM
            </span>
            <Link to="/book" className="kx-btn-light !px-5 !py-2.5">
              Book now
            </Link>
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenu((m) => !m)}
                  aria-label="Account menu"
                  aria-expanded={menu}
                  className="kx-avatar"
                >
                  <span>{initial}</span>
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
                <Link to="/login" className="kx-btn-ghost-light !px-4 !py-2.5">
                  Log in
                </Link>
                <Link to="/signup" className="kx-btn-ghost-light !px-4 !py-2.5">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* mobile / tablet: Book + hamburger */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              to="/book"
              className="kx-btn-light hidden !px-4 !py-2 !text-[13px] sm:inline-flex"
            >
              Book now
            </Link>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="kx-sidebar"
              onClick={() => setOpen((o) => !o)}
              className="kx-burger"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div ref={bar} className="kx-progress" />
      </header>

      {/* ================= SIDEBAR (mobile + tablet) ================= */}
      <div
        className={`kx-overlay xl:hidden ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="kx-sidebar"
        className={`kx-drawer xl:hidden ${open ? "is-open" : ""}`}
        aria-label="Site menu"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <Logo small />
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="kx-burger"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5">
          {user ? (
            <div className="kx-glass mb-5 flex items-center gap-3 px-4 py-3">
              <span className="kx-avatar shrink-0">
                <span>{initial}</span>
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {String(user.user_metadata?.full_name || "Member")}
                </p>
                <p className="truncate text-xs text-white/55">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="mb-5 grid grid-cols-2 gap-3">
              <Link to="/login" className="kx-btn-ghost-light">
                Log in
              </Link>
              <Link to="/signup" className="kx-btn-light">
                Sign up
              </Link>
            </div>
          )}

          <p className="kx-eyebrow-light mb-3 px-2 !text-[10px]">MENU</p>
          <nav className="flex flex-col gap-1.5" aria-label="Sidebar">
            {links.map((l, i) => (
              <Link
                key={hrefOf(l)}
                to={hrefOf(l)}
                aria-current={isActive(l) ? "page" : undefined}
                className="kx-drawer-link"
                style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
              >
                {icons[l.icon]}
                <span>{l.label}</span>
              </Link>
            ))}
          </nav>

          <Link to="/book" className="kx-btn-light mt-5 w-full">
            {icons.book}
            BOOK YOUR CHAIR
          </Link>

          {user && (
            <>
              <p className="kx-eyebrow-light mb-3 mt-7 px-2 !text-[10px]">
                ACCOUNT
              </p>
              <div className="flex flex-col gap-1.5">
                <Link to="/profile" className="kx-drawer-link">
                  {icons.user}
                  <span>Profile &amp; account</span>
                </Link>
                <button
                  onClick={logout}
                  className="kx-drawer-link !text-rose-300"
                >
                  {icons.logout}
                  <span>Log out</span>
                </button>
              </div>
            </>
          )}
        </div>

        <div className="space-y-2 border-t border-white/10 px-5 py-4 text-sm text-white/65">
          <p className="flex items-center gap-2.5">
            {icons.clock} Open daily, 10 am – 10 pm
          </p>
          <p className="flex items-center gap-2.5">
            {icons.phone} +92 300 0000000
          </p>
        </div>
      </aside>

      <main className="min-w-0 overflow-x-clip pt-[68px]">{children}</main>

      {/* ================= FOOTER ================= */}
      <footer className="kx-footer">
        <div className="pole" />
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="col-span-2 md:col-span-1">
              <Logo />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                Muhammad Ahad · Cutting since 2019. Every cut, a signature.
              </p>
            </div>
            <div>
              <p className="kx-eyebrow-light mb-4">EXPLORE</p>
              <ul className="flex flex-col gap-2.5">
                {BASE_LINKS.map((l) => (
                  <li key={hrefOf(l)}>
                    <Link to={hrefOf(l)} className="kx-footer-link">
                      {l.label}
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
                  ["/profile", "Profile"],
                ].map(([to, t]) => (
                  <li key={to}>
                    <Link to={to} className="kx-footer-link">
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="kx-eyebrow-light mb-4">VISIT</p>
              <ul className="flex flex-col gap-2.5 break-words text-sm text-white/65">
                <li>Open daily, 10 am – 10 pm</li>
                <li>+92 300 0000000</li>
                <li>hello@ahadbarber.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center md:flex-row md:text-left">
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
