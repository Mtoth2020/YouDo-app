/*When we open the application, we see an form, where I can type my task.
When we click on the 'create' button, the typed task item appears on the screen. The screen can contain many tasks.
An button appears next to every single item. If we click on this button,
the item is deleted from the "YouDo" list.*/
const divEl = document.querySelector('div');
const ulElement = document.createElement("ul");
const createButton = document.getElementById('createButton');
createButton.addEventListener('click', newTodo);

function newTodo() {
    const addNewTodo = document.getElementById('newTodo');
    const liElement = document.createElement("li");
    const delButton = document.createElement("button");
    liElement.innerText = addNewTodo.value;
    ulElement.prepend(liElement);
    liElement.appendChild(delButton);
    delButton.innerText = "delete";
    divEl.append(ulElement);
    delButton.addEventListener('click', () => handleDelete(liElement));
}

function handleDelete(liElement) {
    liElement.remove();
}




