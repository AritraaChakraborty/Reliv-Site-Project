import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Heart, ShieldCheck, Sparkles, Clock, QrCode, Smartphone, Stethoscope, Activity, Pill } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import kiosk from "@/assets/reliv-kiosk.png";
import person from "@/assets/reliv-person.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reliv — India's Smartest AI Healthcare Kiosk" },
      { name: "description", content: "Reliv is India's AI-powered smart healthcare kiosk — instant checkups, wellness insights and medicine dispensing in public spaces, 24/7." },
      { property: "og:title", content: "Reliv — AI Smart Healthcare Kiosk" },
      { property: "og:description", content: "Instant checkups, wellness tracking and medicine dispensing. Available 24/7 in colleges, metros, offices and highways." },
    ],
  }),
  component: Home,
});

const marquee1 = ["24/7 Service", "Encrypted Reports", "Smart Wellness", "AI Insights", "Medicine Dispensing"];
const marquee2 = ["Zero Queues", "Contactless Checkups", "Instant Reports", "Preventive Care", "Hygiene Essentials"];

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade" />
      <div className="relative">
        <div className="pt-6">
          <Header />
        </div>

        {/* Hero */}
        <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 text-center md:pt-24">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            India's First, Smartest &amp; Fastest
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl">
            Meet <span className="text-gradient-orange">Reliv</span>, Your Anytime, Anywhere AI Healthcare Kiosk
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Instant wellness checkups, preventive health insights and medicine
            dispensing — available 24/7 in colleges, metros, offices and highways.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-orange transition hover:brightness-110"
            >
              Check Health Now <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#franchise"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
            >
              Start a Franchise
            </a>
          </div>

          {/* Kiosk visual */}
          <div className="relative mt-16">
            <FloatingBadge className="left-2 top-10 md:left-10" icon={<ShieldCheck className="h-5 w-5" />} text="100% Secured Reports" />
            <FloatingBadge className="right-2 top-24 md:right-10" icon={<Clock className="h-5 w-5" />} text="Checkup Under 60 Seconds" />
            <FloatingBadge className="bottom-10 left-4 md:left-24" icon={<Heart className="h-5 w-5" />} text="24/7 Availability" variant="soft" />
            <FloatingBadge className="bottom-16 right-4 md:right-24" icon={<Pill className="h-5 w-5" />} text="Medicine Dispensing" variant="soft" />
            <img
              src={kiosk}
              alt="Reliv AI healthcare kiosk"
              className="mx-auto h-auto w-[min(560px,90%)] drop-shadow-2xl"
              width={1024}
              height={1280}
            />
          </div>
        </section>

        {/* Marquees */}
        <section className="border-y border-border bg-primary/5 py-6">
          <Marquee items={marquee1} />
          <Marquee items={marquee2} reverse />
        </section>

        {/* How to use */}
        <section id="how" className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">How to Use?</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold md:text-5xl">
            How to get a checkup using a <span className="text-gradient-orange">Reliv kiosk?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Fast. Secure. Completely Contactless.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "STEP 1", title: "Scan the Kiosk QR", desc: "Each Reliv kiosk has a unique QR — scan it using your mobile camera.", icon: <QrCode /> },
              { n: "STEP 2", title: "Pick Your Service", desc: "Choose a wellness checkup, AI skin analysis, stress check or essentials.", icon: <Smartphone /> },
              { n: "STEP 3", title: "Get AI Insights", desc: "Sensors read your vitals and our AI generates a preventive wellness report.", icon: <Activity /> },
              { n: "STEP 4", title: "Receive Instantly", desc: "Get your digital report via QR/SMS and collect dispensed essentials.", icon: <Stethoscope /> },
            ].map((s) => (
              <div key={s.n} className="group relative rounded-3xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-orange">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary [&_svg]:h-5 [&_svg]:w-5">
                  {s.icon}
                </div>
                <p className="mt-5 text-xs font-bold tracking-widest text-primary">{s.n}</p>
                <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why */}
        <section id="why" className="bg-secondary/40">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Why us?</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold md:text-5xl">
              So, why <span className="text-gradient-orange">Reliv</span> is the smartest way to stay well?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
              Preventive healthcare for a busy world.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { t: "Your health data stays private", d: "Reports are encrypted, never shared, and auto-cleared after your session." },
                { t: "Checkups under 60 seconds", d: "From scanning the kiosk QR to your AI wellness report — lightning fast." },
                { t: "Always available – 24/7", d: "Get a checkup at any hour — early mornings, late nights, weekends & holidays." },
                { t: "India's only self-service health kiosk", d: "No queues, no appointments. Walk up, tap, and you're done." },
                { t: "100% contactless & hygienic", d: "Touchless sensors, dispensed essentials, zero staff dependency." },
                { t: "Built for students, workers & travellers", d: "Need a quick health check or essentials on the go? Reliv has you covered." },
              ].map((c) => (
                <div key={c.t} className="rounded-3xl border border-border bg-white p-7">
                  <div className="h-1 w-10 rounded-full bg-primary" />
                  <h3 className="mt-5 text-lg font-semibold">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compare */}
        <section id="services" className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">Smarter vs Traditional</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-center text-3xl font-bold md:text-5xl">
            And, why <span className="text-gradient-orange">Reliv</span> stands out?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Self-service preventive healthcare vs traditional clinics.
          </p>

          <div className="mt-14 grid items-center gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-white p-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Traditional Clinics</h4>
              <ul className="mt-6 space-y-4 text-sm text-foreground/80">
                {["Limited working hours", "Long queues and delays", "Reports handled manually", "Requires staff interaction", "Higher cost per visit"].map((t) => (
                  <li key={t} className="flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-muted-foreground" />{t}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center">
              <img src={person} alt="Reliv user" className="h-72 w-auto object-contain md:h-96" width={1024} height={1280} loading="lazy" />
            </div>

            <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">With Reliv</h4>
              <ul className="mt-6 space-y-4 text-sm text-foreground">
                {["24×7 access", "Instant checkups under 60s", "Encrypted & auto-deleted", "Zero human interaction needed", "Affordable preventive care"].map((t) => (
                  <li key={t} className="flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Locator / CTA */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-white to-primary/5 p-10 md:p-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Kiosk Locator</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-5xl">
              Find a <span className="text-gradient-orange">Reliv</span> kiosk near you!
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Enter your PIN code to locate the nearest Reliv kiosk. We're rapidly
              expanding across colleges, offices, metro stations and highways.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <input
                placeholder="Enter your PIN code"
                className="h-12 w-full max-w-xs rounded-full border border-border bg-white px-5 text-sm outline-none focus:border-primary"
              />
              <button className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-orange hover:brightness-110">
                Find a kiosk <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Franchise */}
        <section id="franchise" className="mx-auto max-w-6xl px-6 pb-32">
          <div className="rounded-3xl border border-border bg-foreground p-10 text-background md:p-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-glow">10k+ People served</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold md:text-5xl">
              Want to offer 24/7 preventive healthcare to students, employees or visitors?
            </h2>
            <p className="mt-4 max-w-2xl text-background/70">
              Host your own Reliv kiosk in your college, hostel, co-working space or
              public area. We handle setup, maintenance and support — you provide the space.
            </p>
            <a
              href="mailto:relivcustomercare.in@gmail.com"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-orange hover:brightness-110"
            >
              Request Installation <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

function FloatingBadge({
  className = "",
  icon,
  text,
  variant = "solid",
}: { className?: string; icon: React.ReactNode; text: string; variant?: "solid" | "soft" }) {
  return (
    <div
      className={`absolute hidden items-center gap-2 rounded-2xl px-4 py-3 text-xs font-semibold shadow-orange md:inline-flex ${
        variant === "solid" ? "bg-primary text-primary-foreground" : "bg-white text-primary border border-primary/20"
      } ${className}`}
    >
      {icon}
      {text}
    </div>
  );
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max gap-10 whitespace-nowrap py-2 animate-marquee"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-semibold text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
