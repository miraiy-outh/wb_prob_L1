var num1 = 6;
var num2 = 28;
var num3 = 496;
var num4 = 8128;

var num5 = 1;
var num6 = 2;
var num7 = 3;
var num8 = 10;

/**
 * Проверка числа на "странность".
 * Проверяем по теореме Евклида-Эйлера - если число представимо в виде (2^(p-1) * (2^p - 1)) и (2^p - 1) - простое, то число странное.
 *
 * @param {number} num - Переданное число.
 * @return {boolean} - Результат проверки.
 */
function isStrange(num) {
    // Начальное значение степени.
    var p = 0;

    while (num % 2 === 0) {
        num = num / 2;
        p++; // Прибавляем степень для дальнейшей проверки получившегося числа.
    }

    if (num === 1) {
        return false;
    }

    if (num === 2 ** (p + 1) - 1) {
        return isPrime(num);
    }
    return false;
}

/**
 * Проверка на простое число.
 *
 * @param {number} num - Переданное число.
 * @return {boolean} - Результат проверки.
 */
function isPrime(num) {
    // Исключаем из проверки 1 и 2.
    if (num === 1) {
        return false;
    }
    if (num === 2) {
        return true;
    }
    /* Если число N равно произведению двух других, то одно из них не больше корня из N, а другое не меньше корня из N.
       Поэтому после этого значения нет смысла искать делители. */
    var sqrtNum = Math.floor(Math.sqrt(num));

    for (var i = 2; i < sqrtNum + 1; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

console.log(isStrange(num1), num1); // true
console.log(isStrange(num2), num2); // true
console.log(isStrange(num3), num3); // true
console.log(isStrange(num4), num4); // true
console.log(isStrange(num8), num8); // false

// console.log(isPrime(num5));
// console.log(isPrime(num6));
// console.log(isPrime(num7));
// console.log(isPrime(num8));