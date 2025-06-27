"use client";
import type React from "react";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Mona_Sans as FontSans } from "next/font/google";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";

const font = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <html lang="en">
      <body
        className={cn("min-h-screen antialiased flex flex-col", font.variable)}
        style={{ cursor: "url(/assets/logotinyvothena.png), auto" }} // Tambahkan ini
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {!isHomePage && <Navbar />}
          <div className="flex-grow">{children}</div>
          {!isHomePage && <Footer />}
        </ThemeProvider>
      </body>
    </html>
  );
}
