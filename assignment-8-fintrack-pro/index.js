const addEditForm = document.querySelector("form");

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

let list = [
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

function renderFullList(transactionList) {
  renderTransactionList.innerHTML = "";

  transactionList.forEach((transaction) => {
    renderTransactionList.innerHTML += `
        <tr class="border-b divide-y">
            <td class="tran-list-type py-5">
                <span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm"> ${transaction.type} </span>
            </td>

            <td class="tran-list-desc">${transaction.description}</td>

            <td class="tran-list-cat">${transaction.category}</td>

            <td class="tran-list-date">${transaction.date}</td>

            <td class="tran-list-amt text-red-600 font-semibold">${transaction.amount}</td>

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

  totalTransaction.innerText = transactionList.length;
}

renderFullList(list);

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

    editId === null;
  }

  renderFullList(list);

  addEditForm.reset();

  loadCategories(categories[transactionType.value]);
});

//writing Edit Func
function editFunc(id) {
  editId = Number(id);

  const editTransaction = list.find((elem) => elem.id === id);

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

  renderFullList(list);
}
