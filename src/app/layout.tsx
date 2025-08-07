import type { Metadata } from "next";
import { Castoro, Nunito } from "next/font/google";
import "./globals.css";
import { ContactProvider } from "@/context/ContactContext";
import ContactForm from "@/components/ui/ContactForm";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const castoro = Castoro({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-castoro",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UrSafeSpace",
  description: "A beautiful and responsive one-page website built with Next.js",
  keywords: ["website", "nextjs", "responsive", "modern"],
  authors: [{ name: "UrSafeSpace Team" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${castoro.variable} ${nunito.variable}`}>
      <body className="antialiased">
        <ContactProvider>
          {children}
          <ContactForm />
          <WhatsAppButton />
        </ContactProvider>
      </body>
    </html>
  );
}
