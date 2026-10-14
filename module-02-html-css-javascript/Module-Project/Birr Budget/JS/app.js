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
    const li = document.createElement("li");
    li.innerHTML =
     `<span>${transaction.description}</span>
      <strong>
        ${transaction.type === "income" ? "+" : "-"}
        ${transaction.amount} ETB
      </strong>`;
    list.appendChild(li);

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

// Events
const form = document.querySelector("#transaction-form");
const search = document.querySelector("#search");
const descriptionFiled = document.querySelector("#description");
const amountFiled = document.querySelector("#amount");
const typeFiled = document.querySelector("#type");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const description = descriptionFiled.value.trim();
  const amount = Number(amountFiled.value);
  const type = typeFiled.value;

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
   const li = document.createElement("li");
    li.innerHTML = 
    `<span>${transaction.description}</span>
     <strong>
       ${transaction.type === "income" ? "+" : "-"}
       ${transaction.amount} ETB
     </strong>`;
    list.appendChild(li);
  });
});
// Start the app
loadData();
render();