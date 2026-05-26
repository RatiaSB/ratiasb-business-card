import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";
import {
  Smartphone,
  Printer,
  Download,
  CheckCircle2,
  Share2,
  Wifi,
} from "lucide-react";

import profileImg from "@/assets/Profile.jpeg";

export const Route = createFileRoute("/qr")({
  component: QRPage,
  head: () => ({
    meta: [
      { title: "Hybrid QR Cards — Swatsi Bongani Ratia" },
      {
        name: "description",
        content:
          "Hybrid digital business QR cards for online and offline networking.",
      },
    ],
  }),
});

/* =========================================================
   HYBRID VCARD QR
========================================================= */

const WEBSITE_URL = "https://ratiasb.lovable.app";

const HYBRID_QR = `BEGIN:VCARD
VERSION:3.0
FN:Swatsi Bongani Ratia
ORG:RatiaSB
TITLE:Software Developer
TEL:+27812185608
EMAIL:swazibongani33@yahoo.com
URL:${WEBSITE_URL}
NOTE:Save contact instantly and open digital profile
END:VCARD`;

/* =========================================================
   CANVAS SIZE
========================================================= */

const W = 540;
const H = 860;

/* =========================================================
   COLORS
========================================================= */

const NAVY_DEEP = "#0f172a";
const NAVY = "#111827";
const RED = "#c0392b";
const WHITE = "#ffffff";

/* =========================================================
   HELPERS
========================================================= */

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
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

/* =========================================================
   DRAW CARD
========================================================= */

async function drawCard({
  canvas,
  scale,
  printMode,
}: {
  canvas: HTMLCanvasElement;
  scale: number;
  printMode: boolean;
}) {
  const ctx = canvas.getContext("2d")!;

  // Use the project's configured sans font (from CSS custom property)
  const rawFont = getComputedStyle(document.documentElement).getPropertyValue(
    "--font-sans",
  );
  const fontFamily = rawFont ? rawFont.trim() : 'Inter, system-ui, sans-serif';

  canvas.width = W * scale;
  canvas.height = H * scale;

  ctx.scale(scale, scale);

  /* =========================================================
     BACKGROUND
  ========================================================= */

  const gradient = ctx.createLinearGradient(0, 0, 0, H);

  gradient.addColorStop(0, NAVY);
  gradient.addColorStop(1, NAVY_DEEP);

  drawRoundRect(ctx, 0, 0, W, H, 32);

  ctx.fillStyle = gradient;
  ctx.fill();

  /* =========================================================
     GLASS OVERLAY
  ========================================================= */

  ctx.fillStyle = "rgba(255,255,255,0.03)";
  drawRoundRect(ctx, 12, 12, W - 24, H - 24, 28);
  ctx.fill();

  /* =========================================================
     RED ACCENT
  ========================================================= */

  ctx.beginPath();

  ctx.moveTo(W, 0);
  ctx.lineTo(W, 180);
  ctx.lineTo(W - 180, 0);

  ctx.closePath();

  ctx.fillStyle = RED;
  ctx.fill();

  /* =========================================================
     HEADER
  ========================================================= */

  ctx.textAlign = "center";

  ctx.fillStyle = WHITE;
    ctx.font = `bold 34px ${fontFamily}`;

  ctx.fillText("Swatsi Bongani Ratia", W / 2, 70);

  ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.font = `18px ${fontFamily}`;

  ctx.fillText("Software Developer", W / 2, 102);

  /* =========================================================
     PROFILE IMAGE
  ========================================================= */

  const avatarSize = 92;
  const avatarX = W / 2 - avatarSize / 2;
  const avatarY = 135;

  const img = new Image();
  img.src = profileImg;

  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });

  ctx.save();

  ctx.beginPath();
  ctx.arc(W / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.clip();

  ctx.drawImage(img, avatarX, avatarY, avatarSize, avatarSize);

  ctx.restore();

  ctx.beginPath();
  ctx.arc(W / 2, avatarY + avatarSize / 2, avatarSize / 2 + 4, 0, Math.PI * 2);

  ctx.strokeStyle = RED;
  ctx.lineWidth = 4;
  ctx.stroke();

  /* =========================================================
     QR CONTAINER
  ========================================================= */

  const qrSize = 290;
  const qrX = (W - qrSize) / 2;
  const qrY = 270;

  drawRoundRect(ctx, qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 24);

  ctx.fillStyle = WHITE;
  ctx.fill();

  /* =========================================================
     QR CODE
  ========================================================= */

  const qrCanvas = document.createElement("canvas");

  await QRCode.toCanvas(qrCanvas, HYBRID_QR, {
    width: qrSize,
    margin: 3,
    errorCorrectionLevel: "H",
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });

  ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

  /* =========================================================
     CENTER LOGO
  ========================================================= */

  const logoR = 34;
  const logoX = W / 2;
  const logoY = qrY + qrSize / 2;

  ctx.beginPath();
  ctx.arc(logoX, logoY, logoR + 4, 0, Math.PI * 2);

  ctx.fillStyle = RED;
  ctx.fill();

  ctx.save();

  ctx.beginPath();
  ctx.arc(logoX, logoY, logoR, 0, Math.PI * 2);
  ctx.clip();

  ctx.drawImage(
    img,
    logoX - logoR,
    logoY - logoR,
    logoR * 2,
    logoR * 2,
  );

  ctx.restore();

  ctx.beginPath();
  ctx.arc(logoX, logoY, logoR + 4, 0, Math.PI * 2);

  ctx.strokeStyle = WHITE;
  ctx.lineWidth = 2;
  ctx.stroke();

  /* =========================================================
     CTA BUTTON
  ========================================================= */

  const btnY = qrY + qrSize + 42;

  drawRoundRect(ctx, 110, btnY, 320, 50, 25);

  ctx.fillStyle = RED;
  ctx.fill();

    ctx.fillStyle = WHITE;
    ctx.font = `bold 15px ${fontFamily}`;

  ctx.fillText("SCAN TO SAVE & CONNECT", W / 2, btnY + 31);

  /* =========================================================
     SHORT URL
  ========================================================= */

  ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = `16px ${fontFamily}`;

  ctx.fillText("ratiasb.lovable.app", W / 2, btnY + 90);

  /* =========================================================
     FEATURES
  ========================================================= */

  ctx.textAlign = "left";

  const features = [
    "• Save contact instantly",
    "• Open digital profile",
    "• Works online & offline",
  ];

  ctx.font = `15px ${fontFamily}`;
  ctx.fillStyle = "rgba(255,255,255,0.82)";

  features.forEach((feature, i) => {
    ctx.fillText(feature, 90, 730 + i * 30);
  });

  /* =========================================================
     FOOTER LABEL
  ========================================================= */

  ctx.textAlign = "center";

  ctx.fillStyle = "rgba(255,255,255,0.42)";
  ctx.font = `13px ${fontFamily}`;

  ctx.fillText(
    printMode
      ? "PRINT READY • HYBRID QR • CMYK STYLE"
      : "DIGITAL READY • HYBRID QR • RGB",
    W / 2,
    825,
  );
}

/* =========================================================
   QR CARD COMPONENT
========================================================= */

function QRCard({
  title,
  description,
  icon: Icon,
  scale,
  filename,
  accent,
  printMode,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  scale: number;
  filename: string;
  accent: string;
  printMode: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    drawCard({
      canvas: canvasRef.current,
      scale,
      printMode,
    }).then(() => setLoading(false));
  }, [scale, printMode]);

  async function download() {
    if (!canvasRef.current) return;

    // For print mode, render a higher-resolution canvas and embed as high-quality JPEG
    if (printMode) {
      const baseCanvas = canvasRef.current;

      // Render at a higher pixel density for better PDF embed quality.
      // Use a multiplier (2x or 3x) to increase embedded image resolution.
      const multiplier = 2;
      const hiResCanvas = document.createElement("canvas");

      // drawCard expects scale relative to the design W/H, so calculate a new scale
      const hiResScale = scale * multiplier;

      hiResCanvas.width = W * hiResScale;
      hiResCanvas.height = H * hiResScale;

      // Draw the card at the higher scale onto the hi-res canvas
      await drawCard({ canvas: hiResCanvas, scale: hiResScale, printMode });

      // Convert to high-quality JPEG (smaller than PNG, widely supported in PDFs)
      const dataUrl = hiResCanvas.toDataURL("image/jpeg", 1.0);

      // Create a PDF sized to the hi-res canvas in pixels so the image is embedded at 1:1
      const pdf = new jsPDF({ unit: "px", format: [hiResCanvas.width, hiResCanvas.height] });

      pdf.addImage(dataUrl, "JPEG", 0, 0, hiResCanvas.width, hiResCanvas.height, undefined, "FAST");

      pdf.save(filename.replace(/\.png$/i, ".pdf"));

      return;
    }

    // Fallback: download PNG for digital mode
    const a = document.createElement("a");

    a.href = canvasRef.current.toDataURL("image/png");
    a.download = filename;

    a.click();
  }

  return (
    <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      {/* HEADER */}
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: accent }}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>

        <div>
          <h2 className="font-bold text-lg">{title}</h2>

          <p className="text-sm text-foreground/60">{description}</p>
        </div>
      </div>

      {/* CANVAS */}
      <div className="overflow-hidden rounded-2xl shadow-xl">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* BUTTONS */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={download}
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
        >
          <Download className="h-4 w-4" />
          {loading ? "Generating..." : "Download"}
        </button>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "Swatsi Bongani Ratia",
                text: "Connect with me",
                url: WEBSITE_URL,
              });
            }
          }}
          className="flex items-center justify-center rounded-xl bg-secondary px-4"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* INFO */}
      <div className="mt-4 rounded-xl bg-secondary/40 p-4 text-sm text-foreground/70">
        <p className="font-semibold text-foreground">
          {printMode ? "Best for print:" : "Best for digital:"}
        </p>

        <p className="mt-1">
          {printMode
            ? "Business cards, posters, flyers, banners, events"
            : "Phones, social sharing, email, websites, networking"}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoItem({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-secondary/40 p-5">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand-red text-white">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="font-bold">{title}</h3>

      <p className="mt-1 text-sm text-foreground/65">{text}</p>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

function QRPage() {
  return (
    <main className="min-h-screen bg-brand-navy-deep px-4 py-8 text-foreground md:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Hybrid QR Business Cards
          </h1>

          <div className="mt-3 h-1 w-20 rounded bg-brand-red" />

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/70">
            One smart QR code that works online and offline.
            Users can instantly save your contact and access your digital profile
            from any device.
          </p>
        </div>

        {/* INFO SECTION */}
        <div className="grid gap-4 rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] md:grid-cols-3">
          <InfoItem
            icon={Wifi}
            title="Hybrid QR"
            text="One QR code for contact saving and digital profile access."
          />

          <InfoItem
            icon={CheckCircle2}
            title="Offline Ready"
            text="Users can save contact details without internet."
          />

          <InfoItem
            icon={Share2}
            title="Professional Networking"
            text="Optimized for conferences, printouts and mobile sharing."
          />
        </div>

        {/* QR CARDS */}
        <div className="grid gap-8 lg:grid-cols-2">
          <QRCard
            title="RGB Hybrid QR"
            description="Digital devices & online sharing"
            icon={Smartphone}
            scale={2}
            filename="ratiasb-hybrid-rgb.png"
            accent="#3b82f6"
            printMode={false}
          />

          <QRCard
            title="CMYK Hybrid QR"
            description="Printouts, business cards & posters"
            icon={Printer}
            scale={3}
            filename="ratiasb-hybrid-print.png"
            accent="#c0392b"
            printMode={true}
          />
        </div>
      </div>
    </main>
  );
}