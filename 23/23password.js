const inputForm = document.querySelector('#pass');
const label = document.querySelector('#label-pass');
const text = document.querySelector('#complexity'); // Вывод сложности пароля.

/**
 * Функция анализа сложности пароля.
 */
function analysePass() {
    let inputFormValue = inputForm.value;

    // Проверки на наличие различных символов и длину пароля с помощью регулярных выражений.
    const checkLiteralsSmall = /[a-zа-я]+/.test(inputFormValue);
    const checkLiteralsBig = /[A-ZА-Я]+/.test(inputFormValue);
    const checkLength = /^.{8,}$/.test(inputFormValue);
    const checkNumbers = /[0-9]/.test(inputFormValue);
    const checkSpecials = /[\-\~\`\!\@\#\$\%\^\&\*\(\)\"\№\:\?\;\'\[\]\\\|\/\,\.\_\+\=\<\>]+/.test(inputFormValue);

    label.textContent = ''; // Удаляем все подсказки при запуске очередной проверки.

    let tmpAnalyse = 0; // Подсчет сложности пароля.

    // Изменение текста подсказок об улучшении пароля.
    if (!checkLength) {
        label.style.display = 'inline-block';
        label.textContent = 'Длина пароля должна не менее 8 символов. ';
        tmpAnalyse++;
    }
    if (!checkNumbers) {
        label.style.display = 'inline-block';
        let labelValue = label.textContent;
        label.textContent = labelValue + 'Пароль должен содержать цифры. ';
        tmpAnalyse++;
    }
    if (!checkLiteralsSmall) {
        label.style.display = 'inline-block';
        let labelValue = label.textContent;
        label.textContent = labelValue + 'Пароль должен содержать буквы нижнего регистра. ';
        tmpAnalyse++;
    }
    if (!checkLiteralsBig) {
        label.style.display = 'inline-block';
        let labelValue = label.textContent;
        label.textContent = labelValue + 'Пароль должен содержать буквы верхнего регистра. ';
        tmpAnalyse++;
    }
    if (!checkSpecials) {
        label.style.display = 'inline-block';
        let labelValue = label.textContent;
        label.textContent = labelValue + 'Пароль должен содержать специальные символы. ';
        tmpAnalyse++;
    }
    if (!checkUniqs(inputFormValue)) {
        label.style.display = 'inline-block';
        let labelValue = label.textContent;
        console.log(labelValue)
        label.textContent = labelValue + 'Пароль должен состоять из разных символов. ';
        tmpAnalyse++;
    }

    // Изменение текста о сложности пароля и очищение текста подсказок (если пароль не слабый).
    text.style.display = 'inline-block';
    switch (tmpAnalyse) {
        case 0:
            text.textContent = 'Очень сильный пароль.';
            text.style.color = 'green';
            break;
        case 1:
            label.textContent = '';
            text.textContent = 'Сильный пароль.';
            text.style.color = 'lightgreen';
            break;
        case 2:
            label.textContent = '';
            text.textContent = 'Средний пароль.';
            text.style.color = '#ffc206';
            break;
        case 3:
            text.textContent = 'Слабый пароль.';
            text.style.color = 'orange';
            break;
        case 4:
            text.textContent = 'Очень слабый пароль.';
            text.style.color = 'red';
            break;
        case 5:
            text.textContent = 'Пароль взломают за 1 секунду.';
            text.style.color = 'darkred';
            break;
        case 6:
            label.textContent = '';
            text.textContent = 'Введите пароль.';
            text.style.color = 'red';
            break;
        default:
            break;
    }
}

/**
 * Функция проверки пароля на наличие неодинаковых символов.
 *
 * @param {string} strPass - Строка пароля.
 * @return {boolean} - Результат проверки.
 */
function checkUniqs(strPass) {
    let tmpCheck = false;
    for (let i = 0; i < strPass.length - 1; i++) {
        if (strPass[i] != strPass[i + 1]) {
            tmpCheck = true;
        }
    }
    return tmpCheck;
}

// При нажатии на кнопку запускается функция анализа пароля на сложность.
const button = document.querySelector('#button-pass');
button.addEventListener('click', analysePass);