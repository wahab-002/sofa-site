import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-outfit",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Sofas UK | Quality Sofas, Delivered | The Sofa Hub",
  description:
    "Shop quality corner, 3-seater and 3+2 sofa sets with UK delivery and cash on delivery available.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-body">
        <Header />
        <main className="max-w-5xl mx-auto px-6 py-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
