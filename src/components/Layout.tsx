import { Avatar, Dropdown, Layout, Menu, MenuProps, Space, theme } from "antd";
import { Suspense, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useStoreAuth from "../store/auth";

const { Header, Content, Footer } = Layout;

const itemsMenu = [
  { label: "Computers", to: "computers" },
  { label: "Users", to: "users" },
  { label: "Maintenance", to: "maintenance" },
  { label: "Clients", to: "clients" },
].map((item, index) => ({
  key: index,
  label: <Link to={item.to}>{item.label}</Link>,
}));

const LayoutCustom = () => {
  const { user, setUser }: any = useStoreAuth();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (!user || !localStorage.getItem("token")) {
      navigate("/");
    } else if (user?.role === "client") {
      navigate("/dashboard/clients/computers");
    }
  }, [user]);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <p
          onClick={() => {
            setUser(null);
            localStorage.clear();
            navigate("/login");
          }}
        >
          Cerrar sesion
        </p>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={itemsMenu}
          style={{ flex: 1, minWidth: "60%" }}
        />
        <div style={{}}>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" />
                {user?.name + " " + user?.last_name}
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
      <Content style={{ padding: "0 48px" }} className="container_layout">
        <div
          className="container_layout__content"
          style={{
            background: colorBgContainer,
            minHeight: "100vh",
            height: "min-content",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Suspense fallback={"Loading..."}>
            <Outlet />
          </Suspense>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <a href="https://odilmartinez.com">
          ©{new Date().getFullYear()} Created by Odil Martinez
        </a>
      </Footer>
    </Layout>
  );
};

export default LayoutCustom;
