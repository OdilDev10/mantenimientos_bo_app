import { PlusOutlined } from "@ant-design/icons";
import TableCustomMaintenance from "../components/TableCustomMaintenance";
import { FloatButton } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ModalCreateMaintenance from "../components/ModalCreateMaintenance";

const Maintenance = () => {
  const [open, setOpen] = useState(false);
  const [maintenanceEdit, setMaintenanceEdit] = useState({});
  const [maintenanceCreate, setMaintenanceCreate] = useState(false);


  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleMaintenanceEdit = (user: any) => {
    setMaintenanceEdit(user);
  };

  useEffect(() => {
   if(maintenanceCreate){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Guardado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
    setMaintenanceCreate(false)
   }
  }, [maintenanceCreate])
  
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
        getAllAgain={maintenanceCreate}
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
        handleCreate={() => setMaintenanceCreate(true)}
        handleCancel={handleCancel}
        open={open}
      />
    </div>
  );
};

export default Maintenance;
