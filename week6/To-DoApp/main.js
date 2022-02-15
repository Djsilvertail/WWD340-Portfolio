const ActiveTab = 'ActiveTab';
const FinishedTab = 'FinishedTab';
const AllTab = 'AllTab';

let selectedTab = AllTab;
let masterToDoItems = [];
let todoItems = [];

function renderTodo(todo) {
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
  console.log('Yay It runs....', {
    masterToDoItems,
    todoItems
  });

  const list = document.querySelector('.js-todo-list');
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) list.innerHTML = '';
    document.querySelector('#to-do-counter').innerHTML = `${todoItems.length} tasks left`;
    return
  }

  const isChecked = todo.checked ? 'done' : '';
  const node = document.createElement("li");
  node.setAttribute('class', `todo-item ${isChecked}`);
  node.setAttribute('data-key', todo.id);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
  document.querySelector('#to-do-counter').innerHTML = `${todoItems.length} tasks left`;
}

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  masterToDoItems.push(todo);
  todoItems.push(todo);
  renderTodo(todo);
}

function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

function deleteTodo(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index]
  };
  masterToDoItems = masterToDoItems.filter(item => item.id !== Number(key));
  todoItems = todoItems.filter(item => item.id !== Number(key));
  renderTodo(todo);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-todo-input');

  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItems');
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach(t => {
      renderTodo(t);
    });
  }
});

const allTabButton = document.querySelector('#all-tab');
allTabButton.addEventListener('click', event => {
  console.log('Fuck Ya It Worked!!!!!!');
  todoItems = masterToDoItems
  const list = document.querySelector('.js-todo-list');
  list.innerHTML = "";
  todoItems.forEach(item => {
    renderTodo(item);
  });
});
const activeTabButton = document.querySelector('#active-tab');
activeTabButton.addEventListener('click', event => {
  todoItems = masterToDoItems.filter(item => {
    return item.checked === false;
  });
  console.log('Active tab works', {
    todoItems,
    masterToDoItems
  });
  const list = document.querySelector('.js-todo-list');
  list.innerHTML = "";
  todoItems.forEach(item => {
    renderTodo(item);
  });
});
const finishedTabButton = document.querySelector('#finished-tab');
finishedTabButton.addEventListener('click', event => {
  todoItems = masterToDoItems.filter(item => {
    return item.checked === true;
  });
  console.log('Finished tab works', {
    todoItems,
    masterToDoItems
  });
  const list = document.querySelector('.js-todo-list');
  list.innerHTML = "";
  todoItems.forEach(item => {
    renderTodo(item);
  });
});