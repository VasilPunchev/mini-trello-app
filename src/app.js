import { saveTasks, loadTasks } from "./storage.js";
import { createTask, deleteTask, editTask } from "./tasks.js";
import { createTaskElement } from "./dom.js";
import { setupDragAndDrop } from "./drag.js";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const searchInput = document.getElementById("search-input");
const todoColumn = document.getElementById("todo");
const inProgressColumn = document.getElementById("in-progress");
const doneColumn = document.getElementById("done");
const columns = document.querySelectorAll(".task-list");

let tasks = normalizeTasks(loadTasks());

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  const newTask = createTask(text, getNextOrder("todo"));

  tasks.push(newTask);
  saveTasks(tasks);
  taskInput.value = "";

  renderTasks();
});

searchInput.addEventListener("input", function () {
  renderTasks();
});

function showEmptyState(column) {
  const empty = document.createElement("p");
  empty.textContent = "No tasks yet";
  empty.classList.add("empty-state");
  column.appendChild(empty);
}

function renderTasks() {
  todoColumn.innerHTML = "";
  inProgressColumn.innerHTML = "";
  doneColumn.innerHTML = "";

  const query = searchInput.value.toLowerCase();

  const filteredTasks = tasks
    .filter(task => task.text.toLowerCase().includes(query))
    .sort((a, b) => a.order - b.order);

  filteredTasks.forEach(task => {
    const taskElement = createTaskElement(task, handleEdit, handleDelete);

    if (task.status === "todo") {
      todoColumn.appendChild(taskElement);
    } else if (task.status === "in-progress") {
      inProgressColumn.appendChild(taskElement);
    } else if (task.status === "done") {
      doneColumn.appendChild(taskElement);
    }
  });

  const todoCount = tasks.filter(t => t.status === "todo").length;
  const progressCount = tasks.filter(t => t.status === "in-progress").length;
  const doneCount = tasks.filter(t => t.status === "done").length;

  document.querySelector('[data-status="todo"] h2').textContent = `To Do (${todoCount})`;
  document.querySelector('[data-status="in-progress"] h2').textContent = `In Progress (${progressCount})`;
  document.querySelector('[data-status="done"] h2').textContent = `Done (${doneCount})`;

  if (!todoColumn.children.length) {
    showEmptyState(todoColumn);
  }

  if (!inProgressColumn.children.length) {
    showEmptyState(inProgressColumn);
  }

  if (!doneColumn.children.length) {
    showEmptyState(doneColumn);
  }
}

function handleDelete(taskId) {
  if (!confirm("Are you sure you want to delete this task?")) {
    return;
  }

  tasks = deleteTask(tasks, taskId);
  tasks = normalizeTasks(tasks);
  saveTasks(tasks);
  renderTasks();
}

function handleEdit(taskId, newText) {
  const trimmedText = newText.trim();

  if (trimmedText === "") {
    return;
  }

  tasks = editTask(tasks, taskId, trimmedText);
  saveTasks(tasks);
  renderTasks();
}

function getNextOrder(status) {
  const columnTasks = tasks.filter(task => task.status === status);

  if (!columnTasks.length) {
    return 0;
  }

  return Math.max(...columnTasks.map(task => task.order ?? 0)) + 1;
}

function normalizeTasks(tasksArray) {
  const statusOrder = ["todo", "in-progress", "done"];
  const normalized = tasksArray.map(task => ({
    ...task,
    order: task.order ?? 0
  }));

  statusOrder.forEach(status => {
    const sameStatusTasks = normalized.filter(task => task.status === status);

    sameStatusTasks.forEach((task, index) => {
      task.order = index;
    });
  });

  return normalized;
}

renderTasks();

setupDragAndDrop(
  columns,
  () => tasks,
  updatedTasks => {
    tasks = normalizeTasks(updatedTasks);
  },
  saveTasks,
  renderTasks
);