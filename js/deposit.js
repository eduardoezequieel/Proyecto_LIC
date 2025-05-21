const amountInput = document.getElementById("amountInput");
const submitButton = document.getElementById("submit-button");
const form = document.querySelector("form");

const constraints = {
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
  const amountValue = amountInput.value.trim();

  const formValues = {
    amount: amountValue,
  };

  const errors = validate(formValues, constraints);
  if (errors) {
    const errorMessage = errors.amount[0];
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

  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: "Depósito realizado con éxito. ¿Desea descargar el comprobante?",
    theme: "dark",
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonColor: "#3085d6",
    denyButtonColor: "#1abc9c",
    confirmButtonText: "Continuar sin comprobante",
    denyButtonText: "Descargar comprobante",
  }).then((result) => {
    const amount = parseFloat(amountValue);
    sumToBalanceOnLocalStorage(amount, result.isDenied);
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
