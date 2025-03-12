"use client";

import { Button, Layout } from "antd";
import { LockOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Content } = Layout;

export default function Home() {
  return (
    <Layout style={{ minHeight: "100vh", padding: "24px" }}>
      <Content
        style={{ background: "#fff", padding: "24px", borderRadius: "8px" }}
      >
        <h2>🚗 Bienvenido a la plataforma de recogida escolar</h2>
        <div style={{ marginTop: 16 }}>
          <Link href="/profesores">
            <Button icon={<LockOutlined />} type="primary">
              Modo Profesor
            </Button>
          </Link>
        </div>
      </Content>
    </Layout>
  );
}
