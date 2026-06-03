import type { Metadata } from "next";
import "./globals.css";
import { LiquidDistortion } from "@/components/glass/LiquidDistortion";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { RouteTransitionProvider } from "@/components/transitions/RouteTransitionProvider";
import { ToastProvider } from "@/components/layout/ToastProvider";
import { SmoothScrollProvider } from "@/components/transitions/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "SSCA Cognitive Engine",
  description: "Self-Sovereign Cognitive API — Your AI-powered memory vault",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <SmoothScrollProvider>
          <AuthProvider>
            <ToastProvider>
              <LiquidDistortion />
              <AnimatedBackground />
              <RouteTransitionProvider>
                {children}
              </RouteTransitionProvider>
            </ToastProvider>
          </AuthProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
