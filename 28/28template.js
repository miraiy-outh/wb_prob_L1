/**
 * Добавление элемента из шаблона.
 *
 * @param {HTMLElement} templateElement - Переданный шаблон.
 * @param {HTMLElement} parentElement - Элемент, в который нужно добавить щаблон.
 */
function addElement(templateElement, parentElement) {
    const clone = document.importNode(templateElement.content, true);
    parentElement.appendChild(clone);
}

const template1 = document.querySelector('#template1');
const template2 = document.querySelector('#template2');

const container1 = document.querySelector('#container1');
const container2 = document.querySelector('#container2');

addElement(template1, container1);
addElement(template2, container2);