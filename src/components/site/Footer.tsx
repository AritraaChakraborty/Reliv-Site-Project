import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import logo from "@/assets/reliv-logo.jpg";

export function Footer() {
  return (
    <footer id="contact" className="mt-32 border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <img src={logo} alt="Reliv" className="h-12 w-auto" width={200} height={48} loading="lazy" />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Reliv is a Kolkata-based AI-powered smart healthcare kiosk and preventive
              healthcare platform — instant checkups, wellness tracking, and medicine
              dispensing in public spaces.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.instagram.com/reliv_care?igsh=em1yenlrcXRpNXc0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Reliv on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition hover:border-primary hover:text-primary hover:shadow-orange"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/reliv_care?igsh=em1yenlrcXRpNXc0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                @reliv_care
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="/#why" className="hover:text-primary">Why Reliv</a></li>
              <li><a href="/#how" className="hover:text-primary">How it works</a></li>
              <li><a href="/#services" className="hover:text-primary">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/terms" className="hover:text-primary">Terms &amp; Conditions</Link>
              </li>
              <li>
                <a href="mailto:relivcustomercare.in@gmail.com" className="hover:text-primary">
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/reliv_care?igsh=em1yenlrcXRpNXc0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Reliv Healthcare. All rights reserved.</p>
          <p>Kolkata, West Bengal, India</p>
        </div>
      </div>
    </footer>
  );
}
