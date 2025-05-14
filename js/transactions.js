const transactionsTableBody = document.querySelector("#transactions-table");

document.addEventListener("DOMContentLoaded", () => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  let html = "";
  transactions.forEach((transaction) => {
    const typeDictionary = {
      deposit: "Depósito",
      withdraw: "Retiro",
    }[transaction.type];

    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(transaction.amount);

    const formattedDate = new Date(transaction.date).toLocaleString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    html += `
      <tr>
        <th scope="row">${transaction.id}</th>
        <td>${typeDictionary}</td>
        <td>${transaction.description}</td>
        <td>${formattedAmount}</td>
        <td>${formattedDate}</td>
      </tr>
    `;
  });

  transactionsTableBody.innerHTML = html;
});
