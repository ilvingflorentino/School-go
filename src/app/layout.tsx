import type { Metadata } from "next";
import "antd/dist/reset.css"; // ✅ Estilos de Ant Design
import "../styles/globals.css"; // ✅ Estilos globales
import ClienteLayout from "../components/ClienteLayout";

export const metadata: Metadata = {
  title: "Sistema de Recogida Escolar",
  description: "Plataforma para facilitar la recogida de estudiantes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ClienteLayout>{children}</ClienteLayout>
      </body>
    </html>
  );
}
