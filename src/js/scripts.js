
const divEl = document.querySelector('div');
const ulElement = document.createElement("ul");
const createButton = document.getElementById('createButton');
const newTodoInput = document.getElementById('newTodo');
let myTodoBasket = [];

init();
function init() {
    const savedList = localStorage.getItem('savedList');
    if(!!savedList) {
        myTodoBasket = JSON.parse(savedList);
        myTodoBasket.forEach((item) => addListItem(item));
    } else {
        divEl.innerHTML = "";
    }
}

createButton.addEventListener('click', createNewTodo);

newTodoInput.addEventListener("keyup", event => {
    event.preventDefault();
    if(!validateInput()) {
        newTodoInput.style.backgroundColor= 'red';
    } else {
        newTodoInput.style.backgroundColor= 'greenyellow';
    }
    createButtonDisableStatus();
});

function addListItem(value) {
    const liElement = document.createElement("li");
    const delButton = document.createElement("button");
    liElement.innerText = value;
    liElement.appendChild(delButton);
    delButton.innerText = "delete";
    ulElement.prepend(liElement);
    divEl.append(ulElement);
    delButton.addEventListener('click', () => handleDelete(liElement, value));
}

function createNewTodo() {
    addListItem(newTodoInput.value);
    myTodoBasket.push(newTodoInput.value);
    localStorage.setItem('savedList', JSON.stringify(myTodoBasket));
}

/*
function createNewTodo() {
    const liElement = createListElement(newTodoInput.value);
    ulElement.prepend(liElement);
    divEl.append(ulElement);
    myTodoBasket.push(newTodoInput.value);
    localStorage.setItem('savedList', JSON.stringify(myTodoBasket));
    //localStorage.setItem('savedList', JSON.stringify(divEl.innerHTML));
    delButton.addEventListener('click', () => handleDelete(liElement));
}
*/

function handleDelete(liElement, value) {
    liElement.remove();
    const index = myTodoBasket.findIndex((element) => {
        return element === value;
    });
    if (index > -1) {
        myTodoBasket.splice(index, 1);
        localStorage.setItem('savedList', JSON.stringify(myTodoBasket));
    }
}

function validateInput() {
    const input = newTodoInput.value;
    const isMinSixChar = input.length >= 6;
    return input !== "" && isMinSixChar;
}

function createButtonDisableStatus() {
    if (validateInput()) {
        createButton.disabled = false;
    } else {
        createButton.disabled = true;
    }
}




