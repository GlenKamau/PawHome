import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, PawPrint, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/pets", label: "Find a pet" },
  { to: "/pets/new", label: "List a pet", cta: true },
];

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const linkClass =
    (cta) =>
    ({ isActive }) =>
      `flex items-center rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
        cta
          ? "bg-coral text-ink hover:bg-coral-dark"
          : isActive
            ? "bg-ivory/15 text-ivory"
            : "text-ivory/90 hover:bg-ivory/10"
      }`;

  const renderLinks = () =>
    links.map((l) => (
      <NavLink key={l.to} to={l.to} end className={linkClass(l.cta)}>
        {l.label}
      </NavLink>
    ));

  return (
    <header className="sticky top-0 z-30 bg-teal-deep text-ivory shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-heading text-2xl font-bold tracking-tight text-ivory"
        >
          <PawPrint size={26} aria-hidden="true" />
          PawHome
        </Link>

      
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {renderLinks()}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-md text-ivory hover:bg-ivory/10 md:hidden"
        >
          {menuOpen ? (
            <X size={24} aria-hidden="true" />
          ) : (
            <Menu size={24} aria-hidden="true" />
          )}
        </button>
      </div>

      
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="flex flex-col gap-1 border-t border-ivory/20 px-4 py-3 md:hidden"
        >
          {renderLinks()}
        </nav>
      )}
    </header>
  );
}
