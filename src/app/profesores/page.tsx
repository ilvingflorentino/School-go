"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Breadcrumb, Layout, Menu, message } from "antd";
import { BookOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header, Sider, Content } = Layout;

const courses = [
  { key: "1A", label: "1A Primaria" },
  { key: "1B", label: "1B Primaria" },
  { key: "2A", label: "2A Primaria" },
];

type Student = {
  key: string;
  name: string;
  status: string;
  eta: number | null;
};

type StudentsData = { [key: string]: Student[] };

const initialStudentsData: StudentsData = {
  "1A": [{ key: "1", name: "Juan Pérez", status: "Esperando", eta: 10 }],
  "1B": [{ key: "3", name: "Carlos García", status: "Esperando", eta: 5 }],
  "2A": [{ key: "5", name: "Pedro Sánchez", status: "Esperando", eta: 20 }],
};

export default function Profesores() {
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0].key);
  const [studentsData, setStudentsData] =
    useState<StudentsData>(initialStudentsData);

  useEffect(() => {
    const interval = setInterval(() => {
      setStudentsData((prevData) => {
        const updatedData = { ...prevData };
        Object.keys(updatedData).forEach((course) => {
          updatedData[course] = updatedData[course].map((student) =>
            student.eta && student.eta > 0
              ? { ...student, eta: student.eta - 1 }
              : student
          );
        });
        return updatedData;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const markAsPickedUp = (studentKey: string) => {
    const updatedStudents = { ...studentsData };
    updatedStudents[selectedCourse] = updatedStudents[selectedCourse].map(
      (student) =>
        student.key === studentKey
          ? { ...student, status: "Recogido", eta: null }
          : student
    );
    setStudentsData(updatedStudents);
    message.success("Estudiante marcado como entregado.");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider collapsible style={{ height: "100vh", overflow: "auto" }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedCourse]}
          onClick={(e) => setSelectedCourse(e.key)}
          items={courses.map((course) => ({
            key: course.key,
            icon: <BookOutlined />,
            label: course.label,
          }))}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 16px",
            height: "64px",
            lineHeight: "64px",
          }}
        >
          <h2 style={{ margin: 0 }}>Vista de Profesores</h2>
          <Link href="/">
            <Button>Modo Padre</Button>
          </Link>
        </Header>
        <Content
          style={{
            padding: 24,
            background: "#fff",
            height: "calc(100vh - 64px)",
            overflow: "auto",
          }}
        >
          <Breadcrumb style={{ marginBottom: "16px" }}>
            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedCourse}</Breadcrumb.Item>
          </Breadcrumb>
          <Table
            dataSource={studentsData[selectedCourse]}
            columns={[
              { title: "Nombre del Alumno", dataIndex: "name", key: "name" },
              {
                title: "Tiempo Estimado de Llegada",
                dataIndex: "eta",
                key: "eta",
                render: (eta) => (eta ? `${eta} min` : "-"),
              },
              {
                title: "Acción",
                key: "action",
                render: (_, record) => (
                  <Button
                    type="primary"
                    disabled={record.status === "Recogido"}
                    onClick={() => markAsPickedUp(record.key)}
                  >
                    Marcar como Entregado
                  </Button>
                ),
              },
            ]}
            pagination={false}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
