
const todoForm = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const todoList = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");

const updateEmptyStateVisibility = () => {
  const todoItemsCount = todoList.querySelectorAll("li.todo-item").length;
  emptyState.style.display = todoItemsCount > 0 ? "none" : "block";
};

const createTodoListItem = (taskText) => {
  const listItem = document.createElement("li");
  listItem.classList.add("todo-item");

  const leftWrap = document.createElement("div");
  leftWrap.classList.add("todo-left");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("aria-label", `Mark "${taskText}" as done`);

  const textSpan = document.createElement("span");
  textSpan.classList.add("todo-text");
  textSpan.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "🗑";
  deleteButton.setAttribute("aria-label", `Delete "${taskText}"`);

  checkbox.addEventListener("change", (event) => {
    listItem.classList.toggle("done", event.target.checked);
  });

  deleteButton.addEventListener("click", () => {
    todoList.removeChild(listItem); 
    updateEmptyStateVisibility();
  });

  leftWrap.appendChild(checkbox);
  leftWrap.appendChild(textSpan);

  listItem.appendChild(leftWrap);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTaskFromInput = () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const newItem = createTodoListItem(taskText);
  todoList.appendChild(newItem);

  taskInput.value = "";
  taskInput.focus();
  updateEmptyStateVisibility();
};

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addTaskFromInput();
});

updateEmptyStateVisibility();
