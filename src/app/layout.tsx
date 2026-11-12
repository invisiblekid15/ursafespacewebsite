import type { Metadata } from "next";
import { Castoro, Nunito } from "next/font/google";
import Script from "next/script";
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
      <head>
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "szy7wygt61");
            `,
          }}
        />
      </head>
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
