import { Button, Card, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import viteLogo from "../../public/vite.svg";
import { loginUser } from "../services/userService";
import useStoreAuth from "../store/auth";

const Auth = () => {
  const [form] = Form.useForm();
  const { setUser }: any = useStoreAuth();
  const navigate = useNavigate();

  const localLogin = async () => {
    await form.validateFields();
    let values = form.getFieldsValue();

    loginUser(values?.email, values?.password)
      .then((response: any) => {
        if (response?.user && response?.token) {
          localStorage.setItem("token", response?.token);
          localStorage.setItem("user", JSON.stringify(response?.user));
          setUser(response?.user);
          navigate("/computers");
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
      }}
    >
      <Card style={{ minWidth: "50%", minHeight: "50%", textAlign: "center" }}>
        <h2>ReparaTic</h2>
        <h3>Iniciar sesion</h3>

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
            onClick={localLogin}
            htmlType="submit"
            style={{ width: "100%", height: "50px" }}
            type="primary"
          >
            Login
          </Button>
        </Form>

        <div style={{ marginTop: "40px" }}>
          No tienes cuenta? <Link to={"register"}>Registrarse</Link>
        </div>

        <div style={{ marginTop: "10px" }}>
          Ya viste los{" "}
          <Link to={"terms_conditions"}>Terminos y condiciones?</Link>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
