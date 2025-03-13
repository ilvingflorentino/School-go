"use client";

import { Button, Layout } from "antd";
import Link from "next/link";

const { Content } = Layout;

export default function Home() {
  return (
    <Layout style={{ minHeight: "100vh", padding: "24px" }}>
      <Content
        style={{ background: "#fff", padding: "24px", borderRadius: "8px" }}
      >
        <h2>🚗 Bienvenido Triumphare School-Go</h2>
        <div style={{ marginTop: 16 }}>
          <Link href="/profesores"></Link>
        </div>
      </Content>
    </Layout>
  );
}
