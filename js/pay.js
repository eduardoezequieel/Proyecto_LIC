const submitButton = document.getElementById("submit-button");
const amountInput = document.getElementById("amountInput");
const form = document.querySelector("form");

const constraints = {
  service: {
    presence: {
      allowEmpty: false,
      message: "^El servicio es requerido",
    },
    format: {
      pattern: "^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ.,\\s]+$",
      message:
        "^El servicio solo puede contener letras, números y caracteres especiales como .,",
    },
    length: {
      maximum: 100,
      message: "^La descripción no puede exceder los 100 caracteres",
    },
  },
  amount: {
    presence: {
      allowEmpty: false,
      message: "^El monto es requerido",
    },
    numericality: {
      greaterThan: 0,
      message: "^El monto debe ser mayor que cero",
    },
  },
};

const handleSubmit = () => {
  const formData = new FormData(form);
  const formValues = {};

  for (const [key, value] of formData.entries()) {
    formValues[key] = value;
  }

  const errors = validate(formValues, constraints);
  const messages = Array.from(Object.values(errors || {})).flat();
  if (messages.length > 0) {
    const errorMessage = messages[0];
    Swal.fire({
      icon: "error",
      title: "Advertencia",
      text: errorMessage,
      theme: "dark",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  const currentBalance =
    parseFloat(localStorage.getItem("balance")) ?? initialBalance;
  const amount = parseFloat(formValues.amount);

  if (amount > currentBalance) {
    Swal.fire({
      icon: "error",
      title: "Advertencia",
      text: "El monto a no puede ser mayor al saldo disponible",
      theme: "dark",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: "Servicio pagado con éxito. ¿Desea descargar el comprobante?",
    theme: "dark",
    showCancelButton: false,
    showDenyButton: true,
    confirmButtonColor: "#3085d6",
    denyButtonColor: "#1abc9c",
    confirmButtonText: "Continuar sin comprobante",
    denyButtonText: "Descargar comprobante",
  }).then((result) => {
    payServiceFromBalanceOnLocalStorage(
      {
        ...formValues,
        amount: parseFloat(formValues.amount),
      },
      result.isDenied
    );
    updateBalanceCounter();

    window.location.href = "/dashboard/index.html";
  });
};

document.addEventListener("DOMContentLoaded", () => {
  updateBalanceCounter();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
});

amountInput.addEventListener("input", (e) => validateMoneyAmounts(e));
