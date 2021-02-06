/*When we open the application, we see an form, where I can type my task.
When we click on the 'create' button, the typed task item appears on the screen.
The screen can contain many tasks.
An button appears next to every single item. If we click on this button,
the item is deleted from the "YouDo" list.*/

const divEl = document.querySelector('div');
const ulElement = document.createElement("ul");
const createButton = document.getElementById('createButton');
//let myTodoBasket = [];

isBasketStatus();

function isBasketStatus() {
    if(localStorage.getItem('savedList') !== "") {
        divEl.innerHTML = JSON.parse(localStorage.getItem('savedList'));
    } else {
        divEl.innerHTML = "";
    }
}

createButton.addEventListener('click', createNewTodo);

function createNewTodo() {
    const addNewTodo = document.getElementById('newTodo');
    const liElement = document.createElement("li");
    const delButton = document.createElement("button");
    liElement.innerText = addNewTodo.value;
    ulElement.prepend(liElement);
    liElement.appendChild(delButton);
    delButton.innerText = "delete";
    divEl.append(ulElement);
    //myTodoBasket.push(divEl.innerHTML);
    //localStorage.setItem('savedList', JSON.stringify(myTodoBasket));
    localStorage.setItem('savedList', JSON.stringify(divEl.innerHTML));
    delButton.addEventListener('click', () => handleDelete(liElement));
}

function handleDelete(liElement) {
    liElement.remove();
}

/*The input field validates the task, it can not be empty and the task description
must be at least 6 characters long. The validation process runs at every keyup event.
The input field is red, when the task description doesn't match the validation criterias,
and green, when it is ready to create.
 */
const newTodoInput = document.getElementById('newTodo');

function validateInput() {
    const input = newTodoInput.value;
    const isMinSixChar = input.length >= 6;
    return input !== "" && isMinSixChar;
}

newTodoInput.addEventListener("keyup", event => {
    event.preventDefault();
    if(!validateInput()) {
        newTodoInput.style.backgroundColor= 'red';
    } else {
        newTodoInput.style.backgroundColor= 'greenyellow';
    }
    createButtonDisableStatus();
});

//The create button is disabled so far the input doesn't pass the validation.

function createButtonDisableStatus() {
    if (validateInput()) {
        createButton.disabled = false;
    } else {
        createButton.disabled = true;
    }
}




