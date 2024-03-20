import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../services/axiosconfig";
import ComputerModel from "../types/ComputerModel";

const CrearComputadora = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [all_users, setAll_users] = useState([]);
  const params = useParams();
  const [computerToEdit, setComputerToEdit] = useState<
    ComputerModel | undefined
  >(undefined);

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

  const createComputer = (values: any) => {
    axiosInstance
      .post(`/api/v1/computers`, values)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Guardado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
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

  const updateComputer = (values: any) => {
    axiosInstance
      .put(`/api/v1/computers/${params?.id}`, values)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Actualizado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
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

  const getOneComputer = () => {
    axiosInstance
      .get(`/api/v1/computers/${params?.id}`)
      .then((response) => {
        console.log(response.data, "llego");
        setComputerToEdit(response.data);

        form.setFieldsValue({
          departamento: response?.data?.departamento || "",
          codigo: response?.data?.codigo || "",
          serie: response?.data?.serie || "",
          capacidad_disco: response?.data?.capacidad_disco || "",
          memoria_ram: response?.data?.memoria_ram || "",
          soporte_max_ram: response?.data?.soporte_max_ram || "",
          tarjetas: response?.data?.tarjetas || "",
          slots: response?.data?.slots || "",
          slots_dispositivos: response?.data?.slots_dispositivos || "",
          slots_ocupados: response?.data?.slots_ocupados || "",
          user_id: response?.data?.user_id || "",
          fecha_asignacion_usuario:
            response?.data?.fecha_asignacion_usuario || "",
          description: response?.data?.description || "",
          estado: response?.data?.estado || "",
          marca: response?.data?.marca || "",
          modelo: response?.data?.modelo || "",
          office_version: response?.data?.office_version || "",
          year_lanzamiento: response?.data?.year_lanzamiento || "",
          generacion: response?.data?.generacion || "",
          tipo_perfil: response?.data?.tipo_perfil || "",
          ghz_procesador: response?.data?.ghz_procesador || "",
          marca_procesador: response?.data?.marca_procesador || "",
          generacion_procesador: response?.data?.generacion_procesador || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const onFinish = () => {
    const formValues = form.getFieldsValue();
    if (formValues.usuario === "ninguno") {
      formValues.usuario = "";
    }

    if (computerToEdit) {
      updateComputer(formValues);
    } else {
      createComputer(formValues);
    }
  };

  useEffect(() => {
    getAllUsersNameIds();
  }, []);

  useEffect(() => {
    if (params?.id) {
      getOneComputer();
      console.log(params.id, "existe");
    }
  }, [params]);

  return (
    <div>
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Computers Add
      </h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el departamento",
                  type: "string",
                },
              ]}
              label="Departamento"
              name="departamento"
            >
              <Input
                type="text"
                name="departamento"
                placeholder="Departamento"
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el fecha asignacion usuario",
                  type: "string",
                },
              ]}
              label="fecha asignacion usuario"
              name="fecha_asignacion_usuario"
            >
              <Input
                type="text"
                name="fecha_asignacion_usuario"
                placeholder="fecha asignacion usuario"
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el descripcion",
                  type: "string",
                },
              ]}
              label="descripcion"
              name="description"
            >
              <Input type="text" name="description" placeholder="descripcion" />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el estado",
                  type: "string",
                },
              ]}
              label="estado"
              name="estado"
            >
              <Select
                defaultValue=""
                style={{ width: "100%" }}
                // onChange={handleChange}
                options={[
                  { value: "disponible", label: "disponible" },
                  { value: "operativo", label: "operativo" },
                ]}
                placeholder="estado"
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el marca",
                  type: "string",
                },
              ]}
              label="marca"
              name="marca"
            >
              <Select
                defaultValue=""
                style={{ width: "100%" }}
                // onChange={handleChange}
                options={[
                  { value: "dell", label: "dell" },
                  { value: "hp", label: "hp" },
                  { value: "msi", label: "msi" },
                ]}
                placeholder="marca"
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el modelo",
                  type: "string",
                },
              ]}
              label="modelo"
              name="modelo"
            >
              <Input type="text" name="modelo" placeholder="modelo" />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el office version",
                  type: "string",
                },
              ]}
              label="office version"
              name="office_version"
            >
              <Input
                type="text"
                name="office_version"
                placeholder="office version"
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el fecha lanzamiento",
                  type: "string",
                },
              ]}
              label="fecha lanzamiento"
              name="year_lanzamiento"
            >
              <Input
                type="text"
                name="year_lanzamiento"
                placeholder="fecha lanzamiento"
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el generacion procesador",
                  type: "string",
                },
              ]}
              label="generacion procesador"
              name="generacion_procesador"
            >
              <Input
                type="text"
                name="generacion_procesador"
                placeholder="generacion procesador"
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el tipo perfil",
                  type: "string",
                },
              ]}
              label="tipo perfil"
              name="tipo_perfil"
            >
              <Select
                defaultValue=""
                style={{ width: "100%" }}
                // onChange={handleChange}
                options={[
                  { value: "oficina principal", label: "oficina principal" },
                  { value: "1000 x 1000", label: "1000 x 1000" },
                ]}
                placeholder="tipo perfil"
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el ghz procesador",
                  type: "string",
                },
              ]}
              label="ghz procesador"
              name="ghz_procesador"
            >
              <Input
                type="text"
                name="ghz_procesador"
                placeholder="ghz procesador"
              />
            </FormItem>
          </Col>

          <Col xs={24} lg={12}>
            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el marca procesador",
                  type: "string",
                },
              ]}
              label="marca procesador"
              name="marca_procesador"
            >
              <Select
                defaultValue=""
                style={{ width: "100%" }}
                // onChange={handleChange}
                options={[
                  { value: "intel", label: "intel" },
                  { value: "amd", label: "amd" },
                ]}
                placeholder="marca procesador"
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el generacion",
                  type: "string",
                },
              ]}
              label="generacion"
              name="generacion"
            >
              <Input type="text" name="generacion" placeholder="generacion" />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el codigo",
                  type: "string",
                },
              ]}
              label="inventario"
              name="codigo"
            >
              <Input type="text" name="codigo" placeholder="inventario" />
            </FormItem>
            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el serie",
                  type: "string",
                },
              ]}
              label="serie"
              name="serie"
            >
              <Input type="text" name="serie" placeholder="serie" />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el capacidad de disco",
                  type: "string",
                },
              ]}
              label="capacidad de disco"
              name="capacidad_disco"
            >
              <Input
                type="text"
                name="capacidad_disco"
                placeholder="capacidad de disco"
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el memoria ram",
                  type: "string",
                },
              ]}
              label="memoria ram"
              name="memoria_ram"
            >
              <Input type="text" name="memoria_ram" placeholder="memoria ram" />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el soporte max ram",
                  type: "string",
                },
              ]}
              label="soporte max ram"
              name="soporte_max_ram"
            >
              <Input
                type="text"
                name="soporte_max_ram"
                placeholder="soporte max ram"
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa cantidad de tarjetas",
                  type: "number",
                  min: 0,
                  max: 4,
                },
                {
                  validator: (_, value) =>
                    value > 4 || value < 1
                      ? Promise.reject(
                          new Error("No puede ser mayor a 4 o menor a 1")
                        )
                      : Promise.resolve(),
                },
              ]}
              label="tarjetas"
              name="tarjetas"
            >
              <InputNumber
                min={1}
                max={4}
                name="tarjetas"
                placeholder="tarjetas"
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa cantidad de slots",
                  type: "number",
                  min: 0,
                  max: 4,
                },
                {
                  validator: (_, value) =>
                    value > 4 || value < 1
                      ? Promise.reject(
                          new Error("No puede ser mayor a 4 o menor a 1")
                        )
                      : Promise.resolve(),
                },
              ]}
              label="slots"
              name="slots"
            >
              <InputNumber min={1} max={4} name="slots" placeholder="slots" />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa cantidad de slots dispositivos",
                  type: "number",
                  min: 0,
                  max: 4,
                },
                {
                  validator: (_, value) =>
                    value > 4 || value < 1
                      ? Promise.reject(
                          new Error("No puede ser mayor a 4 o menor a 1")
                        )
                      : Promise.resolve(),
                },
              ]}
              label="slots dispositivos"
              name="slots_dispositivos"
            >
              <InputNumber
                min={1}
                max={4}
                name="slots_dispositivos"
                placeholder="slots dispositivos"
                defaultValue={
                  computerToEdit ? computerToEdit?.slots_dispositivos : ""
                }
              />
            </FormItem>

            <FormItem
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa cantidad de slots ocupados",
                  type: "number",
                  min: 0,
                  max: 4,
                },
                {
                  validator: (_, value) =>
                    value > 4 || value < 1
                      ? Promise.reject(
                          new Error("No puede ser mayor a 4 o menor a 1")
                        )
                      : Promise.resolve(),
                },
              ]}
              label="slots ocupados"
              name="slots_ocupados"
            >
              <InputNumber
                min={1}
                max={4}
                name="slots_ocupados"
                placeholder="slots ocupados"
              />
            </FormItem>

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
              <Select style={{ width: "100%" }} placeholder="Usuario asignado">
                <Option value="ninguno">Ninguno</Option>
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

        <Button
          htmlType="submit"
          style={{ width: "100%", height: "50px" }}
          type="primary"
        >
          {computerToEdit ? "Editar" : "Crear"}
        </Button>
      </Form>
    </div>
  );
};

export default CrearComputadora;
