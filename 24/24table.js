// Логика работы кнопок-переключателей.
const buttonPrevPrev = document.querySelector('.button-prev-prev');
const buttonPrev = document.querySelector('.button-prev');
const buttonOne = document.querySelector('.button1');
const buttonTwo = document.querySelector('.button2');
const buttonThree = document.querySelector('.button3');
const buttonNext = document.querySelector('.button-next');
const buttonNextNext = document.querySelector('.button-next-next');

buttonOne.classList.add('checked');
buttonNext.addEventListener('click', buttonNextClicked);
buttonNextNext.addEventListener('click', buttonEndClicked);

const buttonsNum = document.querySelectorAll('.button-num');
buttonsNum.forEach((buttonNum) => { buttonNum.addEventListener('click', buttonNumClicked); });
checkDisable();


/**
 * Проверка, находится ли пользователь на первой или последней странице (если да, то соответствующие кнопки блокируются).
 */
function checkDisable() {
    if (buttonOne.textContent === '1' && buttonOne.classList.contains('checked')) {
        buttonPrevPrev.disabled = true;
        buttonPrev.disabled = true;
        buttonOne.disabled = true;
    } else {
        buttonPrevPrev.disabled = false;
        buttonPrev.disabled = false;
        buttonOne.disabled = false;
    }

    if (buttonThree.textContent === '20' && buttonThree.classList.contains('checked')) {
        buttonNextNext.disabled = true;
        buttonNext.disabled = true;
        buttonThree.disabled = true;
    } else {
        buttonNextNext.disabled = false;
        buttonNext.disabled = false;
        buttonThree.disabled = false;
    }
    readValues();
}

/**
 * Обработчик события нажатия кнопки ">".
 */
function buttonNextClicked() {
    // Добавляем обработчики на кнопки "назад".
    buttonPrev.addEventListener('click', buttonPrevClicked);
    buttonPrevPrev.addEventListener('click', buttonStartClicked);
    let buttonTwoText = Number(buttonTwo.textContent);
    let buttonThreeText = Number(buttonThree.textContent);

    if (buttonOne.classList.contains('checked')) { // Если до этого была нажата 1 кнопка, то меняем на 2.
        buttonOne.classList.remove('checked');
        buttonTwo.classList.add('checked');
    } else if (buttonTwo.classList.contains('checked')) { // Если до этого была нажата 2 кнопка, то сдвигаем номера страниц на 1.
        if (buttonThreeText != 20) {
            buttonOne.textContent = buttonTwoText;
            buttonTwo.textContent = buttonTwoText + 1;
            buttonThree.textContent = buttonTwoText + 2;
        }
        else { // Если была нажата предпоследняя страница, то меняем ее на последнюю.
            buttonThree.classList.add('checked');
            buttonTwo.classList.remove('checked');
        }
    } else { // Если до этого была нажата 3 кнопка, то сдвигаем номера страниц и меняем нажатую кнопку на 2.
        buttonThree.classList.remove('checked');
        buttonTwo.classList.add('checked');
        buttonOne.textContent = buttonThreeText - 1;
        buttonTwo.textContent = buttonThreeText;
        buttonThree.textContent = buttonThreeText + 1;
    }
    checkDisable(); // Проверяем, не надо ли заблокировать кнопки.
}

/**
 * Обработчик события нажатия кнопки "<" (Аналогично).
 */
function buttonPrevClicked() {
    let buttonOneText = Number(buttonOne.textContent);
    let buttonTwoText = Number(buttonTwo.textContent);
    buttonNext.addEventListener('click', buttonNextClicked);
    if (buttonOne.classList.contains('checked')) {
        buttonOne.classList.add('checked');
        buttonTwo.classList.remove('checked');
        buttonOne.textContent = buttonOneText - 1;
        buttonTwo.textContent = buttonOneText;
        buttonThree.textContent = buttonOneText + 1;
    } else if (buttonTwo.classList.contains('checked')) {
        if (buttonOneText != 1) {
            buttonOne.textContent = buttonTwoText - 2;
            buttonTwo.textContent = buttonTwoText - 1;
            buttonThree.textContent = buttonTwoText;
        }
        else {
            buttonOne.classList.add('checked');
            buttonTwo.classList.remove('checked');
        }
    } else {
        buttonThree.classList.remove('checked');
        buttonTwo.classList.add('checked');
    }
    checkDisable();
}

/**
 * Обработчик события нажатия кнопки "<<".
 * Меняем номера страниц и делаем первую страницу нажатой.
 */
function buttonStartClicked() {
    buttonOne.classList.add('checked');
    buttonTwo.classList.remove('checked');
    buttonThree.classList.remove('checked');
    buttonOne.textContent = 1;
    buttonTwo.textContent = 2;
    buttonThree.textContent = 3;
    checkDisable();
}

/**
 * Обработчик события нажатия кнопки ">>".
 * Меняем номера страниц и делаем последнюю страницу нажатой.
 */
function buttonEndClicked() {
    buttonPrev.addEventListener('click', buttonPrevClicked);
    buttonPrevPrev.addEventListener('click', buttonStartClicked);
    buttonThree.classList.add('checked');
    buttonTwo.classList.remove('checked');
    buttonOne.classList.remove('checked');
    buttonOne.textContent = 18;
    buttonTwo.textContent = 19;
    buttonThree.textContent = 20;
    checkDisable();
}

/**
 * Обработчик события нажатия кнопки с номером страницы.
 * Меняем нажатую кнопку.
 */
function buttonNumClicked() {
    buttonPrev.addEventListener('click', buttonPrevClicked);
    buttonPrevPrev.addEventListener('click', buttonStartClicked);
    buttonsNum.forEach((buttonNum) => { buttonNum.classList.remove('checked'); });
    this.classList.add('checked');
    checkDisable();
}

/**
 * Заполнение таблицы значениями.
 *
 * @param {Object[]} array - Переданный массив с объектами данных.
 */
function addValuesToTable(array) {
    const tBody = document.querySelector('tbody');

    let buttonChecked = document.querySelector('.checked');
    pageNumber = Number(buttonChecked.textContent); // Навешиваем обработчик на заголовки.

    const trArray = document.querySelectorAll('.tr-column');
    trArray.forEach((tr) => { tr.remove(); }); // Удаляем предыдущие значения со страницы.
    // Заполняем таблицу новыми значениями.
    for (let i = (pageNumber - 1) * 50; i < pageNumber * 50; i++) {
        let tr = document.createElement('tr');
        tr.classList.add('tr-column');
        let tdID = document.createElement('td');
        tdID.textContent = i + 1;
        let tdFN = document.createElement('td');
        tdFN.textContent = array[i].fname;
        let tdLN = document.createElement('td');
        tdLN.textContent = array[i].lname;
        let tdTel = document.createElement('td');
        tdTel.textContent = array[i].tel;
        let tdAddress = document.createElement('td');
        tdAddress.textContent = array[i].address;
        let tdCity = document.createElement('td');
        tdCity.textContent = array[i].city;
        let tdState = document.createElement('td');
        tdState.textContent = array[i].state;
        let tdZIP = document.createElement('td');
        tdZIP.textContent = array[i].zip;

        tr.appendChild(tdID);
        tr.appendChild(tdFN);
        tr.appendChild(tdLN);
        tr.appendChild(tdTel);
        tr.appendChild(tdAddress);
        tr.appendChild(tdCity);
        tr.appendChild(tdState);
        tr.appendChild(tdZIP);

        tBody.appendChild(tr);
    }
}

// Фильтрация таблицы по столбцам.
const table = document.querySelector('table');
const headers = document.querySelectorAll('.header');
let isAscending = true; // Направление сортировки (по возрастанию\по убыванию).

headers.forEach(header => {
    header.addEventListener('click', () => {
        const columnIndex = header.cellIndex;
        const rows = Array.from(table.tBodies[0].rows);
        rows.sort((rowA, rowB) => {
            if (columnIndex === 3) { // Если столбец Phone number, то убираем лишние знаки и сортируем по числу.
                let cellA = Number((rowA.cells[columnIndex].textContent).replace(/[\(\)\-]/g, ''));
                let cellB = Number((rowB.cells[columnIndex].textContent).replace(/[\(\)\-]/g, ''));
                return isAscending ? cellA - cellB : cellB - cellA;
            }
            if (columnIndex === 0 || columnIndex === 7) { // Если столбец ID или ZIP, то сортируем по числу.
                let cellA = Number(rowA.cells[columnIndex].textContent);
                let cellB = Number(rowB.cells[columnIndex].textContent);
                return isAscending ? cellA - cellB : cellB - cellA;
            }
            let cellA = rowA.cells[columnIndex].textContent;
            let cellB = rowB.cells[columnIndex].textContent;
            if (columnIndex === 4) { // Если столбец Address, то убираем цифры и сортируем по строке.
                cellA = cellA.replace(/[\d]/g, '');
                cellB = cellB.replace(/[\d]/g, '');
            }
            // Остальные столбцы сортируем по строке.
            return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        });


        table.tBodies[0].append(...rows);
        isAscending = !isAscending;
    });
});

/**
* Запрос на чтение данных.
*/
function readValues() {
    fetch('http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true')
        .then(response => response.json())
        .then(data => {
            addValuesToTable(data);
        })
        .catch(error => {
            console.error(error);
        });
}

readValues();