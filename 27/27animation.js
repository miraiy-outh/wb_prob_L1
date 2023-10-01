/**
 * Добавление анимации к элементу.
 *
 * @param {HTMLElement} element - Переданный HTML-элемент.
 */
function addAnimation(element) {
    element.style.transform = 'scale(0.5) translate(+100%, +100%)';
    element.style.transitionDuration = '3s';
}

const element = document.querySelector('.text');
addAnimation(element);