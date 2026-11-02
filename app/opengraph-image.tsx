import { ImageResponse } from "next/og";

export const alt = "Gebäudemanagement Dalkilic – Ihr Gebäude. In guten Händen.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(80% 60% at 70% 20%, #1f4f9e 0%, #10294d 45%, #0b1f3a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: "#1d5fd6", display: "flex" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>DALKILIC</div>
            <div style={{ fontSize: 14, letterSpacing: 4, opacity: 0.7 }}>GEBÄUDEMANAGEMENT</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>Ihr Gebäude.</div>
          <div style={{ fontSize: 88, fontWeight: 300, letterSpacing: -3, lineHeight: 1, color: "#7cc4ff" }}>In guten Händen.</div>
          <div style={{ marginTop: 28, fontSize: 26, opacity: 0.8 }}>Gebäudereinigung · Hausmeisterservice · Grünpflege · Elektro · Reutlingen & Umgebung</div>
        </div>
      </div>
    ),
    size,
  );
}
