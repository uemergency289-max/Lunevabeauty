import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400","500","600","700"], display: "swap" });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["300","400","500","600"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "LunevaBeauty — Luxury Skincare & Beauty", template: "%s | LunevaBeauty" },
  description: "Premium beauty and skincare, curated for radiant skin. Free shipping, COD available.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="font-body bg-white text-charcoal antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
        <Toaster position="bottom-left" richColors />
      </body>
    </html>
  );
}
