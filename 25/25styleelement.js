/**
 * Добавление элемента в DOM и установка для него стилей CSS.
 *
 * @param {string} tagName - Имя тега элемента.
 * @param {string} parentTagName - Имя тега родителя элемента.
 * @param {string} styleText - Строка стилей CSS.
 */
function createAndStyleElement(tagName, parentTagName, styleText) {
    const element = document.createElement(tagName);
    element.style.cssText = styleText;
    const parent = document.querySelector(parentTagName);
    parent.appendChild(element);
}

createAndStyleElement('p', 'body', 'width: 200px; height: 300px; background-color: blue; border: 1px solid red;')