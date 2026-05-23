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
  Quote,
  Share2,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Your Name — IT Student & Software Developer" },
      {
        name: "description",
        content:
          "Digital business card for an IT student and software developer. Scan, call, email, or save the contact instantly.",
      },
    ],
  }),
});

const links = [
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/yourprofile", href: "#" },
  { icon: Github, label: "GitHub", value: "github.com/yourusername", href: "#" },
  { icon: Globe, label: "Portfolio", value: "yourportfolio.com", href: "#" },
  { icon: FileText, label: "Resume / CV", value: "view or download", href: "#" },
];

const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "C#", "MySQL", "Git", "UI/UX"];

const actions = [
  { icon: Phone, label: "Call", sub: "+27 12 345 6789", tone: "bg-sky-500" },
  { icon: Mail, label: "Email", sub: "youremail@email.com", tone: "bg-brand-red" },
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

function Index() {
  return (
    <main className="min-h-screen bg-brand-navy-deep px-4 py-8 font-sans text-foreground md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)]">
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.30_0.08_250)_0%,transparent_45%)]" aria-hidden />

          <div className="relative grid gap-8 p-6 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
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
                  Your Name
                </h1>
                <p className="mt-1 text-base text-foreground/85 sm:text-lg">
                  IT Student &amp; Software Developer
                </p>
                <div className="mt-3 h-0.5 w-16 rounded bg-brand-red" />
                <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/80 sm:text-base">
                  Passionate about building clean, efficient and user-friendly digital solutions.
                  Always learning. Always building.
                </p>
              </div>
            </div>

            {/* QR */}
            <div className="relative mx-auto flex flex-col items-center gap-3 md:mx-0">
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

        {/* ACTIONS */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {actions.map((a) => (
            <button
              key={a.label}
              className="group flex items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:bg-secondary"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${a.tone} text-white shadow-md`}>
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
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="mb-3 flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-brand-red" />
              <h2 className="text-sm font-bold tracking-widest text-foreground/90">ABOUT ME</h2>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              IT student and aspiring software developer with a strong interest in web development,
              mobile apps, and problem solving. I enjoy turning ideas into real world applications.
            </p>
          </div>

          <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
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
        <section className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
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
        <section className="rounded-2xl bg-card p-6 text-center shadow-[var(--shadow-card)]">
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

        {/* FOOTER QUOTE */}
        <section className="relative overflow-hidden rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
          <div
            className="absolute right-0 top-0 h-full w-1/3"
            style={{
              background: "linear-gradient(135deg, transparent 0%, transparent 50%, var(--brand-red) 50%)",
              opacity: 0.9,
            }}
            aria-hidden
          />
          <div className="relative flex items-center gap-3">
            <Quote className="h-5 w-5 shrink-0 text-brand-red" />
            <p className="font-mono text-sm italic text-foreground/90 sm:text-base">
              Code. Learn. Build. Repeat.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
