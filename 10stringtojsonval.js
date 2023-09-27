/**
* Функция преобразования строки в JSON.
* 
* @param {string} jsonString - Массив функций.
* @return {Object||Array||string||number||boolean||null} - Результат преобразования.
*/
function customJSONParse(jsonString) {
    let index = 0; // Индекс текущего символа.
    let validate = true;

    // Функция для пропуска пробельных символов, переносов строки и табуляций.
    function skipWhitespace() {
        while (jsonString[index] === ' ' || jsonString[index] === '\n' || jsonString[index] === '\t') {
            index++;
        }
    }

    /**
    * Функция для определения типа значений в jsonString и вызова соответствующей функции для обработки.
    * 
    * @return {Function} - Нужная функция для обработки.
    */
    function parseValue() {
        skipWhitespace();
        const currentChar = jsonString[index];

        if (currentChar === '{') return parseObject();

        if (currentChar === '[') return parseArray();

        if (currentChar === '"') return parseString();

        if (currentChar === 't') return parseTrue();

        if (currentChar === 'f') return parseFalse();

        if (currentChar === 'n') return parseNull();

        return parseNumber();
    }

    /**
    * Функция для обработки объекта.
    * 
    * @return {Object} - Обработанный объект.
    */
    function parseObject() {
        index++; // Пропуск '{'.
        const obj = {};

        while (jsonString[index] !== '}') {
            skipWhitespace();
            const key = parseString();
            skipWhitespace();

            if (jsonString[index] !== ':') {
                console.error(`Ожидалось двоеточие, получено: ${jsonString[index]}`);
                validate = false;
                break;
            }

            index++; // Пропуск ':'.
            const value = parseValue();
            obj[key] = value;
            skipWhitespace();

            if (jsonString[index] === ',') {
                index++; // Пропуск ','.
            } else if (jsonString[index] !== '}') {
                console.error(`Ожидалась запятая или закрывающая фигурная скобка, получено: ${jsonString[index]}`);
                validate = false;
                break;
            }
        }

        index++; // Пропуск '}'.
        return obj;
    }

    /**
    * Функция для обработки массива.
    * 
    * @return {Array} - Обработанный массив.
    */
    function parseArray() {
        index++; // Пропуск '['.
        const arr = [];

        while (jsonString[index] !== ']') {
            skipWhitespace();
            const value = parseValue();
            arr.push(value);
            skipWhitespace();

            if (jsonString[index] === ',') {
                index++; // Пропуск ','.
            } else if (jsonString[index] !== ']') {
                console.error(`Ожидалась запятая или закрывающая квадратная скобка, получено: ${jsonString[index]}`);
                validate = false;
                break;
            }
        }

        index++; // Пропуск ']'.
        return arr;
    }

    /**
    * Функция для обработки строки.
    * 
    * @return {string} - Обработанная строка.
    */
    function parseString() {
        index++; // Пропуск открывающей '"'.
        let result = '';

        while (jsonString[index] !== '"' && index < jsonString.length) {
            if (jsonString[index] === '\\') index++; // Пропуск экранирования.

            result += jsonString[index];
            index++;
        }

        index++; // Пропуск закрывающей '"'.
        return result;
    }

    /**
    * Функция для обработки числа.
    * 
    * @return {number} - Обработанное число.
    */
    function parseNumber() {
        let start = index;

        while (/[\d.eE+-]/.test(jsonString[index]) && index < jsonString.length) {
            index++;
        }

        const numStr = jsonString.substring(start, index);
        const num = parseFloat(numStr);

        if (isNaN(num)) {
            console.error(`Неверный формат числа: ${numStr}`);
            validate = false;
        }

        return num;
    }

    // Работа с true, false и null.
    function parseTrue() {
        index += 4;
        return true;
    }

    function parseFalse() {
        index += 5;
        return false;
    }

    function parseNull() {
        index += 4;
        return null;
    }

    skipWhitespace();
    const result = parseValue();
    skipWhitespace();

    if (!validate) return 'Строка не прошла валидацию.'

    if (index !== jsonString.length) console.error(`Лишний символ: ${jsonString[index]}`);

    return result;
}

const jsonString = '{    "name":"John","age":30,"next":{"name":"Mary","age":20,"work":[true,false,false,true],"next":{"name":"Roma","age":40}}}';
const jsonString2 = '{"name:"John","age":30}'; // Без закрывающей кавычки.
const jsonString3 = '{"name":"John""age":30}'; // Без запятой.
const jsonString4 = '{"name":"John","age"30}'; // Без двоеточия.
const jsonString5 = '{"name":"John","age":30'; // Без закрывающей фигурной скобки.

const jsonStrings = [jsonString, jsonString2, jsonString3, jsonString4, jsonString5];

for (jsonStr of jsonStrings) {
    const jsonData = customJSONParse(jsonStr);
    console.log('Переданная строка:', jsonStr);
    console.log('Полученный JSON:')
    console.log(jsonData, '\n');
}
