export function createTaskElement(task, onEdit, onDelete) {
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", true);
  div.dataset.id = task.id;

  div.innerHTML = `
    <p class="task-text">${escapeHtml(task.text)}</p>
    <div class="task-buttons">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  const editBtn = div.querySelector(".edit-btn");
  const deleteBtn = div.querySelector(".delete-btn");

  editBtn.addEventListener("click", function () {
    startInlineEdit(div, task, onEdit, onDelete);
  });

  deleteBtn.addEventListener("click", function () {
    onDelete(task.id);
  });

  return div;
}

function startInlineEdit(taskElement, task, onEdit, onDelete) {
  const textEl = taskElement.querySelector(".task-text");
  const buttonsEl = taskElement.querySelector(".task-buttons");

  const oldText = task.text;

  textEl.innerHTML = `
    <input type="text" class="edit-input" value="${escapeHtml(oldText)}" />
  `;

  buttonsEl.innerHTML = `
    <button class="save-btn">Save</button>
    <button class="cancel-btn">Cancel</button>
  `;

  const input = taskElement.querySelector(".edit-input");
  const saveBtn = taskElement.querySelector(".save-btn");
  const cancelBtn = taskElement.querySelector(".cancel-btn");

  input.focus();
  input.select();

  function saveEdit() {
    const newText = input.value.trim();

    if (!newText) {
      return;
    }

    onEdit(task.id, newText);
  }

  function cancelEdit() {
    textEl.textContent = oldText;

    buttonsEl.innerHTML = `
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    const newEditBtn = taskElement.querySelector(".edit-btn");
    const newDeleteBtn = taskElement.querySelector(".delete-btn");

    newEditBtn.addEventListener("click", function () {
      startInlineEdit(taskElement, task, onEdit, onDelete);
    });

    newDeleteBtn.addEventListener("click", function () {
      onDelete(task.id);
    });
  }

  saveBtn.addEventListener("click", saveEdit);
  cancelBtn.addEventListener("click", cancelEdit);

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      saveEdit();
    }

    if (e.key === "Escape") {
      cancelEdit();
    }
  });
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}