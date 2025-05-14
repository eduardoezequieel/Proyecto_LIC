const initialBalance = 500;

document.addEventListener("DOMContentLoaded", () => {
  // Verifica si el saldo ya está en localStorage
  if (!localStorage.getItem("balance")) {
    // Si no está, lo inicializa con el saldo inicial
    localStorage.setItem("balance", initialBalance);
  }
});

// Obtiene el saldo actual de localStorage
const getBalanceFromLocalStorage = () =>
  parseFloat(localStorage.getItem("balance")) || initialBalance;

// Almacena un nuevo saldo en localStorage
const sumToBalanceOnLocalStorage = (amount) => {
  const currentBalance = getBalanceFromLocalStorage();
  const newBalance = currentBalance + amount;

  // Almacena el nuevo saldo en localStorage
  localStorage.setItem("balance", newBalance);
};

// Actualiza el contador de saldo
const updateBalanceCounter = () => {
  const currentBalance =
    parseFloat(localStorage.getItem("balance")) || initialBalance;

  const counterValueLabel = document.querySelector(".counter-value");
  const formattedBalance = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  }).format(currentBalance);

  // Actualiza el valor del contador con el saldo inicial
  counterValueLabel.textContent = formattedBalance;
};
