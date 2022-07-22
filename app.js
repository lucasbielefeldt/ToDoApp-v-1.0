'use strict';

let db = [];

const getDatabase = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setDatabase = (db) => localStorage.setItem ('todoList', JSON.stringify(db));

const createItem = (task, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todoItem');
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${task}</div>
        <button onClick="removeItem(${index})" data-index=>X</button>
    `;
    document.getElementById('todoList').appendChild(item);
}

const clearItem = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const refreshScreen = () => {
    clearItem();
    const db = getDatabase(); 
    db.forEach ( (item, index) => createItem (item.task, item.status, index));
}

const insertItem = (event) => {
    const enter = event.key;
    const text = event.target.value;
    if (enter === 'Enter'){
        const db = getDatabase();
        db.push ({'task': text, 'status': ''});
        setDatabase(db);
        refreshScreen();
        event.target.value = '';
    }
}

const removeItem = (index) => {
    const db = getDatabase();
    db.splice (index, 1);
    setDatabase(db);
    refreshScreen();
}
// updated
//const updatedItem = (index) => {
//    const db = getDatabase();
//    console.log();
//    console.log(newItem);
//    newItem.innerHTML = `<input type="text">${db[index].task}</input`;
//    console.log(newItem.innerHTML = `<input type="text">${db[index].task}</input`);
//    setDatabase(db);
//    refreshScreen();
//}

const clickItem = (event) => {
    const item = event.target;
    if (item.type === 'submit') {
        const index = item.dataset.index;
        removeItem (index);
    }else if (item.type === 'checkbox') {
        const index = item.dataset.index;
        updatedItem (index);
    }
}

let newItem = document.getElementById('newItem');
newItem.addEventListener('keypress', insertItem);
document.getElementById('todoList').addEventListener('click', clickItem);

refreshScreen();