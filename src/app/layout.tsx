"use client";

import "antd/dist/reset.css";
import "../styles/globals.css";
import { Layout, Menu, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";

const { Header, Sider, Content } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          padding: 0,
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <Layout style={{ minHeight: "100vh", width: "100vw" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ height: "100vh" }}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: <Link href="/">Modo Padre</Link>,
                },
                {
                  key: "2",
                  icon: <LockOutlined />,
                  label: <Link href="/profesores">Modo Profesor</Link>,
                },
                {
                  key: "3",
                  icon: <UploadOutlined />,
                  label: "Opción 3",
                },
              ]}
            />
          </Sider>
          <Layout style={{ height: "100vh" }}>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
                height: "64px",
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                height: "calc(100vh - 64px)",
                width: "100%",
                padding: 24,
                margin: 0,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                overflow: "auto",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
