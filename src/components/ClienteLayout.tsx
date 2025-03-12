"use client"; // 🔥 Esto asegura que este componente solo se renderiza en el cliente

import { useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState("Usuario");

  return (
    <div>
      <header style={{ padding: 20, background: "#001529", color: "white" }}>
        <h2>Bienvenido, {user}</h2>
      </header>
      <main>{children}</main>
    </div>
  );
}
