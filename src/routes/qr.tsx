import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Smartphone, Printer, Download } from "lucide-react";
import profileImg from "@/assets/Profile.jpeg";

export const Route = createFileRoute("/qr")({
  component: QRPage,
  head: () => ({
    meta: [
      { title: "QR Code — Swatsi Bongani Ratia" },
      { name: "description", content: "Scan to connect with Swatsi Bongani Ratia." },
    ],
  }),
});

const URL = "https://ratiasb.lovable.app";

const W = 540;   // canvas width  (digital: 1080px @2x, print: 540pt @300dpi)
const H = 810;   // canvas height (portrait 2:3)

// Brand colours
const NAVY_DEEP = "#1a1f2e";
const NAVY     = "#1e2438";
const RED      = "#c0392b";

// Social icon colours
const SOCIALS = [
  { label: "in",  bg: "#0077B5" },
  { label: "gh",  bg: "#24292e", svg: "github" },
  { label: "tw",  bg: "#1DA1F2" },
  { label: "ig",  bg: "instagram" },
  { label: "✉",  bg: RED },
];

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

async function drawCard(
  canvas: HTMLCanvasElement,
  scale: number,
  label: string,
) {
  const ctx = canvas.getContext("2d")!;
  const s = scale;
  canvas.width  = W * s;
  canvas.height = H * s;
  ctx.scale(s, s);

  // ── Background card ──────────────────────────────────────────
  drawRoundRect(ctx, 0, 0, W, H, 28);
  ctx.fillStyle = NAVY_DEEP;
  ctx.fill();

  // ── Red triangle accent (top-right) ─────────────────────────
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(W, 0);
  ctx.lineTo(W, 160);
  ctx.lineTo(W - 160, 0);
  ctx.closePath();
  ctx.fillStyle = RED;
  ctx.fill();
  ctx.restore();

  // ── Name & title ─────────────────────────────────────────────
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${32}px Inter, system-ui, sans-serif`;
  ctx.fillText("Swatsi Bongani Ratia", W / 2, 72);

  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = `${18}px Inter, system-ui, sans-serif`;
  ctx.fillText("Software Developer", W / 2, 102);

  // ── QR code (white rounded card) ─────────────────────────────
  const qrSize = 320;
  const qrX = (W - qrSize) / 2;
  const qrY = 130;

  // White background for QR
  drawRoundRect(ctx, qrX - 12, qrY - 12, qrSize + 24, qrSize + 24, 18);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  // Generate QR to offscreen canvas
  const qrCanvas = document.createElement("canvas");
  await QRCode.toCanvas(qrCanvas, URL, {
    width: qrSize,
    margin: 1,
    errorCorrectionLevel: "H",
    color: { dark: "#000000", light: "#ffffff" },
  });
  ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

  // ── Centre logo: profile photo in red circle ─────────────────
  const logoR = 44;
  const logoX = W / 2;
  const logoY = qrY + qrSize / 2;

  // Red circle background
  ctx.beginPath();
  ctx.arc(logoX, logoY, logoR + 4, 0, Math.PI * 2);
  ctx.fillStyle = RED;
  ctx.fill();

  // Clip and draw profile photo
  const img = new Image();
  img.src = profileImg;
  await new Promise<void>((res) => { img.onload = () => res(); img.onerror = () => res(); });

  ctx.save();
  ctx.beginPath();
  ctx.arc(logoX, logoY, logoR, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(img, logoX - logoR, logoY - logoR, logoR * 2, logoR * 2);
  ctx.restore();

  // White ring around logo
  ctx.beginPath();
  ctx.arc(logoX, logoY, logoR + 4, 0, Math.PI * 2);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.stroke();

  // ── SCAN TO CONNECT button ───────────────────────────────────
  const btnY = qrY + qrSize + 36;
  const btnW = 260;
  const btnH = 48;
  const btnX = (W - btnW) / 2;

  drawRoundRect(ctx, btnX, btnY, btnW, btnH, 24);
  ctx.fillStyle = RED;
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${15}px Inter, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("📱  SCAN TO CONNECT", W / 2, btnY + 31);

  // ── Let's Connect label ──────────────────────────────────────
  const socialY = btnY + btnH + 44;
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = `${15}px Inter, system-ui, sans-serif`;
  ctx.fillText("Let's Connect", W / 2, socialY - 16);

  // ── Social icon circles ──────────────────────────────────────
  const iconR = 24;
  const totalW = SOCIALS.length * (iconR * 2) + (SOCIALS.length - 1) * 12;
  let ix = (W - totalW) / 2 + iconR;

  for (const s of SOCIALS) {
    // Circle
    ctx.beginPath();
    ctx.arc(ix, socialY + 10, iconR, 0, Math.PI * 2);

    if (s.bg === "instagram") {
      const grad = ctx.createRadialGradient(ix - 8, socialY + 2, 2, ix, socialY + 10, iconR);
      grad.addColorStop(0, "#f9ce34");
      grad.addColorStop(0.4, "#ee2a7b");
      grad.addColorStop(1, "#6228d7");
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = s.bg;
    }
    ctx.fill();

    // Label text
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${13}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(s.label, ix, socialY + 15);

    ix += iconR * 2 + 12;
  }

  // ── Bottom label (RGB / CMYK) ────────────────────────────────
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.font = `${12}px Inter, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(label, W / 2, H - 16);
}

function QRCard({
  title,
  subtitle,
  icon: Icon,
  scale,
  label,
  filename,
  accentColor,
}: {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  scale: number;
  label: string;
  filename: string;
  accentColor: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    drawCard(canvasRef.current, scale, label).then(() => setReady(true));
  }, [scale, label]);

  function download() {
    if (!canvasRef.current) return;
    const a = document.createElement("a");
    a.href = canvasRef.current.toDataURL("image/png");
    a.download = filename;
    a.click();
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" style={{ color: accentColor }} />
        <h2 className="font-bold text-base" style={{ color: accentColor }}>{title}</h2>
      </div>

      {/* Best for list */}
      <p className="text-sm font-semibold text-foreground/80">Best for:</p>
      <ul className="space-y-1 text-sm text-foreground/70">
        {subtitle.split(",").map((s) => (
          <li key={s} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
            {s.trim()}
          </li>
        ))}
      </ul>

      {/* Canvas preview */}
      <div className="overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Download button */}
      <button
        onClick={download}
        disabled={!ready}
        className="flex items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-bold text-white shadow-[var(--shadow-red)] transition hover:-translate-y-0.5 disabled:opacity-40"
      >
        <Download className="h-4 w-4" />
        Download {title.split("–")[0].trim()}
      </button>

      {/* Specs */}
      <p className="text-xs text-foreground/50">
        <span className="font-semibold" style={{ color: accentColor }}>Color Profile: {label}</span>
        <br />
        {scale === 2 ? "Resolution: 1080 × 1620 px (Portrait)" : "Resolution: 300 DPI (Portrait)"}
      </p>
    </div>
  );
}

function QRPage() {
  return (
    <main className="min-h-screen bg-brand-navy-deep px-4 py-8 font-sans text-foreground md:px-8 md:py-12">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">QR Code Cards</h1>
          <div className="mt-2 h-0.5 w-16 rounded bg-brand-red" />
          <p className="mt-3 text-sm text-foreground/60">
            Scan to open <span className="text-brand-red font-mono">ratiasb.lovable.app</span>. Download the version that fits your use case.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <QRCard
            title="PNG (RGB) – Digital Use"
            subtitle="Mobile phones, Electronic devices, Social media, Email sharing, Websites"
            icon={Smartphone}
            scale={2}
            label="RGB"
            filename="ratiasb-qr-digital-rgb.png"
            accentColor="#3b82f6"
          />
          <QRCard
            title="PNG (CMYK) – Print Use"
            subtitle="Printouts, Business cards, Flyers, Posters, Banners"
            icon={Printer}
            scale={3}
            label="CMYK"
            filename="ratiasb-qr-print-cmyk.png"
            accentColor="#c0392b"
          />
        </div>
      </div>
    </main>
  );
}
