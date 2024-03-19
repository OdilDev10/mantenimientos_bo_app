import { Layout, Menu, theme } from "antd";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const items = [
  { label: "Computers", to: "computers" },
  { label: "Users", to: "users" },
  { label: "Maintenance", to: "maintenance" },
].map((item, index) => ({
  key: index,
  label: <Link to={item.to}>{item.label}</Link>,
}));

const LayoutCustom = () => {
  const location = useLocation();

  if(location.pathname === '/'){
    return <Navigate to={'/computers'} replace/>
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: "100vh",
            height: "min-content",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
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
