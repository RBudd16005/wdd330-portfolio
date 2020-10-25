function saveTodo(todo) {
    const toDoList = getTodoList();

    toDoList.push(todo);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

function deleteTodo(id) {
    const toDoList = getTodoList();

    const updatedTodos = toDoList.filter( todo => todo.id != id)
    localStorage.setItem('toDoList', JSON.stringify(updatedTodos));
}

function checkTodo(id) {
    const toDoList = getTodoList();
    let updatedTodos = [];

    toDoList.forEach( todo => {
        if (todo.id == id)
        {
            todo.completed = true;
        }
        updatedTodos.push(todo);
    });
    localStorage.setItem('toDoList', JSON.stringify(updatedTodos));
}

function getTodoList(){
    const todoListString = localStorage.getItem('toDoList');
    let todoList = [];

    if (todoListString != 'undefined') {
        todoList = JSON.parse(todoListString);
    }

    return todoList;
}

export default {
    saveTodo,
    getTodoList,
    deleteTodo,
    checkTodo
}