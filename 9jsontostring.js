/**
* Функция вызова функций из массива с выводом массива результатов работы этих функций.
* 
* @param {Function[]} functions - Массив функций.
* @return {number[]} - Массив результатов работы функций.
*/
function convertJsonToString(obj) {
    // Проверяем тип obj.
    if (obj === null) return 'null';

    if (typeof obj === 'string') return `"${obj}"`;

    if (typeof obj === 'number' || typeof obj === 'boolean') return obj.toString();

    // Если obj - массив, то рекурсивно вызываем функцию для каждого значения массива.
    if (Array.isArray(obj)) {
        const arrayValues = obj.map((value) => convertJsonToString(value));
        return `[${arrayValues.join(',')}]`;
    }

    // Если obj - объект, то находим ключи, и для каждого значения по ключу рекурсивно вызываем функцию.
    if (typeof obj === 'object') {
        const objectKeys = Object.keys(obj);
        const objectValues = objectKeys.map((key) => {
            const value = obj[key];
            return `"${key}":${convertJsonToString(value)}`;
        });
        return `{${objectValues.join(',')}}`;
    }

    return undefined;
}

const obj = {
    name: 'John',
    age: 30,
    next: {
        name: 'Mary',
        age: 20,
        work: [true, false, false, true],
        next: {
            name: 'Roma',
            age: 40
        }
    }
};

const jsonString = convertJsonToString(obj);

console.log('Результат выполнения функции:        ', jsonString);

console.log('Результат выполнения JSON.stringify: ', JSON.stringify(obj));