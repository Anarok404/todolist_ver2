let completed = 0,
  incomplete = 0;
let taskList = document.querySelector("#taskList");
let taskInput = document.querySelector("#add");
let taskCount = document.querySelector("#taskCount");
function addTask() {
  let task = taskInput.value.trim();
  if (task !== "") {
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let no = JSON.parse(localStorage.getItem("taskCount") || "[]");
    tasks.push(task);
    no.push(0);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("taskCount", JSON.stringify(no));
    taskInput.value = "";
    addItems();
  }
}
function addItems() {
  completed = 0;
  incomplete = 0;
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  let no = JSON.parse(localStorage.getItem("taskCount") || "[]");
  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex align-items-center justify-content-between";
    const leftDiv = document.createElement("div");
    leftDiv.className = "d-flex align-items-center";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.onchange = function () {
      updateli(this);
    };
    if (no[i] == 1) {
      li.classList.add("completed");
      completed++;
      checkbox.checked = true;
    } else {
      incomplete++;
    }
    const span = document.createElement("span");
    span.textContent = tasks[i];
    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);
    const rightDiv = document.createElement("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-link btn-delete p-0";
    deleteBtn.onclick = function () {
      deleteli(this);
    };
    deleteBtn.textContent = "Delete";
    rightDiv.appendChild(deleteBtn);
    li.appendChild(leftDiv);
    li.appendChild(rightDiv);
    taskList.prepend(li);
  }
  taskCount.textContent = `Completed: ${completed} | Incomplete: ${incomplete}`;
}
function deleteli(control) {
  const li = control.parentNode.parentNode;
  const span = li.querySelector("span");
  let task = span.textContent;
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  let no = JSON.parse(localStorage.getItem("taskCount") || "[]");
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] === task) {
      tasks.splice(i, 1);
      no.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("taskCount", JSON.stringify(no));
  addItems();
}
function updateli(control) {
  let li = control.closest("li");
  let span = li.querySelector("span");
  let text = span.textContent;
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  let no = JSON.parse(localStorage.getItem("taskCount") || "[]");
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] === text) {
      no[i] = control.checked ? 1 : 0;
      break;
    }
  }
  localStorage.setItem("taskCount", JSON.stringify(no));
  addItems();
}
addItems();