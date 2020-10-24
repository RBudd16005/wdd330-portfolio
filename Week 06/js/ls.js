function saveTodo(todo) {
    const toDoList = getTodoList();

    toDoList.push(todo);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

function deleteTodo(id) {
    const toDoList = getTodoList();

    const updatedTodos = toDoList.filter(todo => todo.id != id)
    localStorage.setItem('toDoList', JSON.stringify(updatedTodos));
}

function getTodoList(){
    const todoListSting = localStorage.getItem('toDoList');
    let todoList = [];

    if (todoListSting) {
        todoList = JSON.parse(todoListString);
    }

    return todoList;
}

export default {
    saveTodo,
    getTodoList,
    deleteTodo
}