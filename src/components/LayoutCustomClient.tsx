import { Suspense, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useStoreAuth from "../store/auth";
import { Avatar, Dropdown, Layout, Menu, MenuProps, Space, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

const itemsMenu = [
  { label: "Computers", to: "computers" },
  { label: "Maintenance", to: "maintenance" },
].map((item, index) => ({
  key: index,
  label: <Link to={item.to}>{item.label}</Link>,
}));

const LayoutCustomClient = () => {
  const { user, setUser }: any = useStoreAuth();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {

    if (!user || !localStorage.getItem("token")) {
      navigate("/");
    } else if (user?.role === "admin") {
      navigate("/computers");
    }
  }, [user, ]);

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
        <div
          className="demo-logo"
          style={{ display: "flex", justifyContent: "space-between" }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={itemsMenu}
          style={{ flex: 1, minWidth: 0 }}
        />
        <span style={{ color: "#fff" }}>
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                {user?.name + " " + user?.last_name}
              </Space>
            </a>
          </Dropdown>
        </span>
      </Header>
      <Content style={{ padding: "0 48px" }} className="container_layout">
        <div
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

export default LayoutCustomClient;
