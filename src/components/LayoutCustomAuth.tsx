import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useStoreAuth from "../store/auth";

const LayoutCustomAuth = () => {
  const { user, }: any = useStoreAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user || localStorage.getItem("token")) {
      navigate("/computers");
    }
  }, [user]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "0 48px" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default LayoutCustomAuth;
