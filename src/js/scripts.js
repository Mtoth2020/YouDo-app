
const divEl = document.querySelector('div');
const ulElement = document.createElement("ul");
const createButton = document.getElementById('createButton');
const newTodoInput = document.getElementById('newTodo');
const myTodoForm = document.getElementById("myTodoForm");
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

myTodoForm.addEventListener('submit', event => {
    let values = [myTodoForm.newTodo.value, myTodoForm.dueDate.value, myTodoForm.priority.value];
    createNewTodo(values);
});

//createButton.addEventListener('click', createNewTodo);

newTodoInput.addEventListener("keyup", event => {
    event.preventDefault();
    if(!validateInput()) {
        newTodoInput.style.backgroundColor= 'red';
    } else {
        newTodoInput.style.backgroundColor= 'greenyellow';
    }
    createButtonDisableStatus();
});

function addListItem(values) {
    const liElement = document.createElement("li");
    const delButton = document.createElement("button");
    let valuesText = "";
    values.forEach(item => valuesText += ` ${item} `);
    liElement.innerText = valuesText;
    liElement.appendChild(delButton);
    delButton.innerText = "delete";
    ulElement.prepend(liElement);
    divEl.append(ulElement);
    delButton.addEventListener('click', () => handleDelete(liElement, values));
}

function createNewTodo(values) {
    addListItem(values);
    myTodoBasket.push(values);
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

function handleDelete(liElement, values) {
    liElement.remove();
    const index = myTodoBasket.findIndex((element) => {
        return element[0] === values[0];
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




