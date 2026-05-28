import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone, User } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Reliv Healthcare" },
      { name: "description", content: "Read the official Terms & Conditions for using Reliv AI smart preventive healthcare kiosks and digital services." },
      { property: "og:title", content: "Terms & Conditions — Reliv Healthcare" },
      { property: "og:description", content: "Official Terms & Conditions for Reliv — AI smart healthcare kiosk and preventive healthcare platform based in Kolkata." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    n: 1,
    title: "Acceptance of Terms",
    body: (
      <p>
        By accessing or using the Reliv kiosk, website, mobile platform, or associated services,
        you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of
        these Terms, please refrain from using Reliv services. These Terms constitute a legal
        agreement between Reliv Healthcare (&ldquo;Reliv&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) and the user
        (&ldquo;customer&rdquo;, &ldquo;user&rdquo;, or &ldquo;you&rdquo;).
      </p>
    ),
  },
  {
    n: 2,
    title: "Service Overview",
    body: (
      <p>
        Reliv provides AI-assisted smart healthcare kiosk services that enable users to perform
        wellness checkups, monitor health parameters, access preventive healthcare insights,
        receive digital reports, and obtain approved wellness or healthcare essentials through a
        secure and automated kiosk experience.
      </p>
    ),
  },
  {
    n: 3,
    title: "Customer Responsibilities",
    body: (
      <ul>
        <li>Users are responsible for entering accurate information while using Reliv services.</li>
        <li>Users must follow all instructions displayed on the kiosk interface.</li>
        <li>Users agree not to tamper with, misuse, damage, or interfere with kiosk hardware, software, sensors, or dispensing systems.</li>
        <li>Users understand that Reliv provides AI-assisted wellness insights and not certified medical diagnosis.</li>
      </ul>
    ),
  },
  {
    n: 4,
    title: "AI Wellness & Health Disclaimer",
    body: (
      <ul>
        <li>Reliv provides AI-assisted preventive healthcare insights, wellness analysis, and risk indications only.</li>
        <li>Reliv does not replace licensed medical professionals, hospitals, clinics, or emergency healthcare services.</li>
        <li>Health scores, stress analysis, wellness predictions, fatigue indicators, skin analysis, or AI-generated recommendations should not be treated as medical diagnosis or guaranteed medical advice.</li>
        <li>Users are advised to consult qualified healthcare professionals for medical concerns or emergencies.</li>
      </ul>
    ),
  },
  {
    n: 5,
    title: "Women Wellness & Hygiene Services",
    body: (
      <p>
        Reliv may provide access to hygiene products, sanitary essentials, wellness support
        systems, and AI-assisted preventive wellness recommendations designed to improve
        accessibility, comfort, dignity, and public healthcare convenience.
      </p>
    ),
  },
  {
    n: 6,
    title: "Payments",
    body: (
      <ul>
        <li>Certain Reliv services may require payment before access or dispensing.</li>
        <li>All transactions are processed securely using integrated third-party payment systems.</li>
        <li>Once services or dispensing are completed, payments are generally non-refundable except in cases of verified technical malfunction attributable to Reliv.</li>
      </ul>
    ),
  },
  {
    n: 7,
    title: "Refunds & Cancellations",
    body: (
      <ul>
        <li>Cancellations are permitted only before service processing or dispensing begins.</li>
        <li>In case of machine malfunction or dispensing failure, Reliv may provide replacement services, re-dispensing, or support assistance at its discretion.</li>
        <li>Refund eligibility does not apply to user misuse, incorrect operation, or external technical failures beyond reasonable control.</li>
      </ul>
    ),
  },
  {
    n: 8,
    title: "Data Privacy & Security",
    body: (
      <ul>
        <li>Health and wellness information processed through Reliv is handled securely using encrypted systems and secure storage practices.</li>
        <li>Certain reports may be shared digitally through QR code, SMS, email, or user accounts based on user consent.</li>
        <li>Reliv aims to automatically clear temporary uploaded or processed data after service completion wherever technically feasible.</li>
        <li>Payment data is handled through secure third-party payment providers.</li>
      </ul>
    ),
  },
  {
    n: 9,
    title: "Intellectual Property",
    body: (
      <p>
        All kiosk interfaces, branding, software systems, AI models, visual designs, technologies,
        content, trademarks, and service concepts associated with Reliv remain the intellectual
        property of Reliv Healthcare unless otherwise stated.
      </p>
    ),
  },
  {
    n: 10,
    title: "Limitation of Liability",
    body: (
      <>
        <p>Reliv Healthcare shall not be liable for:</p>
        <ul>
          <li>Any indirect, incidental, consequential, or special damages.</li>
          <li>User interpretation or misuse of AI-generated wellness insights.</li>
          <li>Medical decisions made solely based on kiosk-generated reports.</li>
          <li>Service interruptions, internet failures, or technical downtime beyond reasonable operational control.</li>
        </ul>
      </>
    ),
  },
  {
    n: 11,
    title: "User Conduct",
    body: (
      <>
        <p>Users must not:</p>
        <ul>
          <li>Attempt unauthorized access to kiosk systems.</li>
          <li>Upload malicious software or harmful content.</li>
          <li>Damage, vandalize, obstruct, or misuse kiosk infrastructure.</li>
          <li>Use Reliv services for unlawful, fraudulent, or abusive purposes.</li>
        </ul>
      </>
    ),
  },
  {
    n: 12,
    title: "Modifications",
    body: (
      <p>
        Reliv Healthcare reserves the right to modify, suspend, improve, or discontinue services,
        features, pricing, or Terms &amp; Conditions at any time without prior notice.
      </p>
    ),
  },
  {
    n: 13,
    title: "Governing Law & Jurisdiction",
    body: (
      <p>
        These Terms &amp; Conditions shall be governed by and interpreted in accordance with the
        laws of India. Any disputes arising in connection with Reliv services shall be subject to
        the exclusive jurisdiction of the courts in Kolkata, West Bengal, India.
      </p>
    ),
  },
];

function TermsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade" />
      <div className="relative">
        <div className="pt-6">
          <Header />
        </div>

        <main className="mx-auto max-w-3xl px-6 pb-24 pt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <header className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Reliv Healthcare</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
              Terms &amp; <span className="text-gradient-orange">Conditions</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Reliv is a Kolkata-based AI-powered smart healthcare kiosk and preventive healthcare
              platform designed to provide instant health checkups, wellness tracking, AI-assisted
              healthcare insights, medicine dispensing, and digital health accessibility in public
              spaces including colleges, metro stations, offices, campuses, highways, and
              institutions.
            </p>
          </header>

          <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <article className="space-y-12">
            {sections.map((s) => (
              <section key={s.n} id={`section-${s.n}`} className="scroll-mt-24">
                <h2 className="flex items-baseline gap-4 text-2xl font-bold tracking-tight md:text-3xl">
                  <span className="text-primary">{String(s.n).padStart(2, "0")}.</span>
                  <span>{s.title}</span>
                </h2>
                <div className="prose-terms mt-4 text-[15px] leading-relaxed text-foreground/80">
                  {s.body}
                </div>
              </section>
            ))}
          </article>

          <div className="my-14 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          {/* Contact card */}
          <section className="rounded-3xl border border-border bg-white p-8 shadow-sm md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Corporate Information &amp; Support
            </p>
            <h3 className="mt-3 text-2xl font-bold md:text-3xl">Reliv Healthcare</h3>
            <p className="mt-1 text-sm italic text-muted-foreground">
              AI Smart Preventive Healthcare Kiosk
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Kolkata, West Bengal, India</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <ContactItem icon={<Mail className="h-4 w-4" />} label="Email">
                <a
                  href="mailto:relivcustomercare.in@gmail.com"
                  className="break-all font-semibold text-primary hover:underline"
                >
                  relivcustomercare.in@gmail.com
                </a>
              </ContactItem>
              <ContactItem icon={<User className="h-4 w-4" />} label="Founder">
                <span className="font-semibold text-foreground">Faizan Khan</span>
              </ContactItem>
              <ContactItem icon={<Phone className="h-4 w-4" />} label="Contact">
                <a href="tel:+919163606455" className="font-semibold text-primary hover:underline">
                  +91 9163606455
                </a>
              </ContactItem>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <style>{`
        .prose-terms ul { list-style: disc; padding-left: 1.25rem; margin-top: 0.5rem; }
        .prose-terms ul li { margin-top: 0.5rem; }
        .prose-terms p + p { margin-top: 0.75rem; }
      `}</style>
    </div>
  );
}

function ContactItem({
  icon,
  label,
  children,
}: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
}
