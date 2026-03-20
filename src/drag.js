export function setupDragAndDrop(columns, getTasks, setTasks, saveTasks, renderTasks) {
  let draggedTaskId = null;

  document.addEventListener("dragstart", function (e) {
    const taskElement = e.target.closest(".task");

    if (!taskElement) {
      return;
    }

    draggedTaskId = Number(taskElement.dataset.id);
    taskElement.classList.add("dragging");
  });

  document.addEventListener("dragend", function (e) {
    const taskElement = e.target.closest(".task");

    if (taskElement) {
      taskElement.classList.remove("dragging");
    }

    columns.forEach(column => column.classList.remove("drag-over"));

    if (draggedTaskId === null) {
      return;
    }

    const currentTasks = getTasks();
    const updatedTasks = currentTasks.map(task => ({ ...task }));

    columns.forEach(column => {
      const taskElements = [...column.querySelectorAll(".task")];

      taskElements.forEach((taskEl, index) => {
        const taskId = Number(taskEl.dataset.id);
        const task = updatedTasks.find(t => t.id === taskId);

        if (task) {
          task.status = column.id;
          task.order = index;
        }
      });
    });

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    renderTasks();

    draggedTaskId = null;
  });

  columns.forEach(column => {
    column.addEventListener("dragover", function (e) {
      e.preventDefault();
      column.classList.add("drag-over");

      const afterElement = getDragAfterElement(column, e.clientY);
      const draggingElement = document.querySelector(".dragging");

      if (!draggingElement) {
        return;
      }

      if (afterElement == null) {
        column.appendChild(draggingElement);
      } else {
        column.insertBefore(draggingElement, afterElement);
      }
    });

    column.addEventListener("dragleave", function () {
      column.classList.remove("drag-over");
    });

    column.addEventListener("drop", function () {
      column.classList.remove("drag-over");
    });
  });
}

function getDragAfterElement(container, mouseY) {
  const draggableElements = [
    ...container.querySelectorAll(".task:not(.dragging)")
  ];

  let closest = {
    offset: Number.NEGATIVE_INFINITY,
    element: null
  };

  draggableElements.forEach(child => {
    const box = child.getBoundingClientRect();
    const offset = mouseY - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      closest = {
        offset,
        element: child
      };
    }
  });

  return closest.element;
}