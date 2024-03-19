import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosconfig";

const ModalCreateMaintenance = ({
  open,
  handleCancel,
  handleCreate,
  maintenance,
}: {
  handleCreate: (creado: boolean) => void;
  handleCancel: () => void;
  open: boolean;
  maintenance: any;
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [all_users, setAll_users] = useState([]);
  const [all_computers, setAll_computers] = useState([]);

  const getAllUsersNameIds = () => {
    axiosInstance
      .get(`/api/v1/users_name_id`)
      .then((response) => {
        setAll_users(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getAllComputersNameIds = () => {
    axiosInstance
      .get(`/api/v1/computers_name_id`)
      .then((response) => {
        setAll_computers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const createMaintenance = (values: any) => {
    axiosInstance
      .post(`/api/v1/mantenimiento`, values)
      .then(() => {
        handleCreate(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const updateMaintenance = (id: string, values: any) => {
    axiosInstance
      .put(`/api/v1/mantenimiento/${id}`, values)
      .then(() => {
        handleCreate(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onFinish = () => {
    if (Object.keys(maintenance).length !== 0) {
      updateMaintenance(maintenance?._id, form.getFieldsValue());
    } else {
      createMaintenance(form.getFieldsValue());
    }
  };

  useEffect(() => {
    getAllUsersNameIds();
    getAllComputersNameIds();
  }, []);

  useEffect(() => {
    if (maintenance && Object.keys(maintenance).length !== 0) {
      form.setFieldsValue({
        descripcion_mantenimiento: maintenance?.descripcion_mantenimiento || "",
        user_id: maintenance?.user[0]?._id || "",
        computer_id: maintenance?.computer[0]?._id || "",
      });
    } else {
      form.resetFields();
    }
  }, [maintenance, form]);

  return (
    <>
      <Modal
        open={open}
        title="Formulario Mantenimientos"
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button type="primary" onClick={onFinish}>
              {Object.keys(maintenance).length !== 0 ? "Editar" : "Crear"}
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
                    message: "Por favor ingresa el Descripcion Mantenimiento",
                    type: "string",
                  },
                ]}
                label="Descripcion Mantenimiento"
                name="descripcion_mantenimiento"
              >
                <Input
                  type="text"
                  name="descripcion_mantenimiento"
                  defaultValue={maintenance?.descripcion_mantenimiento}
                  placeholder="Descripcion Mantenimiento"
                />
              </FormItem>

              <FormItem
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el computer",
                    type: "string",
                  },
                ]}
                label="computadora asignada"
                name="computer_id"
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="computadora asignada"
                >
                  {all_computers?.length > 0 &&
                    all_computers?.map((option: any) => {
                      return (
                        <Option key={option._id} value={option._id}>
                          {option.codigo +
                            " " +
                            option.marca +
                            " " +
                            option.modelo}
                        </Option>
                      );
                    })}
                </Select>
              </FormItem>
            </Col>
            <Col xs={24} lg={12}>
              <FormItem
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el user",
                    type: "string",
                  },
                ]}
                label="usueario asignado"
                name="user_id"
              >
                <Select
                  style={{ width: "100%" }}
                  placeholder="usueario asignado"
                >
                  {all_users?.length > 0 &&
                    all_users?.map((option: any) => {
                      return (
                        <Option key={option._id} value={option._id}>
                          {option.nombre + " " + option.apellido}
                        </Option>
                      );
                    })}
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateMaintenance;
