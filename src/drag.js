export function setupDragAndDrop(columns, getTasks, setTasks, saveTasks, renderTasks) {
  let draggedTaskId = null;

  document.addEventListener("dragstart", function (e) {
    const taskElement = e.target.closest(".task");

    if (!taskElement) {
      return;
    }

    draggedTaskId = Number(taskElement.dataset.id);
  });

  document.addEventListener("dragend", function () {
    draggedTaskId = null;
  });

  columns.forEach(column => {
    column.addEventListener("dragover", function (e) {
      e.preventDefault();
      column.classList.add("drag-over");
    });

    column.addEventListener("dragleave", function () {
      column.classList.remove("drag-over");
    });

    column.addEventListener("drop", function () {
      column.classList.remove("drag-over");

      const currentTasks = getTasks();
      const updatedTasks = currentTasks.map(task => {
        if (task.id === draggedTaskId) {
          return { ...task, status: column.id };
        }

        return task;
      });

      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      renderTasks();
    });
  });
}