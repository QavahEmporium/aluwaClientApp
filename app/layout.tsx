import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navigation } from "@/components/ui/navigation";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aluwa HairCare",
  description:
    "Natural, effective, and designed for anyone who values authenticity and results.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-${process.env.GOOGLE_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-setup" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-${process.env.GOOGLE_MEASUREMENT_ID}');
          `}
        </Script>
        <AuthProvider>
          <CartProvider>
            <Navigation />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
