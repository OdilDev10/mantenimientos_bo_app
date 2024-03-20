import { InfoCircleOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import {
  Button,
  Input,
  Table,
  Tag
} from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../services/axiosconfig";
import ModalExportar from "./ModalExportar";

interface DataType {
  id: string;
  nombre: string;
  apellido: number;
  address: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

const TableCustomMaintenance = ({
  getAllAgain,
  handleOpenModal,
  handleMaintenanceEdit,
}: {
  getAllAgain?: boolean;
  handleOpenModal: () => void;
  handleMaintenanceEdit: (maintenance: any) => void;
}) => {
  const [data, setData] = useState<DataType[]>([]);

  const [pagination, setPagination] = useState<{
    current: number;
    pageSize: number;
    total: number;
  }>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [paramInSearch, setParamInSearch] = useState("");


  const getAllMaintenance = (
    current_page: number,
    page_size: number,
    search_term?: string
  ) => {
    axiosInstance
      .get(
        search_term
          ? `/api/v1/mantenimiento?page_size=${page_size}&current_page=${current_page}&search_term=${search_term}`
          : `/api/v1/mantenimiento?page_size=${page_size}&current_page=${current_page}`
      )
      .then((response) => {
        setData(response.data.data);
        setPagination({
          current: response.data.current_page,
          pageSize: response.data.page_size,
          total: response.data.total_records,
        });
      })
      .catch((error) => {
       
        console.error("Error fetching data:", error);
      });
  };

  const deleteRegister = (id: string) => {
    axiosInstance
      .delete(`/api/v1/mantenimiento/${id}`)
      .then(() => {
        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu archivo ha sido eliminado.",
          icon: "success",
        });

        getAllMaintenance(pagination.current, pagination.pageSize);
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          text: `${error}`,
          title: "Error desactivando registro",
          showConfirmButton: false,
        });
        console.error("Error fetching data:", error);
      });
  };

  const activeRegister = (id: string) => {
    axiosInstance
      .put(`/api/v1/mantenimiento_active/${id}`)
      .then(() => {
        Swal.fire({
          title: "Activado",
          text: "Tu archivo ha sido activado.",
          icon: "success",
        });

        getAllMaintenance(pagination.current, pagination.pageSize);
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          text: `${error}`,
          title: "Error activando registro",
          showConfirmButton: false,
        });
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getAllMaintenance(pagination.current, pagination.pageSize);
  }, [getAllAgain]);

  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    setParamInSearch(value);
    getAllMaintenance(1, pagination.pageSize, value);
  };

  const { Search } = Input;

  const onChangePagination = (value: any) => {
    getAllMaintenance(value.current, value.pageSize, paramInSearch);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Descripcion Mantenimiento",
      dataIndex: "descripcion_mantenimiento",
      key: "descripcion_mantenimiento",
    },
    {
      title: "Tecnico",
      dataIndex: "user",
      key: "user",
      render: (record: any) => {
        return (
          <span>
            {record[0]?.nombre
              ? record[0]?.nombre + " " + record[0]?.apellido
              : "No asignado"}
          </span>
        );
      },
    },
    {
      title: "Computadora",
      dataIndex: "computer",
      key: "computer",
      render: (record: any) => {
        return (
          <span>
            {record[0]?.codigo
              ? record[0]?.codigo +
                " " +
                record[0]?.marca +
                " " +
                record[0]?.modelo
              : "No asignado"}
          </span>
        );
      },
    },
    {
      title: "Creacion",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Actualizado",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Desactivado",
      dataIndex: "deleted_at",
      key: "deleted_at",
    },
    {
      title: "Status",
      dataIndex: "deleted",
      key: "deleted",
      render: (deleted: boolean) => (
        <>
          {deleted ? (
            <Tag color="red">Deshabilitado</Tag>
          ) : (
            <Tag color="green">Activo</Tag>
          )}
        </>
      ),
    },
    {
      title: "Acciones",
      key: "acciones",
      width: 600,
      render: (record: any) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="primary"
              danger
              onClick={() => {
                Swal.fire({
                  title: "¿Estás seguro?",
                  text: "Se desactivara el registro",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "¡Sí, desactivar!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteRegister(record._id);
                  }
                });
              }}
            >
              Desactivar
            </Button>

            <Button
              type="primary"
              style={{ background: "#009975" }}
              onClick={() => {
                Swal.fire({
                  title: "¿Estás seguro?",
                  text: "Se activara el registro",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "¡Sí, activar!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    activeRegister(record._id);
                  }
                });
              }}
            >
              Activar
            </Button>

            <Button
              type="primary"
              style={{ background: "#e5de00", color: "#000" }}
              onClick={() => {
                handleOpenModal();
                handleMaintenanceEdit(record);
              }}
            >
              Actualizar
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          padding: "10px 0px",
          gap: "10px",
        }}
      >
       
       <ModalExportar url={"/api/v1/mantenimiento/export"} fileName={"mantenimientos"}/>
        <InfoCircleOutlined
          style={{ cursor: "pointer" }}
          onClick={() => {
            Swal.fire({
              title: "Se puede buscar por:",
              text: "Description del mantenimiento, Codigo pc, Nombre de usuario.",
              icon: "info",
            });
          }}
        />
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 250 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={onChangePagination}
        scroll={{ x: 900 }}
      />
    </>
  );
};

export default TableCustomMaintenance;
