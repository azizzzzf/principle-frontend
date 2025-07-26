import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Principle - The Deconstruction Canvas",
  description: "Transform complex topics into visual, deconstructible knowledge maps with AI-powered learning.",
  keywords: ["learning", "education", "AI", "knowledge mapping", "visual learning"],
  authors: [{ name: "Principle Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${manrope.variable} ${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/10`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
