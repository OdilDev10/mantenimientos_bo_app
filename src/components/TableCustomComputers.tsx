import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tag } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ComputerModel from "../types/ComputerModel";

const TableCustomComputers: React.FC = () => {
  const [data, setData] = useState<ComputerModel[]>([]);
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
  const navigate = useNavigate();

  const getAllComputers = (
    current_page: number,
    page_size: number,
    search_term?: string
  ) => {
    axios
      .get(
        search_term
          ? `http://127.0.0.1:8000/api/v1/computers?page_size=${page_size}&current_page=${current_page}&search_term=${search_term}`
          : `http://127.0.0.1:8000/api/v1/computers?page_size=${page_size}&current_page=${current_page}`
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
    axios
      .delete(`http://127.0.0.1:8000/api/v1/computers/${id}`)
      .then((response) => {
        if (response) {
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu archivo ha sido eliminado.",
            icon: "success",
          });

          getAllComputers(pagination.current, pagination.pageSize);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const activeRegister = (id: string) => {
    axios
      .put(`http://127.0.0.1:8000/api/v1/computers_active/${id}`)
      .then((response) => {
        if (response) {
          Swal.fire({
            title: "Activado",
            text: "Tu archivo ha sido activado.",
            icon: "success",
          });

          getAllComputers(pagination.current, pagination.pageSize);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getAllComputers(pagination.current, pagination.pageSize);
  }, []);

  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    setParamInSearch(value);
    getAllComputers(1, pagination.pageSize, value);
  };

  const { Search } = Input;

  const onChangePagination = (value: any) => {
    getAllComputers(value.current, value.pageSize, paramInSearch);
  };

  const columns = [
    {
      title: "Código",
      dataIndex: "codigo",
      key: "codigo",
    },
    {
      title: "Departamento",
      dataIndex: "departamento",
      key: "departamento",
    },
    {
      title: "Usuario",
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
      title: "Serie",
      dataIndex: "serie",
      key: "serie",
    },
    {
      title: "Capacidad de disco",
      dataIndex: "capacidad_disco",
      key: "capacidad_disco",
    },
    {
      title: "Memoria ram",
      dataIndex: "memoria_ram",
      key: "memoria_ram",
    },

    {
      title: "Soporte maximo de ram",
      dataIndex: "soporte_max_ram",
      key: "soporte_max_ram",
    },
    {
      title: "Tarjetas",
      dataIndex: "tarjetas",
      key: "tarjetas",
    },
    {
      title: "Slots",
      dataIndex: "slots",
      key: "slots",
    },
    {
      title: "Slots dispositivos",
      dataIndex: "slots_dispositivos",
      key: "slots_dispositivos",
    },
    {
      title: "Slots Ocupados",
      dataIndex: "slots_ocupados",
      key: "slots_ocupados",
    },
    {
      title: "Fecha asignacion usuario",
      dataIndex: "fecha_asignacion_usuario",
      key: "fecha_asignacion_usuario",
    },
    {
      title: "Descripcion",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Office version",
      dataIndex: "office_version",
      key: "office_version",
    },
    {
      title: "Año de lanzamiento",
      dataIndex: "year_lanzamiento",
      key: "year_lanzamiento",
    },
    {
      title: "Generacion",
      dataIndex: "generacion",
      key: "generacion",
    },
    {
      title: "Ghz procesador",
      dataIndex: "ghz_procesador",
      key: "ghz_procesador",
    },
    {
      title: "Generacion procesador",
      dataIndex: "generacion_procesador",
      key: "generacion_procesador",
    },
    {
      title: "Generacion procesador",
      dataIndex: "generacion_procesador",
      key: "generacion_procesador",
    },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
    },
    {
      title: "Marca",
      dataIndex: "marca",
      key: "marca",
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      key: "modelo",
    },
    {
      title: "Perfil",
      dataIndex: "tipo_perfil",
      key: "tipo_perfil",
    },
    {
      title: "Procesador",
      dataIndex: "marca_procesador",
      key: "marca_procesador",
    },
    {
      title: "Creado",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => <span>{created_at}</span>,
    },
    {
      title: "Actualizado",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: string) => <span>{updated_at}</span>,
    },
    {
      title: "Borrado",
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
                  confirmButtonText: "¡Sí, eliminarlo!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteRegister(record._id);
                  }
                });
              }}
            >
              Eliminar
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
                navigate(`/crear_computers/${record._id}`);
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
        <InfoCircleOutlined
          style={{ cursor: "pointer" }}
          onClick={() => {
            Swal.fire({
              title: "Se puede buscar por:",
              text: "Departamento, Codigo, Serie, Marca, Modelo, Nombre de usuario.",
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
        scroll={{ x: 1500 }}
      />
    </>
  );
};

export default TableCustomComputers;
