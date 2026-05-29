import { Link } from "@tanstack/react-router";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/reliv-logo.jpg";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "How to Use", hash: "how" },
  { label: "Why us?", hash: "why" },
  { label: "Services", hash: "services" },
  { label: "Contact us", hash: "contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-6xl px-4">
      <div className="flex items-center justify-between rounded-full border border-border bg-white/90 px-4 py-2 shadow-sm backdrop-blur md:px-6">
        <div className="flex items-center gap-6">
          <a href="/#how" className="hidden text-sm font-medium text-foreground/80 hover:text-primary md:inline">How to Use</a>
          <a href="/#why" className="hidden text-sm font-medium text-foreground/80 hover:text-primary md:inline">Why us?</a>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Reliv logo" className="h-8 w-auto" width={160} height={40} />
        </Link>
        <div className="flex items-center gap-3">
          <a href="/#services" className="hidden text-sm font-medium text-foreground/80 hover:text-primary md:inline">Services</a>
          <a href="/#contact" className="hidden text-sm font-medium text-foreground/80 hover:text-primary md:inline">Contact us</a>

          {user ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => signOut()}
              className="hidden rounded-full md:inline-flex"
            >
              <LogOut className="h-4 w-4" /> Log out
            </Button>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button asChild size="sm" variant="ghost" className="rounded-full">
                <Link to="/auth">Log in</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full">
                <Link to="/auth">Sign up</Link>
              </Button>
            </div>
          )}

          <button
            aria-label="Toggle menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-2 rounded-2xl border border-border bg-white p-4 shadow-md md:hidden">
          <nav className="flex flex-col gap-2">
            {nav.map((n) => (
              <a
                key={n.label}
                href={`/#${n.hash}`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
            <Link
              to="/terms"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
            >
              Terms &amp; Conditions
            </Link>
            <div className="mt-2 border-t border-border pt-2">
              {user ? (
                <Button onClick={() => { setOpen(false); signOut(); }} variant="outline" className="w-full rounded-full">
                  <LogOut className="h-4 w-4" /> Log out
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1 rounded-full">
                    <Link to="/auth" onClick={() => setOpen(false)}>Log in</Link>
                  </Button>
                  <Button asChild className="flex-1 rounded-full">
                    <Link to="/auth" onClick={() => setOpen(false)}>Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
