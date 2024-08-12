import Swal from "sweetalert2";

const showErrorModal = (response: any) => {
  let errorMessages = "";

  if (response) {
    for (const [key, value] of Object.entries(response)) {
      if (Array.isArray(value)) {
        errorMessages += `${key}: ${value.join(", ")}\n`;
      } else {
        errorMessages += `${key}: ${value}\n`;
      }
    }
  }

  Swal.fire({
    title: "Advertencia",
    text: errorMessages || "Ocurrió un error.",
    icon: "warning",
    confirmButtonText: "Ok",
  });
};

export default showErrorModal;
