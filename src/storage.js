export function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return [];
}