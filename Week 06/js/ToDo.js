import utils from './utils.js';
import ls from './ls.js';

document.querySelector('#addBtn').onclick = newTodo;

function loadTodos() {
    const todoList = ls.getTodoList();
    
    todoList.forEach(todo => {
        const el = createTodoElement(todo)
        addToList(el);
    });
}

function newTodo() {
    const todo = createTodo();
    const todoDiv = creatTodoElement(todo);
    addToList(todoDiv);
    ls.saveTodo(todo);
}

function createTodo() {
    const input = document.querySelector('#todoInput');
    const newTodo = { id: Date.now(), content: input.nodeValue, completed: false}
    input.value = '';
    return newTodo;
}

function creatTodoElement(todo) {
    // todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // complete btn
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('todo-content');

    // todo content
    const todoContent =document.createElement('div');
    todoContent.innerText = todo.content;
    todoContent.classList.add('todo-content');

    // delete btn
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-id', todo.id);
    deleteBtn.classList.add('todo-delete-bin');
    deleteBtn.innerText = "x";
    deleteBtn.onclick = deleteTodo;

    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(todoContent);
    todoDiv.appendChild(deleteBtn);

    return todoDiv;
}

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