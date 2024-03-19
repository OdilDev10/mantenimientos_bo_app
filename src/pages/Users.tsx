import { PlusOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useState } from "react";
import ModalCreateUser from "../components/ModalCreateUsers";
import TableCustom from "../components/TableCustomUser";
import Swal from "sweetalert2";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [userCreate, setUserCreate] = useState(false);
  const [userEdit, setuserEdit] = useState({});

  const handleCreate = (creado: boolean) => {
    setUserCreate(creado);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Guardado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleUserEdit = (user: any) => {
    setuserEdit(user);
  };


  return (
    <div>
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Users
      </h1>
      <TableCustom
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
          handleUserEdit({})
        }}
      />

      <ModalCreateUser
        user={userEdit}
        handleCreate={handleCreate}
        handleCancel={handleCancel}
        open={open}
      />
    </div>
  );
};

export default Users;
