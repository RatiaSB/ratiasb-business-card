import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  Smartphone,
  Printer,
  Download,
  WifiOff,
  Globe,
  CheckCircle2,
  Share2,
} from "lucide-react";

import profileImg from "@/assets/Profile.jpeg";

export const Route = createFileRoute("/qr")({
  component: QRPage,
  head: () => ({
    meta: [
      { title: "QR Code Cards — Swatsi Bongani Ratia" },
      {
        name: "description",
        content:
          "Digital QR business card for online and offline networking.",
      },
    ],
  }),
});

/* =========================================================
   CONFIG
========================================================= */

const WEBSITE_URL = "https://ratiasb.lovable.app";

const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Swatsi Bongani Ratia
ORG:RatiaSB
TITLE:Software Developer
TEL:+27812185608
EMAIL:swazibongani33@yahoo.com
URL:${WEBSITE_URL}
END:VCARD`;

const W = 540;
const H = 860;

/* =========================================================
   COLORS
========================================================= */

const NAVY_DEEP = "#111827";
const NAVY = "#1f2937";
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
   MAIN DRAW FUNCTION
========================================================= */

async function drawCard({
  canvas,
  data,
  mode,
  scale,
}: {
  canvas: HTMLCanvasElement;
  data: string;
  mode: "online" | "offline";
  scale: number;
}) {
  const ctx = canvas.getContext("2d")!;

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
  ctx.font = "bold 34px Inter";

  ctx.fillText("Swatsi Bongani Ratia", W / 2, 70);

  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = "18px Inter";

  ctx.fillText("Software Developer", W / 2, 100);

  /* =========================================================
     PROFILE IMAGE
  ========================================================= */

  const avatarSize = 92;
  const avatarX = W / 2 - avatarSize / 2;
  const avatarY = 130;

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
     QR
  ========================================================= */

  const qrSize = 290;
  const qrX = (W - qrSize) / 2;
  const qrY = 260;

  drawRoundRect(ctx, qrX - 14, qrY - 14, qrSize + 28, qrSize + 28, 24);

  ctx.fillStyle = WHITE;
  ctx.fill();

  const qrCanvas = document.createElement("canvas");

  await QRCode.toCanvas(qrCanvas, data, {
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
     LABEL
  ========================================================= */

  const labelY = qrY + qrSize + 45;

  drawRoundRect(ctx, 110, labelY, 320, 50, 25);

  ctx.fillStyle = RED;
  ctx.fill();

  ctx.fillStyle = WHITE;
  ctx.font = "bold 15px Inter";

  ctx.fillText(
    mode === "online"
      ? "SCAN TO OPEN DIGITAL CARD"
      : "SCAN TO SAVE CONTACT",
    W / 2,
    labelY + 31,
  );

  /* =========================================================
     SHORT URL
  ========================================================= */

  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = "16px Inter";

  ctx.fillText("ratiasb.lovable.app", W / 2, labelY + 90);

  /* =========================================================
     FEATURES
  ========================================================= */

  ctx.textAlign = "left";

  const features =
    mode === "online"
      ? [
          "• Open responsive digital profile",
          "• Works on mobile, tablet & desktop",
          "• Access social links instantly",
        ]
      : [
          "• Save contact without internet",
          "• Works offline",
          "• Quick networking access",
        ];

  ctx.font = "15px Inter";
  ctx.fillStyle = "rgba(255,255,255,0.82)";

  features.forEach((feature, i) => {
    ctx.fillText(feature, 90, 720 + i * 30);
  });

  /* =========================================================
     FOOTER
  ========================================================= */

  ctx.textAlign = "center";

  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = "13px Inter";

  ctx.fillText(
    mode === "online"
      ? "DIGITAL NETWORKING CARD"
      : "OFFLINE CONTACT CARD",
    W / 2,
    820,
  );
}

/* =========================================================
   CARD COMPONENT
========================================================= */

function QRCard({
  title,
  description,
  icon: Icon,
  data,
  mode,
  filename,
  accent,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  data: string;
  mode: "online" | "offline";
  filename: string;
  accent: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    drawCard({
      canvas: canvasRef.current,
      data,
      mode,
      scale: 2,
    }).then(() => setLoading(false));
  }, [data, mode]);

  function download() {
    if (!canvasRef.current) return;

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
      <div className="overflow-hidden rounded-2xl">
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
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

function QRPage() {
  return (
    <main className="min-h-screen bg-brand-navy-deep px-4 py-8 text-foreground md:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            QR Code Cards
          </h1>

          <div className="mt-3 h-1 w-20 rounded bg-brand-red" />

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70">
            Download professional digital and offline QR business cards for
            networking, events, conferences, printouts, and mobile sharing.
          </p>
        </div>

        {/* INFO */}
        <div className="grid gap-4 rounded-3xl bg-card p-6 shadow-[var(--shadow-card)] md:grid-cols-3">
          <InfoItem
            icon={Globe}
            title="Online Digital Card"
            text="Opens responsive landing page experience."
          />

          <InfoItem
            icon={WifiOff}
            title="Offline Contact QR"
            text="Save contact instantly without internet."
          />

          <InfoItem
            icon={CheckCircle2}
            title="High Quality Export"
            text="Optimized for mobile and professional printing."
          />
        </div>

        {/* CARDS */}
        <div className="grid gap-8 lg:grid-cols-2">
          <QRCard
            title="Online QR Card"
            description="Best for websites, phones & social sharing"
            icon={Smartphone}
            data={WEBSITE_URL}
            mode="online"
            filename="ratiasb-online-qr.png"
            accent="#3b82f6"
          />

          <QRCard
            title="Offline Contact QR"
            description="Works even without internet connection"
            icon={Printer}
            data={VCARD}
            mode="offline"
            filename="ratiasb-offline-contact-qr.png"
            accent="#c0392b"
          />
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   INFO ITEM
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
