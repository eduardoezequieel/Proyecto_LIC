const initialBalance = 500;
let transactions = [];

document.addEventListener("DOMContentLoaded", () => {
  // Verifica si el saldo ya está en localStorage
  if (!localStorage.getItem("balance")) {
    // Si no está, lo inicializa con el saldo inicial
    localStorage.setItem("balance", initialBalance);
  }
});

const addTransaction = (transaction) => {
  transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

// Obtiene el saldo actual de localStorage
const getBalanceFromLocalStorage = () =>
  parseFloat(localStorage.getItem("balance")) || initialBalance;

// Almacena un nuevo saldo en localStorage
const sumToBalanceOnLocalStorage = (amount) => {
  const currentBalance = getBalanceFromLocalStorage();
  const newBalance = currentBalance + amount;

  // Almacena el nuevo saldo en localStorage
  localStorage.setItem("balance", newBalance);
  // Agrega la transacción al localStorage
  addTransaction({
    id: Date.now(),
    type: "deposit",
    description: "Depósito de efectivo",
    amount,
    date: new Date().toISOString(),
  });
};

const transferFromBalanceOnLocalStorage = (formValues) => {
  const currentBalance = getBalanceFromLocalStorage();
  const amount = parseFloat(formValues.amount);
  const newBalance = currentBalance - amount;

  // Almacena el nuevo saldo en localStorage
  localStorage.setItem("balance", newBalance);
  // Agrega la transacción al localStorage
  addTransaction({
    id: Date.now(),
    type: "transfer",
    description: formValues?.description
      ? `${formValues.description} - Transferencia a #${formValues.accountNumber}`
      : `Transferencia a # ${formValues.accountNumber}`,
    amount,
    date: new Date().toISOString(),
  });
};

// Almacena un nuevo saldo en localStorage
const subtractFromBalanceOnLocalStorage = (amount) => {
  const currentBalance = getBalanceFromLocalStorage();
  const newBalance = currentBalance - amount;

  // Almacena el nuevo saldo en localStorage
  localStorage.setItem("balance", newBalance);

  // Agrega la transacción al localStorage
  addTransaction({
    id: Date.now(),
    type: "withdraw",
    description: "Retiro de efectivo",
    amount,
    date: new Date().toISOString(),
  });
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
