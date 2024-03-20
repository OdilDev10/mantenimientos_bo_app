import { Button, Col, DatePicker, Form, Modal, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../services/axiosconfig";

const ModalExportar = ({url, fileName } : {url: string, fileName: string, }) => {
  const [form] = Form.useForm();
  const [openModalExport, setOpenModalExport] = useState(false);
  const { RangePicker } = DatePicker;

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onFinishExport = () => {
    let formValues = form.getFieldsValue();

    const formattedDateOne = formatDate(formValues.date_range[0].toDate()); // "2024-03-06"
    const formattedDateTwo = formatDate(formValues.date_range[1].toDate());
    axiosInstance
      .get(
        `${url}/${formattedDateOne}/${formattedDateTwo}`,
        {
          responseType: "blob", // Indicar que esperamos una respuesta binaria
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Existen registros, descargar el archivo
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${fileName}.xlsx`);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          Swal.fire({
            title: "Exportado exitoso",
            text: "Todos los registros exportados.",
            icon: "success",
          });
        } else if (response.status === 204) {
          Swal.fire({
            title: "No hay registros disponibles en esta fecha para exportar",
            icon: "info",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error al exportar",
          text: `${error}`,
          icon: "error",
        });
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <Modal
        open={openModalExport}
        title={`Exportar ${fileName}`}
        onCancel={() => setOpenModalExport(false)}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button type="primary" onClick={onFinishExport}>
              Exportar
            </Button>
          </>
        )}
      >
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={24}>
              <FormItem
                rules={[
                  {
                    required: true,
                    message: "Por favor ingresa el rango de fechas",
                    type: "array",
                  },
                ]}
                label="Rango de fechas"
                name="date_range"
              >
                <RangePicker
                  name="date_range"
                  style={{
                    width: "100%",
                  }}
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Button
        type="primary"
        onClick={() => {
          setOpenModalExport(true);
        }}
      >
        Exportar
      </Button>
    </div>
  );
};

export default ModalExportar;
