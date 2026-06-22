import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clon Airbnb",
  description: "Página de inicio con filtros y alojamientos",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
