import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TableCustomUser from "../components/TableCustomUser";

const Clients = () => {
  const [open, setOpen] = useState(false);
  const [userCreate, setUserCreate] = useState(false);
  const [userEdit, setuserEdit] = useState({});

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleUserEdit = (user: any) => {
    setuserEdit(user);
  };

  useEffect(() => {
    if (userCreate) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Guardado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      setUserCreate(false);
    }
  }, [userCreate]);

  return (
    <div>
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Clients
      </h1>
      <TableCustomUser
        getAllAgain={userCreate}
        handleOpenModal={handleOpenModal}
        handleUserEdit={handleUserEdit}
      />

      <FloatButton
        type="primary"
        tooltip={<div>Crear</div>}
        icon={<PlusOutlined />}
        onClick={() => {
          setOpen(true);
          handleUserEdit({});
        }}
      />
    </div>
  );
};

export default Clients;
