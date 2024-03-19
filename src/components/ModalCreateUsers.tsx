import { Button, Col, Form, Input, Modal, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { useEffect } from "react";

const ModalCreateUser = ({
  open,
  handleCancel,
  handleCreate,
  user,
}: {
  handleCreate: (creado: boolean) => void;
  handleCancel: () => void;
  open: boolean;
  user: any;
}) => {
  const [form] = Form.useForm();

  const createUsers = (values: any) => {
    axios
      .post(`http://127.0.0.1:8000/api/v1/users`, values)
      .then(() => {
        handleCreate(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const updateUser = (id: string, values: any) => {
    axios
      .put(`http://127.0.0.1:8000/api/v1/users/${id}`, values)
      .then(() => {
        handleCreate(true);
      })
      .catch((error) => {
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
