const form = document.querySelector("#form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector(".taskList");
const emplyList = document.querySelector(".emplyList");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
tasks.forEach(function (task) {
  const cssClass = task.done ? "task-title task-title-done" : "task-title";

  const taskHTML = ` 
   <li id="${task.id}" class="list-group_item">
  <span class= "${cssClass}" > ${task.text} </span>
  <div class="task-item-buttoms">
    <button type="button" data-action="done" class="btn-list">
      <img
        src="done_FILL0_wght400_GRAD0_opsz40.svg"
        width="20"
        alt=""
      />
    </button>
    <button type="button" data-action="delete" class="btn-list">
      <img
        src="close_FILL0_wght400_GRAD0_opsz40.svg"и
        width="20"
        alt=""
      />
    </button>
  </div>
</li>`;

  taskList.insertAdjacentHTML("beforeend", taskHTML);

  // Add a task to the page
  taskList.insertAdjace;
});

checkEmptiList();

form.addEventListener("submit", addTask);
taskList.addEventListener("click", dealeteTask);
taskList.addEventListener("click", doneTask);

function addTask(event) {
  // cancel the form submission
  event.preventDefault();

  // get the task text from the input field
  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);

  seveToLocalStore();

  const cssClass = newTask.done ? "task-title task-title-done" : "task-title";

  const taskHTML = ` 
   <li id="${newTask.id}" class="list-group_item">
  <span class= "${cssClass}" > ${newTask.text} </span>
  <div class="task-item-buttoms">
    <button type="button" data-action="done" class="btn-list">
      <img
        src="done_FILL0_wght400_GRAD0_opsz40.svg"
        width="20"
        alt=""
      />
    </button>
    <button type="button" data-action="delete" class="btn-list">
      <img
        src="close_FILL0_wght400_GRAD0_opsz40.svg"и
        width="20"
        alt=""
      />
    </button>
  </div>
</li>`;

  // Add a task to the page
  taskList.insertAdjacentHTML("beforeend", taskHTML);

  // clear the input field
  taskInput.value = "";
  taskInput.focus();
  checkEmptiList();
}

function dealeteTask(event) {
  if (event.target.dataset.action !== "delete") return;

  const perendNode = event.target.closest(".list-group_item");

  const id = Number(perendNode.id);

  // const index = tasks.findIndex((tas) => tas.id === id);

  // tasks.splice(index, 1);

  tasks = tasks.filter((tas) => tas.id !== id);

  seveToLocalStore();
  perendNode.remove();

  checkEmptiList();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;

  const perendNode = event.target.closest(".list-group_item");

  const id = Number(perendNode.id);

  const tas = tasks.find((tas) => tas.id === id);

  tas.done = !tas.done;

  seveToLocalStore();

  const taskTitle = perendNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
}

function checkEmptiList() {
  if (tasks.length === 0) {
    const emplyListElementEle = ` <li class="emplyList">
        <img class="card-img" src="img.list.webp" alt="list" width="100" />
        <div class="emply-list_title">to-do list is empty</div>
      </li> `;
    taskList.insertAdjacentHTML("afterbegin", emplyListElementEle);
  }
  if (tasks.length > 0) {
    const emplyListEL = document.querySelector(".emplyList");
    emplyListEL ? emplyListEL.remove() : null;
  }
}

function seveToLocalStore() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// learn (  closest  ) - ищет среди родителей (конкретно)
//   event.preventDefault(); -  используется для предотвращения стандартного поведения события в браузерею.

//    const cssClass = newTask.done ? "task-title--done" : "task-title"; тернарный оператор
