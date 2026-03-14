export function createTaskElement(task, onEdit, onDelete) {
  const div = document.createElement("div");
  div.classList.add("task");

  div.setAttribute("draggable", true);
  div.dataset.id = task.id;

  div.innerHTML = `
    <p>${task.text}</p>
    <div class="task-buttons">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  const editBtn = div.querySelector(".edit-btn");
  const deleteBtn = div.querySelector(".delete-btn");

  editBtn.addEventListener("click", function () {
    onEdit(task.id);
  });

  deleteBtn.addEventListener("click", function () {
    onDelete(task.id);
  });

  return div;
}