import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { getAllProducts } from "@/lib/products";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-outfit",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sofas UK | Quality Sofas, Delivered | The Sofa Hub",
  description:
    "Shop quality corner, 3-seater and 3+2 sofa sets with UK delivery and cash on delivery available.",
  openGraph: { siteName: SITE_NAME, locale: "en_GB", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const products = await getAllProducts();
  const sofas = [...products]
    .sort((a, b) => a.name.localeCompare(b.name, "en-GB", { sensitivity: "base" }))
    .map((p) => ({
      name: p.name,
      href: p.href ?? `/products/${p.slug}`,
    }));

  return (
    <html lang="en-GB" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-body">
        <Header sofas={sofas} />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
