// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

// FUNCTIONS

function addTodo(e) {
  e.preventDefault();
  // CRIAR DIV E CLASS
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // CRIAR LI E CLASS
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // ADCIONAR TO-DO NO LOCALSTORAGE
  saveLocalTodos(todoInput.value);

  // CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class= "fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // CHECK TRASH BUTTON
  const trashdButton = document.createElement("button");
  trashdButton.innerHTML = '<i class= "fas fa-trash"></i>';
  trashdButton.classList.add("trash-btn");
  todoDiv.appendChild(trashdButton);

  // APPEND TO LIST
  todoList.appendChild(todoDiv);

  // LIMPAR O VALOR DO INPUT
  todoInput.value = "";
}

// DELETE TO-DO
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }

  // CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// SALVAR O LOCALSTORAGE

function saveLocalTodos(todo) {
  // CHECAR SE JA TEM ALGO SALVO NO LOCALSTORAGE
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// PEGAR ELEMENTOS DO LOCALSTORAGE

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // CRIAR LI E CLASS
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // CHECK TRASH BUTTON
    const trashdButton = document.createElement("button");
    trashdButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashdButton.classList.add("trash-btn");
    todoDiv.appendChild(trashdButton);

    // APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

// REMOVER ELEMENTOS DO LOCALSTORAGE

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
