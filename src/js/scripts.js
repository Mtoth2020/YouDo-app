const divEl = document.querySelector('div');
const ulElement = document.createElement("ul");
const createButton = document.getElementById('createButton');
const changeButton = document.getElementById('changeButton');
const newTodoInput = document.getElementById('newTodo');
const myTodoForm = document.getElementById("myTodoForm");
const dueDate = document.getElementById("dueDate");
const priority = document.getElementById("priority");
let changeIndex = null;
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
    const values = [myTodoForm.newTodo.value, myTodoForm.dueDate.value, myTodoForm.priority.value];

    if (event.submitter.id === "changeButton") {
        if (changeIndex > -1) {
            myTodoBasket[changeIndex] = values;
            localStorage.setItem('savedList', JSON.stringify(myTodoBasket));
        }
    } else {
        createNewTodo(values);
    }
});

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
    const editButton = document.createElement("button");
    let valuesText = "";
    values.forEach(item => valuesText += ` ${item} `);
    liElement.innerText = valuesText;
    liElement.appendChild(delButton);
    liElement.appendChild(editButton);
    delButton.innerText = "delete";
    editButton.innerText = "edit";
    ulElement.prepend(liElement);
    divEl.append(ulElement);
    delButton.addEventListener('click', () => handleDelete(liElement, values));
    editButton.addEventListener('click', () => handleEdit(liElement,values));
}

function createNewTodo(values) {
    addListItem(values);
    myTodoBasket.push(values);
    localStorage.setItem('savedList', JSON.stringify(myTodoBasket));
}

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

function handleEdit(liElement, values) {
    newTodoInput.value = values[0];
    dueDate.value = values[1];
    priority.value = values[2];
    createButton.classList.add("hidden");
    changeButton.classList.remove("hidden");
    changeIndex = myTodoBasket.findIndex((element) => {
        return element[0] === values[0];
    });
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




