const moment = require('moment');

/**
* Функция для форматирования даты в заданный формат.
* 
* @param {Date} date - Дата.
* @param {string} format - Формат даты, к которому нужно преобразовать.
* @return {string} - Результат преобразования.
*/
function formatDate(date, format) {
    return moment(date).format(format);
}

/**
* Функция для форматирования даты в заданный формат.
* 
* @param {Date} date1 - Первая дата.
* @param {Date} date2 - Первая дата.
* @param {string} type - В каком типе производить подсчет (дни, минуты и т.д.)
* @return {number} - Результат подсчета.
*/
function countDate(date1, date2, type) {
    return moment(date1).diff(moment(date2), type);
}

// Экспортируем функции.
module.exports = {
    formatDate,
    countDate
}