import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useStoreAuth from "../store/auth";

const LayoutCustomAuth = () => {
  const { user }: any = useStoreAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (
      user ||
      (localStorage.getItem("user") && localStorage.getItem("token"))
    ) {
      if (user?.role === "client") {
        navigate("/dashboard/client/clients");
      } else if (user?.role === "admin") {
        navigate("/computers");
      }
    }
  }, [user, ]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 48px" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LayoutCustomAuth;
