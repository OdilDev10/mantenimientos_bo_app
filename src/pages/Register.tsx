import { Card, Input, Button, Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link } from "react-router-dom";
import viteLogo from "../../public/vite.svg";
import { createUser } from "../services/userService";

const validateAge = (_: any, value: any) => {
  if (!value) {
    return Promise.reject(new Error("Por favor ingresa la edad"));
  }

  // Verifica que el valor sea un número entero dentro del rango
  const numericValue = parseInt(value, 10);
  if (isNaN(numericValue) || numericValue < 18 || numericValue > 100) {
    return Promise.reject(new Error("La edad debe estar entre 18 y 100"));
  }

  // Si el valor es válido, permite el envío
  return Promise.resolve();
};

const Register = () => {
  const [form] = Form.useForm();

  const localRegister = async () => {
    await form.validateFields();

    createUser(form.getFieldsValue(), 'client')
      .then((response: any) => {
        if(response?.msg === "User registered successfully"){
          window.location.href = "/"
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: '50px 0px'
      }}
    >
      <Card style={{ minWidth: "50%", minHeight: "85%", textAlign: "center" }}>
        <h2>Mantenimientos APP</h2>
        <h3>Registrarse</h3>
        <img
          style={{ height: "70px" }}
          src={viteLogo}
          alt="viteLogo"
          title="viteLogo"
        />
        <Form form={form} initialValues={{ layout: "vertical" }}>
          <FormItem
            rules={[
              {
                required: true,
                message: "Por favor ingresa el Email",
                type: "email",
              },
            ]}
            label="Email"
            name="email"
          >
            <Input
              style={{ height: "50px" }}
              type="email"
              name="email"
              placeholder="Correo"
            />
          </FormItem>

          <FormItem
            rules={[
              {
                required: true,
                message: "Por favor ingresa el Nombre",
                type: "string",
              },
            ]}
            label="Nombre"
            name="name"
          >
            <Input
              style={{ height: "50px" }}
              type="string"
              name="name"
              placeholder="Nombre"
            />
          </FormItem>
          <FormItem
            rules={[
              {
                required: true,
                message: "Por favor ingresa el Apellido",
                type: "string",
              },
            ]}
            label="Apellido"
            name="last_name"
          >
            <Input
              style={{ height: "50px" }}
              type="string"
              name="last_name"
              placeholder="Apellido"
            />
          </FormItem>

          <FormItem
            rules={[
              {
                required: true,
                message: "Por favor ingresa el Telefono",
                type: "string",
                pattern: /^[0-9]+$/,
              },
            ]}
            label="Telefono"
            name="phone"
          >
            <Input
              style={{ height: "50px" }}
              type="string"
              name="phone"
              placeholder="Telefono"
            />
          </FormItem>

          <FormItem
            // rules={[
            //   {
            //     required: true,
            //     message: "Por favor ingresa el Edad",
            //     type: "string",
            //     pattern: /^[0-9]+$/,
            //     max: 3,
            //     min: 1,
            //   },
            // ]}
            rules={[
              {
                required: true,
                validator: validateAge,
                pattern: /[0-9]{0,13}/,
              },
            ]}
            label="Edad"
            name="age"
          >
            <Input
              style={{ height: "50px" }}
              type="string"
              name="age"
              placeholder="Edad"
              max={100}
              pattern="[0-9]{0,13}"
              min={18}
            />
          </FormItem>

          <FormItem
            rules={[
              {
                required: true,
                message: "Por favor ingresa el Clave",
                type: "string",
              },
            ]}
            label="Clave"
            name="password"
          >
            <Input
              style={{ height: "50px" }}
              type="password"
              name="password"
              placeholder="Clave"
            />
          </FormItem>

          <Button
            htmlType="submit"
            style={{ width: "100%", height: "50px" }}
            type="primary"
            onClick={localRegister}
          >
            Registrar
          </Button>
        </Form>

        <div style={{ marginTop: "40px" }}>
          Ya tienes cuenta? <Link to={"/"}>Iniciar sesion</Link>
        </div>

        <div style={{ marginTop: "10px" }}>
          Ya viste los{" "}
          <Link to={"terms_conditions"}>Terminos y condiciones?</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
