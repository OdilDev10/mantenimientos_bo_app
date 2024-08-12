const formatNumber = (numberString: any, formatType: 'phone' | 'DNI') => {

    if (isNaN(numberString)) {
      return null;  // Devolver null si no es un número
    }

    if (formatType === "phone") {
      // Formato: 809-788-9090
      return numberString.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if (formatType === "DNI") {
      // Formato: 224-009867-3
      return numberString.replace(/(\d{3})(\d{6})(\d{1})/, "$1-$2-$3");
    } else {
      throw new Error("Tipo de formato no soportado");
    }
  };

  export default formatNumber