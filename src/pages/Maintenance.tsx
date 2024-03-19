import { PlusOutlined } from "@ant-design/icons";
import TableCustomMaintenance from "../components/TableCustomMaintenance";
import { FloatButton } from "antd";
import { useState } from "react";
import Swal from "sweetalert2";
import ModalCreateMaintenance from "../components/ModalCreateMaintenance";

const Maintenance = () => {
  const [open, setOpen] = useState(false);
  const [maintenanceEdit, setMaintenanceEdit] = useState({});

  const [userCreate, setUserCreate] = useState(false);

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

  const handleMaintenanceEdit = (user: any) => {
    setMaintenanceEdit(user);
  };
  return (
    <div>
      <h1
        style={{
          margin: "10px 0px",
        }}
      >
        Maintenance
      </h1>

      <TableCustomMaintenance
        getAllAgain={userCreate}
        handleOpenModal={handleOpenModal}
        handleMaintenanceEdit={handleMaintenanceEdit}
      />

      <FloatButton
        type="primary"
        tooltip={<div>Crear</div>}
        icon={<PlusOutlined />}
        onClick={() => {
          setOpen(true);
          handleMaintenanceEdit({})
        }}
      />

      <ModalCreateMaintenance
        maintenance={maintenanceEdit}
        handleCreate={handleCreate}
        handleCancel={handleCancel}
        open={open}
      />
    </div>
  );
};

export default Maintenance;
