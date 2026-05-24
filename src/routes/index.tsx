import { createFileRoute } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MessageCircle,
  UserPlus,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Link as LinkIcon,
  FileText,
  Globe,
  ChevronRight,
  QrCode,
  Code2,
  Share2,
} from "lucide-react";
import profileImg from "@/assets/Profile.jpeg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Swatsi Bongani Ratia — Software Developer" },
      {
        name: "description",
        content:
          "Digital business card for a software developer. Scan, call, email, or save the contact instantly.",
      },
    ],
  }),
});

const links = [
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/ratiasb", href: "linkedin.com/in/ratiasb" },
  { icon: Github, label: "GitHub", value: "github.com/ratiasb", href: "github.com/ratiasb" },
  { icon: Globe, label: "Portfolio", value: "yourportfolio.com", href: "#" },
  { icon: FileText, label: "Resume / CV", value: "view or download", href: "#" },
];

const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "Java", "MySQL", "Git", "UI/UX"];

const actions = [
  { icon: Phone, label: "Call", sub: "+27 81 218 5608", tone: "bg-sky-500" },
  { icon: Mail, label: "Email", sub: "swazibongani33@yahoo.com", tone: "bg-brand-red" },
  { icon: MessageCircle, label: "WhatsApp", sub: "Chat with me", tone: "bg-emerald-500" },
  { icon: UserPlus, label: "Save Contact", sub: "Add to phone", tone: "bg-sky-500" },
];

function CodeBracket({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md border border-brand-red/60 px-2 py-1 font-mono text-brand-red ${className}`}
    >
      {"</>"}
    </span>
  );
}

function saveContact() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Swatsi Bongani Ratia",
    "N:Ratia;Swatsi Bongani;;;",
    "TITLE:Software Developer",
    "TEL;TYPE=CELL:+27812185608",
    "EMAIL:swazibongani33@yahoo.com",
    "URL:https://yourportfolio.com",
    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Swatsi_Bongani_Ratia.vcf";
  a.click();
  URL.revokeObjectURL(url);
}

function handleAction(label: string) {
  switch (label) {
    case "Call":
      window.location.href = "tel:+27812185608";
      break;
    case "Email":
      window.location.href = "mailto:swazibongani33@yahoo.com";
      break;
    case "WhatsApp":
      window.open("https://wa.me/27812185608", "_blank");
      break;
    case "Save Contact":
      saveContact();
      break;
  }
}

function Index() {
  return (
    <main className="bg-brand-navy-deep px-4 py-8 font-sans text-foreground md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        {/* ============================================================
            MOBILE / TABLET HERO (matches reference mock)
        ============================================================ */}
        <section className="relative overflow-hidden rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] lg:hidden">
          {/* red triangle accent bottom-right */}
          <div
            className="pointer-events-none absolute bottom-0 right-0 h-40 w-40"
            style={{
              background:
                "linear-gradient(135deg, transparent 0%, transparent 50%, var(--brand-red) 50%)",
              opacity: 0.95,
            }}
            aria-hidden
          />


          {/* profile */}
          <div className="relative mt-4 flex flex-col items-center text-center">
            <div className="rounded-full p-1.5 ring-2 ring-brand-red shadow-[var(--shadow-red)]">
              <img
                src={profileImg}
                alt="Portrait of Your Name"
                width={140}
                height={140}
                className="h-32 w-32 rounded-full object-cover"
              />
            </div>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight">Swatsi Bongani Ratia</h1>
            <p className="mt-1 text-sm text-foreground/80">
              Software Developer
            </p>
            <div className="mt-3 h-0.5 w-16 rounded bg-brand-red" />
          </div>

          {/* stacked action buttons */}
          <div className="relative mt-6 space-y-3">
            {actions.map((a) => (
              <button
                key={a.label}
                onClick={() => handleAction(a.label)}
                className="flex w-full items-center gap-3 rounded-2xl bg-brand-navy-deep px-4 py-3 text-left text-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-brand-navy-deep/80"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${a.tone} text-white shadow`}
                >
                  <a.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold">{a.label}</span>
              </button>
            ))}
          </div>
        </section>


        {/* ============================================================
            DESKTOP HERO (unchanged from before — lg and up)
        ============================================================ */}
        <section className="relative hidden overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)] lg:block">
          {/* Red angled accent */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, transparent 0%, transparent 58%, var(--brand-red) 58%, var(--brand-red) 100%)",
              opacity: 0.95,
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.30_0.08_250)_0%,transparent_45%)]"
            aria-hidden
          />

          <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-6">
              <CodeBracket className="absolute left-6 top-6 sm:left-10 sm:top-10" />

              <div className="relative shrink-0 pt-10 sm:pt-12">
                <div className="rounded-full p-1.5 ring-2 ring-brand-red shadow-[var(--shadow-red)]">
                  <img
                    src={profileImg}
                    alt="Portrait of Your Name"
                    width={160}
                    height={160}
                    className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40"
                  />
                </div>
              </div>

              <div className="pt-10 sm:pt-12">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                  Swatsi Bongani Ratia
                </h1>
                <p className="mt-1 text-base text-foreground/85 sm:text-lg">
                  Software Developer
                </p>
                <div className="mt-3 h-0.5 w-16 rounded bg-brand-red" />
                <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/80 sm:text-base">
                  Passionate about building clean, efficient and user-friendly digital solutions.
                  Always learning. Always building.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const url = "https://yourportfolio.com";
                    const nav = navigator as Navigator & { share?: (d: ShareData) => Promise<void> };
                    if (nav.share) {
                      nav.share({ title: "Your Name", url }).catch(() => {});
                    } else if (nav.clipboard) {
                      nav.clipboard.writeText(url);
                    }
                  }}
                  className="mt-5 hidden items-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-red)] transition hover:-translate-y-0.5"
                >
                  <Share2 className="h-4 w-4" />
                  Share Link
                </button>
              </div>
            </div>

            {/* QR — desktop */}
            <div className="relative mx-auto flex flex-col items-center gap-3 lg:mx-0">
              <div className="rounded-2xl bg-white p-3 shadow-xl">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https%3A%2F%2Fyourportfolio.com&margin=0"
                  alt="QR code linking to portfolio"
                  width={200}
                  height={200}
                  className="h-44 w-44 sm:h-52 sm:w-52"
                />
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-brand-navy-deep/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-brand-navy-deep">
                <QrCode className="h-4 w-4" />
                SCAN TO CONNECT
              </button>
            </div>
          </div>
        </section>

        {/* ACTIONS — desktop only (mobile/tablet has them inside hero) */}
        <section className="hidden grid-cols-2 gap-3 md:grid-cols-4 lg:grid">
          {actions.map((a) => (
            <button
              key={a.label}
              onClick={() => handleAction(a.label)}
              className="group flex items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:bg-secondary"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${a.tone} text-white shadow-md`}
              >
                <a.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{a.label}</span>
                <span className="block truncate text-xs text-muted-foreground">{a.sub}</span>
              </span>
            </button>
          ))}
        </section>

        {/* ABOUT + LINKS */}
        {/* SECTIONS — desktop only (mobile/tablet uses dedicated routes) */}
        <div className="hidden space-y-6 lg:block">
        <section className="grid gap-6 md:grid-cols-2">

          <div id="about" className="scroll-mt-6 rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="mb-3 flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-brand-red" />
              <h2 className="text-sm font-bold tracking-widest text-foreground/90">ABOUT ME</h2>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              IT student and aspiring software developer with a strong interest in web development,
              mobile apps, and problem solving. I enjoy turning ideas into real world applications.
            </p>
          </div>

          <div id="my-links" className="scroll-mt-6 rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="mb-4 flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-brand-red" />
              <h2 className="text-sm font-bold tracking-widest text-foreground/90">MY LINKS</h2>
            </div>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="flex items-center gap-3 rounded-xl bg-secondary/60 p-3 transition hover:bg-secondary hover:ring-1 hover:ring-brand-red/40"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy-deep text-brand-red">
                      <l.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{l.label}</span>
                      <span className="block truncate text-xs text-muted-foreground">{l.value}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="scroll-mt-6 rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="mb-4 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-brand-red" />
            <h2 className="text-sm font-bold tracking-widest text-foreground/90">SKILLS</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground/90 ring-1 ring-border transition hover:bg-brand-red hover:text-white hover:ring-brand-red"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* CONNECT */}
        <section id="connect" className="scroll-mt-6 rounded-2xl bg-card p-6 text-center shadow-[var(--shadow-card)]">
          <p className="mb-4 text-xs font-bold tracking-[0.25em] text-muted-foreground">
            LET&apos;S CONNECT
          </p>
          <div className="flex justify-center gap-3">
            {[
              { Icon: Linkedin, tone: "bg-sky-600" },
              { Icon: Github, tone: "bg-neutral-800" },
              { Icon: Twitter, tone: "bg-sky-500" },
              { Icon: Instagram, tone: "bg-gradient-to-br from-fuchsia-500 to-orange-400" },
              { Icon: Mail, tone: "bg-brand-red" },
            ].map(({ Icon, tone }, i) => (
              <a
                key={i}
                href="#"
                className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition hover:-translate-y-0.5 ${tone}`}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </section>
        </div>
      </div>
    </main>
  );
}

