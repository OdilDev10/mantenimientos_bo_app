import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import TableCustomComputers from "../components/TableCustomComputers";

const Computers = () => {
 
  const navigate = useNavigate();
  return (
    <div>
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Computers
      </h1>

      <TableCustomComputers />

      <FloatButton
        type="primary"
        tooltip={<div>Crear</div>}
        icon={<PlusOutlined />}
        onClick={() => {
          navigate("/crear_computers");
        }}
      />

 
    </div>
  );
};

export default Computers;
