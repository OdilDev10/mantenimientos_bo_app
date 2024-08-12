import { Button, Col, Form, Input, Modal, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect } from "react";
import axiosInstance from "../services/axiosconfig";
import Swal from "sweetalert2";

const ModalCreateUser = ({
  open,
  handleCancel,
  handleCreate,
  user,
}: {
  handleCreate: () => void;
  handleCancel: () => void;
  open: boolean;
  user: any;
}) => {
  const [form] = Form.useForm();

  const createUsers = (values: any) => {
    console.log(values, "values");
    axiosInstance
      .post(`/api/v1/users`, { ...values, role: "admin" })
      .then(() => {
        handleCreate();
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          text: `${error}`,
          title: "Error creando",
          showConfirmButton: false,
        });
        console.error("Error fetching data:", error);
      });
  };

  const updateUser = (id: string, values: any) => {
    axiosInstance
      .put(`users/${id}`, values)
      .then(() => {
        handleCreate();
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          text: `${error}`,
          title: "Error actualizando",
          showConfirmButton: false,
        });
        console.error("Error fetching data:", error);
      });
  };

  const onFinish = () => {
    if (Object.keys(user).length !== 0) {
      updateUser(user?._id, form.getFieldsValue());
    } else {
      createUsers(form.getFieldsValue());
    }
  };

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      form.setFieldsValue({
        nombre: user.nombre,
        apellido: user.apellido,
      });
    } else {
      form.resetFields();
    }
  }, [user]);

  return (
    <>
      <Modal
        open={open}
        title="Formulario Usuarios"
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button type="primary" onClick={onFinish}>
              {Object.keys(user).length !== 0 ? "Editar" : "Crear"}
            </Button>
          </>
        )}
      >
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <FormItem
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el nombre",
                    type: "string",
                  },
                ]}
                label="Nombre"
                name="nombre"
              >
                <Input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  defaultValue={user?.nombre}
                />
              </FormItem>
            </Col>
            <Col xs={24} lg={12}>
              <FormItem
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el apellido",
                    type: "string",
                  },
                ]}
                label="Apellido"
                name="apellido"
              >
                <Input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  defaultValue={user?.apellido}
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
