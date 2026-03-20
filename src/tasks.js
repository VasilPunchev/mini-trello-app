export function createTask(text, order = 0) {
  return {
    id: Date.now(),
    text,
    status: "todo",
    order
  };
}

export function deleteTask(tasks, taskId) {
  return tasks.filter(task => task.id !== taskId);
}

export function editTask(tasks, taskId, newText) {
  return tasks.map(task => {
    if (task.id === taskId) {
      return { ...task, text: newText };
    }

    return task;
  });
}