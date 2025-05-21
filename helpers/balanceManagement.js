const initialBalance = 500;
let transactions = [];

const addTransaction = (transaction) => {
  transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

(function initializeBalance() {
  // Verifica si el saldo ya está en localStorage
  if (!localStorage.getItem("balance")) {
    // Si no está, lo inicializa con el saldo inicial
    localStorage.setItem("balance", initialBalance);

    addTransaction({
      id: Date.now(),
      type: "deposit",
      description: "Saldo inicial",
      amount: initialBalance,
      date: new Date().toISOString(),
    });
  }
})();

// Obtiene el saldo actual de localStorage
const getBalanceFromLocalStorage = () =>
  parseFloat(localStorage.getItem("balance")) ?? initialBalance;

// Almacena un nuevo saldo en localStorage
const sumToBalanceOnLocalStorage = (amount, downloadReceipt) => {
  const currentBalance = getBalanceFromLocalStorage();
  const newBalance = currentBalance + amount;

  const transaction = {
    id: Date.now(),
    type: "deposit",
    description: "Depósito de efectivo",
    amount,
    date: new Date().toISOString(),
  };

  // Almacena el nuevo saldo en localStorage
  localStorage.setItem("balance", newBalance);
  // Agrega la transacción al localStorage
  addTransaction(transaction);

  if (downloadReceipt) {
    generateReceipt(transaction);
  }
};

const transferFromBalanceOnLocalStorage = (formValues, downloadReceipt) => {
  const currentBalance = getBalanceFromLocalStorage();
  const amount = parseFloat(formValues.amount);
  const newBalance = currentBalance - amount;

  const transaction = {
    id: Date.now(),
    type: "transfer",
    description: formValues?.description
      ? `${formValues.description} - Transferencia a #${formValues.accountNumber}`
      : `Transferencia a #${formValues.accountNumber}`,
    amount,
    date: new Date().toISOString(),
  };

  // Almacena el nuevo saldo en localStorage
  localStorage.setItem("balance", newBalance);
  // Agrega la transacción al localStorage
  addTransaction(transaction);

  if (downloadReceipt) {
    generateReceipt(transaction);
  }
};

// Almacena un nuevo saldo en localStorage
const payServiceFromBalanceOnLocalStorage = (formValues, downloadReceipt) => {
  const currentBalance = getBalanceFromLocalStorage();
  const amount = parseFloat(formValues.amount);
  const newBalance = currentBalance - amount;

  const transaction = {
    id: Date.now(),
    type: "payment",
    description: formValues.service,
    amount,
    date: new Date().toISOString(),
  };

  // Almacena el nuevo saldo en localStorage
  localStorage.setItem("balance", newBalance);
  // Agrega la transacción al localStorage
  addTransaction(transaction);

  if (downloadReceipt) {
    generateReceipt(transaction);
  }
};

// Almacena un nuevo saldo en localStorage
const subtractFromBalanceOnLocalStorage = (amount, downloadReceipt) => {
  const currentBalance = getBalanceFromLocalStorage();
  const newBalance = currentBalance - amount;

  const transaction = {
    id: Date.now(),
    type: "withdraw",
    description: "Retiro de efectivo",
    amount,
    date: new Date().toISOString(),
  };

  // Almacena el nuevo saldo en localStorage
  localStorage.setItem("balance", newBalance);

  // Agrega la transacción al localStorage
  addTransaction(transaction);

  if (downloadReceipt) {
    generateReceipt(transaction);
  }
};

// Actualiza el contador de saldo
const updateBalanceCounter = () => {
  const currentBalance =
    parseFloat(localStorage.getItem("balance")) ?? initialBalance;

  const counterValueLabel = document.querySelector(".counter-value");
  const formattedBalance = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  }).format(currentBalance);

  // Actualiza el valor del contador con el saldo inicial
  counterValueLabel.textContent = formattedBalance;
};
