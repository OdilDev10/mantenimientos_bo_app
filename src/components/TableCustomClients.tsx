import { InfoCircleOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { Button, Input, Table, Tag } from "antd";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../services/axiosconfig";

interface DataType {
  id: string;
  nombre: string;
  apellido: number;
  address: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}

const TableCustomClients = () => {
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
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllClients = (
    current_page: number,
    page_size: number,
    search_term?: string
  ) => {
    axiosInstance
      .get(
        search_term
          ? `users/clients?page_size=${page_size}&current_page=${current_page}&search_term=${search_term}`
          : `users/clients?page_size=${page_size}&current_page=${current_page}`
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
      .delete(`Clients/${id}`)
      .then((response) => {
        if (response) {
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu archivo ha sido eliminado.",
            icon: "success",
          });

          getAllClients(pagination.current, pagination.pageSize);
        }
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
      .put(`Clients_active/${id}`)
      .then((response) => {
        if (response) {
          Swal.fire({
            title: "Activado",
            text: "Tu archivo ha sido activado.",
            icon: "success",
          });

          getAllClients(pagination.current, pagination.pageSize);
        }
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
    getAllClients(pagination.current, pagination.pageSize);
  }, []);


  const onSearch = (e: any) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(() => {
      getAllClients(1, pagination.pageSize, newSearchTerm);
    }, 600); // 600 milisegundos de retraso
  };

  const onChangePagination = (value: any) => {
    getAllClients(value.current, value.pageSize, searchTerm);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "last_name",
      key: "last_name",
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
              text: "Nombre del cliente, Apellido del cliente.",
              icon: "info",
            });
          }}
        />
      
      <Input
          onChange={onSearch}
          value={searchTerm}
          placeholder="Buscar computadoras..."
          style={{ width: "50%" }}
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

export default TableCustomClients;
