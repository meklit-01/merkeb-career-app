import "./globals.css";
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
    <html lang="en">
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
