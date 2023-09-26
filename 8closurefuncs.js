/**
* Функция вызова функций из массива с выводом массива результатов работы этих функций.
* 
* @param {Function[]} functions - Массив функций.
* @return {number[]} - Массив результатов работы функций.
*/
function callFunctions(functions) {
    const results = [];
    return () => {

        for (let i = 0; i < functions.length; i++) {
            const result = functions[i](); // Вызов функции из массива.
            results.push(result);
        }

        return results;
    };
}

const functions = [
    () => 1,
    () => 2,
    () => 3
];

const callAllFunctions = callFunctions(functions);
const results = callAllFunctions();

console.log(results); // [1, 2, 3]