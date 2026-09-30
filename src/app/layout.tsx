import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DEFAULT_THEME, themeStyle } from "@/features/theming";
import { fontVariableClassNames } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Plataforma de marketing médico",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es-MX" className={fontVariableClassNames} style={themeStyle(DEFAULT_THEME)}>
      <body>{children}</body>
    </html>
  );
}
