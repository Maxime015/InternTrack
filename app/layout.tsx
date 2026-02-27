import type { Metadata } from "next";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata: Metadata = {
  title: "InternTrack – Gestion des stagiaires | Port Autonome de Lomé",
  description:
    "Application de gestion et de traçabilité des stagiaires du Port Autonome de Lomé (PAL).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html lang="fr" data-theme="cmyk">
        <body
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
