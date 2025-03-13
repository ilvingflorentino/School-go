"use client";

import {
  Table,
  Button,
  Breadcrumb,
  Layout,
  Menu,
  Select,
  Modal,
  message,
} from "antd";
import { BookOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const courses = [
  { key: "1A", label: "1A Primaria" },
  { key: "1B", label: "1B Primaria" },
  { key: "2A", label: "2A Primaria" },
];

const studentsData: { [key: string]: { key: string; name: string }[] } = {
  "1A": [
    { key: "1", name: "Juan Pérez" },
    { key: "2", name: "María López" },
  ],
  "1B": [
    { key: "3", name: "Carlos García" },
    { key: "4", name: "Ana Martínez" },
  ],
  "2A": [
    { key: "5", name: "Pedro Sánchez" },
    { key: "6", name: "Lucía Fernández" },
  ],
};

export default function Padres() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].key);
  const [selectedStudent, setSelectedStudent] = useState<{
    key: string;
    name: string;
  } | null>(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedETA, setSelectedETA] = useState<number | null>(null);
  const [isAtDoor, setIsAtDoor] = useState(false);

  const handleSelectStudent = (student: { key: string; name: string }) => {
    setSelectedStudent(student);
    setIsConfirmModalVisible(true);
  };

  const handleConfirmSelection = () => {
    if (selectedETA || isAtDoor) {
      const status = isAtDoor ? "En la puerta" : `ETA: ${selectedETA} minutos`;
      if (selectedStudent) {
        message.success(
          `${selectedStudent.name} ha sido registrado: ${status}`
        );
        setIsConfirmModalVisible(false);
        setSelectedStudent(null);
        setSelectedETA(null);
        setIsAtDoor(false);
      }
    } else {
      message.error(
        "Por favor, selecciona un tiempo estimado de llegada o marca 'En la puerta'."
      );
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
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
          <h2 style={{ margin: 0 }}>Vista de Padres</h2>
          <Link href="/">
            <Button>Modo Profesor</Button>
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
          <Select
            defaultValue={selectedCourse}
            style={{ width: 200, marginBottom: 16 }}
            onChange={(value) => setSelectedCourse(value)}
          >
            {courses.map((course) => (
              <Option key={course.key} value={course.key}>
                {course.label}
              </Option>
            ))}
          </Select>
          <Table
            dataSource={studentsData[selectedCourse]}
            columns={[
              { title: "Nombre", dataIndex: "name", key: "name" },
              {
                title: "Acción",
                key: "action",
                render: (_, record) => (
                  <Button
                    type="primary"
                    onClick={() => handleSelectStudent(record)}
                  >
                    Seleccionar
                  </Button>
                ),
              },
            ]}
            pagination={false}
          />
        </Content>
      </Layout>
      <Modal
        title="Confirmar Selección"
        open={isConfirmModalVisible}
        onOk={handleConfirmSelection}
        onCancel={() => setIsConfirmModalVisible(false)}
        okText="Confirmar"
      >
        {selectedStudent && (
          <div>
            <p>
              Has seleccionado a: <strong>{selectedStudent.name}</strong>
            </p>
            <p>Selecciona el tiempo estimado de llegada:</p>
            <Select
              style={{ width: "100%", marginBottom: 16 }}
              onChange={(value) => setSelectedETA(value)}
              placeholder="Selecciona el Tiempo"
            >
              <Option value={5}>5 minutos</Option>
              <Option value={10}>10 minutos</Option>
              <Option value={20}>20 minutos</Option>
              <Option value={30}>30 minutos</Option>
            </Select>
            <Button
              type={isAtDoor ? "primary" : "default"}
              onClick={() => setIsAtDoor(!isAtDoor)}
              style={{ width: "100%" }}
            >
              {isAtDoor ? "En la puerta ✔️" : "Marcar como 'En la puerta'"}
            </Button>
          </div>
        )}
      </Modal>
    </Layout>
  );
}
