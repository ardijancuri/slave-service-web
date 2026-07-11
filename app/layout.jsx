import "../styles.css";
import { IBM_Plex_Sans, Roboto_Condensed } from "next/font/google";

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

export const metadata = {
  metadataBase: new URL("https://www.dizelservisslave.com.mk"),
  title: "Дизел Сервис Славе — Скопје",
  description:
    "Дизел Сервис Славе — специјализиран сервис за BOSCH пумпи, инјектори и common rail системи во Скопје.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Дизел Сервис Славе — Скопје",
    description:
      "Специјализиран сервис за BOSCH пумпи, инјектори и common rail системи во Скопје.",
    type: "website",
    locale: "mk_MK",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="mk">
      <body
        className={`${bodyFont.variable} ${displayFont.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
