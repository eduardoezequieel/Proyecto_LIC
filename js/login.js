const submitButton = document.querySelector("#signInButton");
const pinInput = document.querySelector("input.input");

const constraints = {
  pin: {
    presence: true,
    length: {
      minimum: 4,
      maximum: 4,
      message: "debe ser un número de 4 dígitos",
    },
  },
};

const handleLogIn = () => {
  const pinValue = pinInput.value.trim();

  const formValues = {
    pin: pinValue,
  };

  const errors = validate(formValues, constraints);

  if (errors) {
    const errorMessage = errors.pin[0];
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

  if (pinValue !== "1234") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "PIN incorrecto",
      theme: "dark",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  window.location.href = "/dashboard/index.html";
};

submitButton.addEventListener("click", (e) => {
  handleLogIn();
});

pinInput.addEventListener("input", (e) => validateIntegerValues(e));

pinInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleLogIn();
  }
});
