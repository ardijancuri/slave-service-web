import "../styles.css";
import { IBM_Plex_Sans, Roboto_Condensed } from "next/font/google";
import { LanguageProvider } from "../components/LanguageProvider";
import {
  RouteEffects,
  SiteFooter,
  SiteHeader,
  SkipLink,
} from "../components/SiteChrome";

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const displayFont = Roboto_Condensed({
  variable: "--font-display",
  weight: ["500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const siteUrl = "https://www.dizelservisslave.com.mk";
const searchLogo = "/assets/dizel-servis-slave-logo.png";
const searchLogoUrl = `${siteUrl}${searchLogo}`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Дизел Сервис Славе",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: searchLogoUrl,
        contentUrl: searchLogoUrl,
        width: 2000,
        height: 2000,
        caption: "Дизел Сервис Славе",
      },
      image: { "@id": `${siteUrl}/#logo` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Дизел Сервис Славе",
      publisher: { "@id": `${siteUrl}/#organization` },
      image: { "@id": `${siteUrl}/#logo` },
      inLanguage: "mk",
    },
  ],
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Дизел Сервис Славе — Скопје",
    template: "%s | Дизел Сервис Славе",
  },
  description:
    "Дизел Сервис Славе — специјализиран сервис за BOSCH пумпи, инјектори и common rail системи во Скопје.",
  icons: { icon: "/favicon.svg" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Дизел Сервис Славе — Скопје",
    description:
      "Специјализиран сервис за BOSCH пумпи, инјектори и common rail системи во Скопје.",
    url: siteUrl,
    siteName: "Дизел Сервис Славе",
    type: "website",
    locale: "mk_MK",
    images: [
      {
        url: searchLogo,
        width: 2000,
        height: 2000,
        alt: "Дизел Сервис Славе лого",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Дизел Сервис Славе — Скопје",
    description:
      "Специјализиран сервис за BOSCH пумпи, инјектори и common rail системи во Скопје.",
    images: [searchLogo],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="mk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${bodyFont.variable} ${displayFont.variable}`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <SkipLink />
          <SiteHeader />
          <RouteEffects />
          {children}
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
