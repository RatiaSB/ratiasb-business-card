import React from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
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
  Code2,
  Menu,
  Home,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const menuItemClass =
  "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground";

export const navSections = [
  { to: "/about", id: "about", label: "About Me", icon: UserPlus },
  { to: "/links", id: "my-links", label: "My Links", icon: LinkIcon },
  { to: "/skills", id: "skills", label: "Skills", icon: Code2 },
  { to: "/connect", id: "connect", label: "Let's Connect", icon: Mail },
] as const;

export const links = [
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/ratiasb", href: "linkedin.com/in/ratiasb" },
  { icon: Github, label: "GitHub", value: "github.com/ratiasb", href: "github.com/ratiasb" },
  { icon: Globe, label: "Portfolio", value: "yourportfolio.com", href: "#" },
  { icon: FileText, label: "Resume / CV", value: "view or download", href: "#" },
];

export const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "Java", "MySQL", "Git", "UI/UX"];

export const actions = [
  { icon: Phone, label: "Call", sub: "+27 81 218 5608", tone: "bg-sky-500" },
  { icon: Mail, label: "Email", sub: "swazibongani33@yahoo.com", tone: "bg-brand-red" },
  { icon: MessageCircle, label: "WhatsApp", sub: "Chat with me", tone: "bg-emerald-500" },
  { icon: UserPlus, label: "Save Contact", sub: "Add to phone", tone: "bg-sky-500" },
];

export function CodeBracket({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md border border-brand-red/60 px-2 py-1 font-mono text-brand-red ${className}`}
    >
      {"</>"}
    </span>
  );
}

function scrollToSection(id: string) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SectionMenu({
  className = "",
  mode = "auto",
}: {
  className?: string;
  mode?: "auto" | "route" | "scroll";
}) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open menu"
        className={`rounded-md p-2 text-foreground/80 transition hover:text-foreground ${className}`}
      >
        <Menu className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {navSections.map((s) => (
          <button
            key={s.id}
            role="menuitem"
            className={menuItemClass}
            onClick={() =>
              mode === "scroll" ? scrollToSection(s.id) : navigate({ to: s.to })
            }
          >
            <s.icon className="h-4 w-4 text-brand-red" />
            {s.label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ===================== Global Navigation Bar ===================== */

export function NavBar() {
  const { location } = useRouterState();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleNav(to: string) {
    setMobileOpen(false);
    navigate({ to });
  }

  return (
    <>
      {/* ── DESKTOP: fixed left sidebar (lg+) ─────────────────── */}
      <nav
        className="hidden lg:flex fixed left-0 top-0 z-50 h-full w-56 flex-col border-r border-white/10 bg-brand-navy-deep/95 backdrop-blur supports-[backdrop-filter]:bg-brand-navy-deep/80"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="px-5 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-sm font-bold text-brand-red transition hover:opacity-80"
            aria-label="Home"
          >
            <span className="rounded-md border border-brand-red/60 px-2 py-0.5 text-xs">{"</>"}</span>
            <span className="text-foreground">RatiaSB</span>
          </Link>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col gap-1 px-3" role="list">
          <li>
            <Link
              to="/"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-white/10 ${
                currentPath === "/" ? "bg-white/10 text-brand-red" : "text-foreground/75 hover:text-foreground"
              }`}
            >
              <Home className="h-4 w-4 shrink-0" />
              Home
            </Link>
          </li>
          {navSections.map((s) => (
            <li key={s.id}>
              <Link
                to={s.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition hover:bg-white/10 ${
                  currentPath === s.to
                    ? "bg-white/10 text-brand-red"
                    : "text-foreground/75 hover:text-foreground"
                }`}
              >
                <s.icon className="h-4 w-4 shrink-0" />
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom brand tag */}
        <div className="mt-auto px-5 py-6">
          <span className="font-mono text-xs text-foreground/30">v1.0</span>
        </div>
      </nav>

      {/* ── MOBILE / TABLET: top bar with hamburger (below lg) ── */}
      <nav
        className="lg:hidden sticky top-0 z-50 w-full border-b border-white/10 bg-brand-navy-deep/95 backdrop-blur supports-[backdrop-filter]:bg-brand-navy-deep/80"
        aria-label="Main navigation"
      >
        <div className="flex h-14 items-center justify-between px-4 md:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-sm font-bold text-brand-red transition hover:opacity-80"
            aria-label="Home"
          >
            <span className="rounded-md border border-brand-red/60 px-2 py-0.5 text-xs">{"</>"}</span>
            <span className="text-foreground">RatiaSB</span>
          </Link>

          <DropdownMenu open={mobileOpen} onOpenChange={setMobileOpen}>
            <DropdownMenuTrigger
              aria-label="Open navigation menu"
              className="rounded-md p-2 text-foreground/80 transition hover:bg-white/10 hover:text-foreground"
            >
              <Menu className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <button
                role="menuitem"
                className={menuItemClass}
                onClick={() => handleNav("/")}
              >
                <Home className="h-4 w-4 text-brand-red" />
                Home
              </button>
              {navSections.map((s) => (
                <button
                  key={s.id}
                  role="menuitem"
                  className={menuItemClass}
                  onClick={() => handleNav(s.to)}
                >
                  <s.icon className="h-4 w-4 text-brand-red" />
                  {s.label}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}

/* ===================== Section components ===================== */

export function AboutSection({ withId = true }: { withId?: boolean }) {
  return (
    <div
      id={withId ? "about" : undefined}
      className="scroll-mt-6 rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]"
    >
      <div className="mb-3 flex items-center gap-2">
        <UserPlus className="h-4 w-4 text-brand-red" />
        <h2 className="text-sm font-bold tracking-widest text-foreground/90">ABOUT ME</h2>
      </div>
      <p className="text-sm leading-relaxed text-foreground/80">
        IT student and aspiring software developer with a strong interest in web development,
        mobile apps, and problem solving. I enjoy turning ideas into real world applications.
      </p>
    </div>
  );
}

export function LinksSection({ withId = true }: { withId?: boolean }) {
  return (
    <div
      id={withId ? "my-links" : undefined}
      className="scroll-mt-6 rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]"
    >
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
  );
}

export function SkillsSection({ withId = true }: { withId?: boolean }) {
  return (
    <section
      id={withId ? "skills" : undefined}
      className="scroll-mt-6 rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]"
    >
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
  );
}

export function ConnectSection({ withId = true }: { withId?: boolean }) {
  return (
    <section
      id={withId ? "connect" : undefined}
      className="scroll-mt-6 rounded-2xl bg-card p-6 text-center shadow-[var(--shadow-card)]"
    >
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
  );
}

/* ===================== Sub-page layout (mobile/tablet) ===================== */

export function SubPageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="bg-brand-navy-deep px-4 py-8 font-sans text-foreground md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
        <div className="h-0.5 w-16 rounded bg-brand-red" />
        {children}
      </div>
    </main>
  );
}
