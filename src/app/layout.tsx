"use client";

import "antd/dist/reset.css";
import "./styles/globals.css";
import { Layout, Menu, Button, theme, Modal, Input, message } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (password === "12345") {
      message.success("Acceso concedido");
      setIsModalVisible(false);
      setPassword("");
      router.push("/padres"); // 🔥 Redirige a la vista de padres
    } else {
      message.error("Clave incorrecta");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPassword("");
  };

  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link href="/">Modo Profesor</Link>,
    },
    {
      key: "2",
      icon: <LockOutlined />,
      label: <span onClick={handleOpenModal}>Modo Padre</span>,
    },
  ];

  return (
    <html lang="es">
      <body>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: "16px", width: 64, height: 64 }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>

        {/* 🔥 Modal para ingresar la clave del padre */}
        <Modal
          title="Clave de Padre"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOk();
            }}
          >
            <p>Por favor, introduce la clave de padre:</p>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Clave"
              autoComplete="new-password"
            />
            <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
              Acceder
            </Button>
          </form>
        </Modal>
      </body>
    </html>
  );
}
