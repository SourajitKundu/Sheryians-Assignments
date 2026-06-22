let tasks = [
  {
    id: 1,
    taskName: "Learn DOM Manipulation",
    category: "study",
    status: "pending",
  },
  {
    id: 2,
    taskName: "Build Portfolio Homepage",
    category: "work",
    status: "completed",
  },
  {
    id: 3,
    taskName: "Morning Walk",
    category: "personal",
    status: "pending",
  },
  {
    id: 4,
    taskName: "Solve 10 DSA Problems",
    category: "study",
    status: "infeasible",
  },
  {
    id: 5,
    taskName: "Prepare React Notes",
    category: "study",
    status: "completed",
  },
  {
    id: 6,
    taskName: "Client Meeting",
    category: "work",
    status: "pending",
  },
  {
    id: 7,
    taskName: "Buy Groceries",
    category: "personal",
    status: "cancelled",
  },
  {
    id: 8,
    taskName: "Complete Tailwind Assignment",
    category: "study",
    status: "pending",
  },
  {
    id: 9,
    taskName: "Fix Landing Page Bugs",
    category: "work",
    status: "completed",
  },
  {
    id: 10,
    taskName: "Read Atomic Habits",
    category: "personal",
    status: "completed",
  },
];

let pendingTasks = document.querySelector("#pending");
let completedTasks = document.querySelector("#completed");
let infeasibleTasks = document.querySelector("#infeasible");
let cancelledTasks = document.querySelector("#cancel");

const taskList = document.querySelector("#task-list");

const renderTaskList = () => {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    taskList.innerHTML += `
    <tr class="divide-x [&>*]:px-5 [&>*]:py-3">
      <td>${task.id}</td>
      <td class="capitalize">${task.taskName}</td>
      <td class="capitalize">${task.category}</td>
      <td class="capitalize">${task.status}</td>
      <td class="text-center"><button data-id="${task.id}" class="edit-btn border rounded-lg px-7 py-1">Edit</button></td>
      <td class="text-center"><button data-id="${task.id}" class="delete-btn border rounded-lg px-7 py-1">Delete</button></td>
    </tr>
    `;
  });

  let pendingCount = 0;
  let completedCount = 0;
  let infeasibleCount = 0;
  let cancelledCount = 0;

  tasks.forEach((task) => {
    if (task.status === "pending") {
      pendingCount += 1;
    } else if (task.status === "completed") {
      completedCount += 1;
    } else if (task.status === "infeasible") {
      infeasibleCount += 1;
    } else {
      cancelledCount += 1;
    }
  });

  pendingTasks.innerText = pendingCount;
  completedTasks.innerText = completedCount;
  infeasibleTasks.innerText = infeasibleCount;
  cancelledTasks.innerText = cancelledCount;
};

renderTaskList();

let editID = null;

const form = document.querySelector("form");

const taskName = document.querySelector("#task-name");
const taskCat = document.querySelector("#task-category");
const taskStat = document.querySelector("#task-status");

//creation

form.addEventListener("submit", (events) => {
  events.preventDefault();
  let name = taskName.value;
  let category = taskCat.value;
  let status = taskStat.value;

  if (name.trim() === "" || category.trim() === "" || status.trim() === "") {
    alert("Please fill all spaces");
    return;
  }

  if (editID === null) {
    tasks.push({
      id: Date.now(),
      taskName: name,
      category,
      status,
    });
  } else {
    const updatedTask = tasks.find((t) => t.id === editID);

    updatedTask.taskName = name;
    updatedTask.category = category;
    updatedTask.status = status;

    editID = null;

    createBtn.innerText = "Create Task";
  }

  renderTaskList();

  form.reset();
});

//Deletion

taskList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    //console.log("Delete Button clicked of ID " + event.target.dataset.id);

    const id = Number(event.target.dataset.id);

    const task = tasks.find((t) => t.id === id);

    console.log(`Delete Button clicked of ID ${task.id} and Name ${task.taskName}`);

    //const index = tasks.findIndex((t) => t.id === id); //mutating
    //tasks.splice(index, 1);

    tasks = tasks.filter((t) => t.id !== id);

    renderTaskList();
  }
});

//Edit/ Update
const createBtn = document.querySelector("#create-task");

taskList.addEventListener("click", (events) => {
  if (events.target.classList.contains("edit-btn")) {
    const id = Number(events.target.dataset.id);

    const task = tasks.find((t) => t.id === id);

    taskName.value = task.taskName;
    taskCat.value = task.category;
    taskStat.value = task.status;

    createBtn.innerText = "Update";

    editID = id;
  }
});

//All tasks types

const backupTasks = tasks;

function allPendingTasks() {
  tasks = tasks.filter((task) => task.status === "pending");
  renderTaskList();
  tasks = backupTasks;
}

function allCompletedTasks() {
  tasks = tasks.filter((task) => task.status === "completed");
  renderTaskList();
  tasks = backupTasks;
}

function allInfeasibleTasks() {
  tasks = tasks.filter((task) => task.status === "infeasible");
  renderTaskList();
  tasks = backupTasks;
}

function allCancelledTasks() {
  tasks = tasks.filter((task) => task.status === "cancelled");
  renderTaskList();
  tasks = backupTasks;
}
