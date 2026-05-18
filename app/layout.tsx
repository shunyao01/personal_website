import type { Metadata } from "next";
import Script from "next/script";
import { getSiteConfig } from "@/lib/content";
import { siteMono, siteSans } from "@/lib/fonts";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const site = getSiteConfig();
const fullName = `${site.firstName} ${site.lastName}`;
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${fullName} | ${site.role}`,
  description: site.tagline,
  openGraph: {
    title: `${fullName} | ${site.role}`,
    description: site.tagline,
    type: "website",
    images: [{ url: "/og.svg", alt: `${fullName} — ${site.role}` }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${fullName} | ${site.role}`,
    description: site.tagline,
    images: ["/og.svg"]
  },
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${siteSans.variable} ${siteMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#070d18" />
      </head>
      <body className={siteSans.className} suppressHydrationWarning>
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        <canvas className="starfield" id="starfield" aria-hidden="true" />
        {children}
        <Script src="/js/site.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
