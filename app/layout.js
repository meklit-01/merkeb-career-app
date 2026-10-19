import "./globals.css";
import { DM_Sans, Playfair_Display } from "next/font/google";
const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
});
import { AppProviders } from "@/components/AppProviders";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
export const metadata = {
  title: "Merkeb Career Explorer",
  description:
    "Explore careers, understand the skills they need, and build a personal learning plan.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en"  className={`${dm.variable} ${playfair.variable}`}>
      <body>
        <AppProviders>
          <SiteHeader />
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
