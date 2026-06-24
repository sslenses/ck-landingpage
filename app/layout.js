import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import ScrollReveal from "@/components/ScrollReveal";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Cigarskruie (CK) - Rokok Kretek Rempah Herbal Nusantara",
  description: "Portal resmi produk Cigarskruie (Rokok CK). Rokok kretek herbal alami racikan 12 rempah pilihan nusantara dari PR Indokretek Malang sejak 2012. Alternatif ramah lingkungan.",
  keywords: "cigarskruie, rokok ck, kretek rempah, herbal cigarette, indokretek malang, ck soft, assikha gold",
  authors: [{ name: "CK Manajemen" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${outfit.variable} ${inter.variable}`}>
      <LayoutWrapper>
        {children}
        <ScrollReveal />
      </LayoutWrapper>
    </html>
  );
}
