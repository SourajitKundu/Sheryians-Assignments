const addEditForm = document.querySelector("form");

const totalExpense = document.querySelector("#total-expense");
const totalIncome = document.querySelector("#total-income");
const currentBalance = document.querySelector("#curr-balance");

//Initilising App function but call it at bottom of all
let list = [];

function initializeApp() {
  loadFromLocalStorage();

  if (list.length === 0) {
    list = [
      {
        id: 1,
        type: "expense",
        description: "Grocery Shopping",
        amount: 1850,
        date: "2026-07-02",
        category: "Food & Dining",
      },
      {
        id: 2,
        type: "income",
        description: "Monthly Salary",
        amount: 45000,
        date: "2026-07-01",
        category: "Salary",
      },
      {
        id: 3,
        type: "expense",
        description: "Petrol",
        amount: 1200,
        date: "2026-07-04",
        category: "Petrol & Auto",
      },
    ];
    saveToLocalStorage();
  }

  renderFullList(list);
}

//Symbol Preference
const currSymbol = document.querySelector("#money-symbol");

let moneySymbol = "₹";

currSymbol.addEventListener("change", function () {
  moneySymbol = currSymbol.value;
  renderFullList(list);
});

//Mode Preference
const themePrefer = document.querySelector("#theme-select");

themePrefer.addEventListener("change", function () {
  document.documentElement.classList.remove("dark");

  if (themePrefer.value === "dark") {
    document.documentElement.classList.add("dark");
  }
});

//rendering dynamic category based on user selected Income or Expense

const categories = {
  expense: ["Food & Dining", "Shopping", "Recharge & Bills", "Petrol & Auto", "Utilities", "Entertainment", "Medical", "Other"],
  income: ["Salary", "Freelancing", "Business", "Investment", "Bonus", "Gift", "Refund", "Other"],
};

const transactionType = addEditForm.querySelector("#tran-type");
const transactionCategory = addEditForm.querySelector("#tran-cat");

const loadCategories = (categoryList) => {
  transactionCategory.innerHTML = "";

  categoryList.forEach((list) => {
    transactionCategory.innerHTML += `<option>${list}</option>`;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  loadCategories(categories[transactionType.value]);
});

transactionType.addEventListener("change", () => {
  loadCategories(categories[transactionType.value]);
});

//rendering transaction list function
const totalTransaction = document.querySelector("#total-transaction");

const renderTransactionList = document.querySelector("#tran-list");

function renderFullList(transactionList) {
  renderTransactionList.innerHTML = "";
  let expense = 0;
  let income = 0;
  let balance = 0;

  transactionList.forEach((transaction) => {
    let typeClass = "";
    let sign = "";
    let amountClass = "";

    if (transaction.type === "income") {
      typeClass = "bg-green-100 text-green-600";
      sign = "+";
      amountClass = "text-green-600";

      income += transaction.amount;
    } else {
      typeClass = "bg-red-100 text-red-600";
      sign = "-";
      amountClass = "text-red-600";

      expense += transaction.amount;
    }

    renderTransactionList.innerHTML += `
        <tr class="border-b divide-y">
            <td class="tran-list-type py-5">
                <span class="${typeClass} px-3 py-1 rounded-full text-sm"> ${transaction.type} </span>
            </td>

            <td class="tran-list-desc">${transaction.description}</td>

            <td class="tran-list-cat">${transaction.category}</td>

            <td class="tran-list-date">${transaction.date}</td>

            <td class="tran-list-amt ${amountClass} font-semibold">${sign}${moneySymbol}${transaction.amount}</td>

            <td>
                <div class="flex gap-3">
                <button id ="edit-btn" onclick="editFunc(${transaction.id})" class="text-blue-600 hover:text-blue-800">
                    <i class="ri-edit-box-line"></i>
                </button>

                <button id="delete-btn" onclick="deleteFunc(${transaction.id})" class="text-red-600 hover:text-red-800">
                    <i class="ri-delete-bin-line"></i>
                </button>
                </div>
            </td>
        </tr>
    `;
  });
  //stats
  totalExpense.innerHTML = `${moneySymbol}${expense}`;
  totalIncome.innerHTML = `${moneySymbol}${income}`;
  totalTransaction.innerText = transactionList.length;
  balance = income - expense;
  if (balance < 0) {
    currentBalance.innerHTML = `-${moneySymbol}${Math.abs(balance)}`;
  } else {
    currentBalance.innerHTML = `${moneySymbol}${Math.abs(balance)}`;
  }
}

//adding transaction from form to transaction list
let editId = null;

const transactionDesc = addEditForm.querySelector("#tran-desc");
const transactionAmount = addEditForm.querySelector("#tran-amt");
const transactionDate = addEditForm.querySelector("#tran-date");

addEditForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (transactionDesc.value.trim() === "" || transactionAmount.value.trim() === "" || transactionDate.value.trim() === "") {
    alert("Please fill all spaces");
    return;
  }

  if (editId === null) {
    const data = {
      id: Date.now(),
      type: transactionType.value,
      description: transactionDesc.value,
      amount: Number(transactionAmount.value),
      date: transactionDate.value,
      category: transactionCategory.value,
    };

    list.push(data);
  } else {
    const updateTran = list.find((elem) => elem.id === editId);
    updateTran.type = transactionType.value;
    updateTran.description = transactionDesc.value;
    updateTran.amount = Number(transactionAmount.value);
    updateTran.date = transactionDate.value;
    updateTran.category = transactionCategory.value;

    editId = null;
  }

  saveToLocalStorage();

  renderFullList(list);

  addEditForm.reset();

  loadCategories(categories[transactionType.value]);

  closeAddEditForm();
});

//writing Edit Func
function editFunc(id) {
  editId = Number(id);

  const editTransaction = list.find((elem) => elem.id === id);

  openAddEditForm();

  transactionType.value = editTransaction.type;
  loadCategories(categories[transactionType.value]);

  transactionDesc.value = editTransaction.description;
  transactionAmount.value = editTransaction.amount;
  transactionDate.value = editTransaction.date;
  transactionCategory.value = editTransaction.category;
}

//Writing Delete Func based on indivisual IDs
function deleteFunc(id) {
  //const list = list.filter((elem) => elem.id !== id);  we could have replaced our arr with new filtered array so name is same

  const index = list.findIndex((elem) => elem.id === id);
  if (index !== -1) {
    list.splice(index, 1);
  }
  saveToLocalStorage();

  renderFullList(list);
}

//Viewing add edit form

const addTransactionBtn = document.querySelector("#add-transaction-btn");
const addEditModal = document.querySelector("#modal");
const closeFormBtn = addEditModal.querySelector("#close-modal");

function openAddEditForm() {
  addEditModal.classList.remove("hidden");
}
function closeAddEditForm() {
  addEditModal.classList.add("hidden");
}

addTransactionBtn.addEventListener("click", function (e) {
  openAddEditForm();
});
closeFormBtn.addEventListener("click", function (e) {
  closeAddEditForm();
});

// local storage saving and loading functions

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(list));
}
function loadFromLocalStorage() {
  const data = localStorage.getItem("transactions");

  if (!data) return;

  list = JSON.parse(data);
}

//Starting the App

initializeApp();
