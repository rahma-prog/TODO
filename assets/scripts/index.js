window.addEventListener("DOMContentLoaded", main);

const store = {
  tasks: [
    {
      title: "Task 1",
      isCompleted: false,
    },
    {
      title: "Task 2",
      isCompleted: true,
    },
    {
      title: "Task 3",
      isCompleted: false,
    },
    {
      title: "Task 4",
      isCompleted: false,
    },
  ],
};

function main() {
  const formDOM = document.getElementById("todo-form");
  formDOM.addEventListener("submit", onFormSubmit);
  renderHTML();
}

function onFormSubmit(event) {
  event.preventDefault();
  addNewTask();
}

function addNewTask() {
  const inputDOM = document.getElementById("task-title");
  if (checkIfTaskIsValid(inputDOM.value)) {
    store.tasks.push({
      title: inputDOM.value,
      isCompleted: false,
    });
    renderHTML();
  }
}

function checkIfTaskIsValid(taskTitle) {
  return taskTitle.trim() !== "";
}

function renderHTML() {
  renderTasksCounters();
  renderTasksList();
}

function renderTasksCounters() {
  const totalTasksDOM = document.getElementById("total-tasks");
  const totalCompletedDOM = document.getElementById("total-completed");
  const totalActiveDOM = document.getElementById("total-active");

  const totalCompletedCount = store.tasks.filter(
    (task) => task.isCompleted === true
  ).length;

  totalTasksDOM.innerHTML = store.tasks.length;
  totalCompletedDOM.innerHTML = totalCompletedCount;
  totalActiveDOM.innerHTML = store.tasks.length - totalCompletedCount;
}

function renderTasksList() {
  const tasksListDOM = document.getElementById("tasks-list");
  const inputDOM = document.getElementById("task-title");
  renderTasksCounters();

  inputDOM.value = "";
  tasksListDOM.innerHTML = store.tasks
    .map((task) => getTaskHTML(task))
    .join("");

  Array.from(tasksListDOM.children).forEach(handleTaskEvents);
  inputDOM.value = "";
}

function handleTaskEvents(element, index) {
  element.addEventListener("click", () => {
    const taskToUpdate = store.tasks[index].isCompleted;
    store.tasks[index].isCompleted = !taskToUpdate;
    renderHTML();
  });
}

function getTaskHTML(task) {
  return `
  <li class="${task.isCompleted ? "checked" : ""}" > 
    <input type="checkbox" ${task.isCompleted ? "checked" : ""} />
    <span>${task.title}</span>
  </li>
  `;
}
