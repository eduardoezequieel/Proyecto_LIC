const submitButton = document.getElementById("submit-button");
const amountInput = document.getElementById("amountInput");
const form = document.querySelector("form");

const constraints = {
  accountNumber: {
    presence: {
      allowEmpty: false,
      message: "^El número de cuenta es requerido",
    },
    format: {
      pattern: "^[0-9]+$",
      message: "^El número de cuenta solo puede contener dígitos",
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
  description: {
    format: {
      pattern: "^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ.,\\s]+$",
      message:
        "^La descripción solo puede contener letras, números y caracteres especiales como .,",
    },
    length: {
      maximum: 100,
      message: "^La descripción no puede exceder los 100 caracteres",
    },
  },
};

const handleSubmit = () => {
  const formData = new FormData(form);
  const formValues = {};

  for (const [key, value] of formData.entries()) {
    formValues[key] = value;
  }

  // Remove empty description to skip validation
  if (
    formValues.description === "" ||
    formValues.description === null ||
    formValues.description === undefined
  ) {
    delete formValues.description;
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
  console.log({ amount, currentBalance });
  if (amount > currentBalance) {
    Swal.fire({
      icon: "error",
      title: "Advertencia",
      text: "El monto a transferir no puede ser mayor al saldo disponible",
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
    text: "Transferencia realizada con éxito",
    theme: "dark",
    showCancelButton: false,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar",
  }).then(() => {
    transferFromBalanceOnLocalStorage({
      ...formValues,
      amount: parseFloat(formValues.amount),
    });
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
