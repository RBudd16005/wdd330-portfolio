import utils from './utils.js';
import ls from './ls.js';

// load the list
loadTodos();

// Add event listeners
document.querySelector('#addBtn').onclick = newTodo;
document.querySelector('#allFilter').onclick = applyFilter;
document.querySelector('#activeFilter').onclick = applyFilter;
document.querySelector('#completedFilter').onclick = applyFilter;

// Step 0
function loadTodos() {
    let todoList = ls.getTodoList();
    if (!todoList) {
        todoList = [];
    }
    
    todoList.forEach( todo => {
        const el = createTodoElement(todo)
        addToList(el);
    })
}

// Step 1
function newTodo() {
    const todo = createTodo();
    const todoDiv = createTodoElement(todo);
    addToList(todoDiv);
    ls.saveTodo(todo);
}

// Step 2
function createTodo() {
    const input = document.querySelector('#todoInput');
    const newTodo = { id: Date.now(), content: input.value, completed: false}
    input.value = '';
    return newTodo;
}

// Step 3
function createTodoElement(todo) {
    // todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // complete btn
    const completeBtn = document.createElement('button');
    completeBtn.setAttribute('data-id', todo.id);
    completeBtn.classList.add('todo-content');
    completeBtn.onclick = toggleComplete;
    if (todo.completed) {
        completeBtn.innerText = 'X';
    }

    // todo content
    const todoContent =document.createElement('div');
    todoContent.innerText = todo.content;
    todoContent.classList.add('todo-content');
    if (todo.completed) {
        todoContent.classList.add('completed');
    }

    // delete btn
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-id', todo.id);
    deleteBtn.classList.add('todo-delete-btn');
    deleteBtn.innerText = "X";
    deleteBtn.onclick = deleteTodo;

    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(todoContent);
    todoDiv.appendChild(deleteBtn);

    return todoDiv;
}

// Step 4
function addToList(todoDiv) {
    // Add to the document
    document.querySelector('#todos').appendChild(todoDiv);
}

// Event Handlers
function deleteTodo(e) {
    const btn = e.currentTarget;
    ls.deleteTodo(btn.getAttribute('data-id'));
    document.querySelector('#todos').innerHTML = '';
    loadTodos();
}

function toggleComplete(e) {
    const btn = e.currentTarget;
    ls.checkTodo(btn.getAttribute('data-id'));
    document.querySelector('#todos').innerHTML = '';
    loadTodos();
}

function applyFilter(e) {
    // Clear the list
    document.querySelector('#todos').innerHTML = '';
    
    // Declare variables
    let filteredTodos = [];
    const allTodos = ls.getTodoList();

    // Check which filter to apply
    if (e.currentTarget.id == 'allFilter') {
        filteredTodos = allTodos
    } else if (e.currentTarget.id == 'activeFilter') {
        filteredTodos = utils.activeFilter(allTodos)
    } else if (e.currentTarget.id == 'completedFilter') {
        filteredTodos = utils.completedFilter(allTodos)
    }

    // Draw the list
    filteredTodos.forEach( todo => {
        const el = createTodoElement(todo)
        addToList(el);
    })
}