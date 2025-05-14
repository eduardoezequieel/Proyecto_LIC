const validateMoneyAmounts = (e) => {
  // Obtener el valor del campo de entrada
  const value = e.target.value;

  // Eliminar cualquier carácter que no sea un dígito o punto decimal
  let cleaned = value.replace(/[^0-9.]/g, "");

  // Asegurar que solo haya un punto decimal
  const decimalCount = (cleaned.match(/\./g) || []).length;
  if (decimalCount > 1) {
    const parts = cleaned.split(".");
    cleaned = parts[0] + "." + parts.slice(1).join("");
  }

  // Limitar a 2 decimales y asegurar que el total de dígitos (excluyendo el punto decimal) sea <= 8
  if (cleaned.includes(".")) {
    const parts = cleaned.split(".");
    // Limitar la parte entera a (8 - dígitos decimales) de longitud
    const decimalPart = parts[1].substring(0, 2); // Máximo 2 decimales
    const maxIntegerLength = 8 - decimalPart.length;
    const integerPart = parts[0].substring(0, maxIntegerLength);
    cleaned = integerPart + "." + decimalPart;
  } else {
    // Sin punto decimal, solo limitar a 8 dígitos
    cleaned = cleaned.substring(0, 8);
  }
  // Actualizar el valor del campo de entrada
  e.target.value = cleaned;
};

const validateIntegerValues = (e) => {
  if (isNaN(Number(e.target.value))) {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  }
};
