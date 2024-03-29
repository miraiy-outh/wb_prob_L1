/**
 * Проверка строки на палиндром.
 *
 * @param {string} str - Переданная строка.
 * @return {boolean} - Результат проверки.
 */
function isPalindrom(str) {
    // Убираем знаки препинания и пробелы, приводим к нижнему регистру.
    let strFiltered = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g, '').replace(/\s+/g, '').toLowerCase();
    let middle = Math.floor(strFiltered.length / 2);

    // Начальные значения для проверки в цикле.
    let leftLetter = '';
    let rightLetter = '';
    let i = 0;

    // Пробегаем по строке с 2 сторон, пока не дойдем до середины строки или не встретим различие.
    while (i < middle && leftLetter === rightLetter) {
        leftLetter = strFiltered[i];
        rightLetter = strFiltered[strFiltered.length - i - 1];
        i++;
    }

    // Если дошли до середины, значит слово - палиндром.
    if (i === middle) return true;
    return false;
}

let str1 = 'madam';
let str2 = "Nora. Omar. Ramo. Aron";
let str3 = "- Madam, I'm Adam.";
let str4 = "аргентина манит негра";
let str5 = 'abccba';
let str6 = "клубника";

console.log(isPalindrom(str1), str1); // true
console.log(isPalindrom(str2), str2); // true
console.log(isPalindrom(str3), str3); // true
console.log(isPalindrom(str4), str4); // true
console.log(isPalindrom(str5), str5); // true
console.log(isPalindrom(str6), str6); // false