import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Centro de Belleza Verónica Santillana | Spa de Lujo",
  description: "Experiencia premium de belleza y bienestar en un entorno de lujo. Centro de Belleza Verónica Santillana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
