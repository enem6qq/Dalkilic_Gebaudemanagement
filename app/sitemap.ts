import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/leistungen`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({ url: `${base}/leistungen/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    { url: `${base}/ueber-uns`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/einsatzgebiet`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/kontakt`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
