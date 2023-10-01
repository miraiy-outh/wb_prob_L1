/**
 * Рекурсивный обход DOM.
 *
 * @param {HTMLElement} node - Переданный HTML-элемент.
 */
function recursiveDOM(node) {
    if (node.tagName !== undefined) {
        console.log(node.tagName);
        if (node.className != '') {
            console.log(node.className);
        }
    }
    node = node.firstChild;
    while (node) {
        recursiveDOM(node);
        node = node.nextSibling;
    }
}

const root = document.documentElement;
recursiveDOM(root);
console.log('');
const div = document.querySelector('.one');
recursiveDOM(div);