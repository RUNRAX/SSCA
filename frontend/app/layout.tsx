import type { Metadata } from "next";
import "./globals.css";
import { LiquidDistortion } from "@/components/glass/LiquidDistortion";
import { BackgroundGradient } from "@/components/layout/BackgroundGradient";
import { AuthProvider } from "@/components/auth/AuthProvider";

export const metadata: Metadata = {
  title: "SSCA Dashboard",
  description: "Self-Sovereign Cognitive API Frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <AuthProvider>
          <LiquidDistortion />
          <BackgroundGradient />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
