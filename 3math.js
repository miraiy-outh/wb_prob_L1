
const MathX = (function () {
    const fibRow = []; // Массив, хранящий в себе вычисленные числа Фибоначчи.
    const primeRow = [2, 3]; // Массив, хранящий в себе вычисленные простые числа.

    /**
     * Подсчет n-го числа Фибоначчи.
     *
    * @param {number} n - Переданный номер.
    * @return {number} - n-е число Фибоначчи.
    */
    function calcFib(n) {
        if (n <= 1) return n;
        // Если в массиве чисел Фибоначчи уже есть вычисленное значение, то возвращаем его, иначе - вычисляем.
        if (fibRow[n]) return fibRow[n];

        fibRow[n] = calcFib(n - 1) + calcFib(n - 2);
        return fibRow[n];
    }

    /**
     * Подсчет всех чисел Фибоначчи до n-го.
     *
    * @param {number} n - Переданный номер.
    * @return {number[]} - Массив чисел Фибоначчи до n-го.
    */
    function getFibonacciAll(n) {
        if (n <= 0) return undefined;

        let result = [];
        for (let i = 0; i <= n; i++) {
            result.push(calcFib(i));
        }
        return result;
    }

    /**
     * Получение n-го числа Фибоначчи.
     *
    * @param {number} n - Переданный номер.
    * @return {number[]} - n-е число Фибоначчи.
    */
    function getFibonacci(n) {
        if (n <= 0) return undefined;

        return calcFib(n);
    }

    /**
    * Проверка на простое число.
    *
    * @param {number} num - Переданное число.
    * @return {boolean} - Результат проверки.
    */
    function isPrime(num) {
        // Исключаем из проверки 1 и 2.
        if (num === 1) return false;
        if (num === 2) return true;

        /* Если число N равно произведению двух других, то одно из них не больше корня из N, а другое не меньше корня из N.
           Поэтому после этого значения нет смысла искать делители. */
        let sqrtNum = Math.floor(Math.sqrt(num));

        for (let i = 2; i < sqrtNum + 1; i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    /**
    * Получение всех простых чисел до n-го.
    *
    * @param {number} n - Переданный номер.
    * @return {number[]} - Массив простых чисел до n-го.
    */
    function getPrimeAll(n) {
        if (n < 1) return null;

        // Находим следующее нечетное число за последним в массиве простых чисел.
        let maybePrime = primeRow[primeRow.length - 1] + 2;

        // Добавляем простые числа в массив, пока не дойдем до n-го простого числа.
        while (primeRow.length < n) {
            if (isPrime(maybePrime)) primeRow.push(maybePrime);

            maybePrime += 2;
        }

        // если длина массива простых чисел больше n, выводим только часть массива до n.
        if (primeRow.length > n) return primeTmp = primeRow.slice(0, n);

        return primeRow;
    }

    // Функция для получения N-го простого числа.
    function getPrime(n) {
        if (n <= 1) return null;

        const primes = getPrimeAll(n);
        return primes[n - 1];
    }

    return { getFibonacciAll, getFibonacci, getPrimeAll, getPrime };
})();

console.log('20 чисел Фибоначчи:\n', MathX.getFibonacciAll(20));
console.log('9 чисел Фибоначчи:\n', MathX.getFibonacciAll(9));
console.log('10-е число Фибоначчи:\n', MathX.getFibonacci(10));
console.log('20 простых чисел:\n', MathX.getPrimeAll(20));
console.log('5 простых чисел:\n', MathX.getPrimeAll(5));
console.log('10-е простое число:\n', MathX.getPrime(10));