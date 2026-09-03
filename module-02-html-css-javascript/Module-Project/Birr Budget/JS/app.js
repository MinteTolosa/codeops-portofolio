// State
let transactions = [];

// Load
function loadData() {
  const savedData = localStorage.getItem("birrBudget");

  if (savedData) {
    transactions = JSON.parse(savedData);
  }
}

// Save
function saveData() {
  localStorage.setItem("birrBudget", JSON.stringify(transactions));
}

// Render
function render() {
  const list = document.querySelector("#transaction-list");
  const balance = document.querySelector("#balance");
  const income = document.querySelector("#income");
  const expenses = document.querySelector("#expenses");

  list.innerHTML = "";

  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((transaction) => {
    const item = document.createElement("li");

    item.innerHTML = `
      <span>${transaction.description}</span>
      <strong>
        ${transaction.type === "income" ? "+" : "-"}
        ${transaction.amount} ETB
      </strong>
    `;

    list.appendChild(item);

    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpenses += transaction.amount;
    }
  });

  income.textContent = `${totalIncome} ETB`;
  expenses.textContent = `${totalExpenses} ETB`;
  balance.textContent = `${totalIncome - totalExpenses} ETB`;
}

// Core Events
const form = document.querySelector("#transaction-form");
const search = document.querySelector("#search");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const description = document.querySelector("#description").value.trim();
  const amount = Number(document.querySelector("#amount").value);
  const type = document.querySelector("#type").value;

  const transaction = {
    id: Date.now(),
    description,
    amount,
    type
  };

  transactions.push(transaction);

  saveData();
  render();

  form.reset();
});

search.addEventListener("input", () => {
  const searchTerm = search.value.toLowerCase();

  const filtered = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm)
  );

  const list = document.querySelector("#transaction-list");

  list.innerHTML = "";

  filtered.forEach((transaction) => {
    const item = document.createElement("li");

    item.innerHTML = `
      <span>${transaction.description}</span>
      <strong>
        ${transaction.type === "income" ? "+" : "-"}
        ${transaction.amount} ETB
      </strong>
    `;

    list.appendChild(item);
  });
});

// Start the app
loadData();
render();