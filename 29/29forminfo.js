/**
 * Отправка содержимого из элемента формы.
 */
function sendMessage() {
    const inputFormText = document.querySelector('#input1').value;
    const text = document.querySelector('.receivedText');
    text.textContent = inputFormText;
}

const button = document.querySelector('.button');
button.addEventListener('click', sendMessage);