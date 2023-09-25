const massive1 = ['сообщение', 'сообщения', 'сообщений'];
const massive2 = ['пользователь', 'пользователя', 'пользователей'];

const ChangeEndingModule = (function () {
    /**
    * Получение правильной формы числа в зависимости от количества.
    * Зависимость формы слова от количества:
    * если 2 последние цифры: 11-19 - мн. ч. род. падеж;
    * иначе, если последняя цифра:
    * 1 - ед. ч. им. падеж;
    * 2-4 - ед. ч. род. падеж;
    * 5-9, 0 - мн. ч. род. падеж;
    * 
    * @param {number} num - Переданное количество.
    * @param {string[]} - Массив из слов в 3 формах (ед. ч. им. падеж, ед. ч. род. падеж, мн. ч. род. падеж).
    * @return {string} - Слово в правильной форме.
    */
    function changeEnding(num, wordsMassive) {
        if (wordsMassive.length < 3) return undefined;

        if (num < 0) num = num - 2 * num; // если число отрицательное, делаем его положительным

        num = num % 100;
        if ((num >= 11 && num <= 19)) return wordsMassive[2];
        else {
            num = num % 10;
            if (num === 1) return wordsMassive[0];
            if (num >= 2 && num <= 4) return wordsMassive[1];
            if (num >= 5 || num === 0) return wordsMassive[2];
        }

        return undefined;
    }

    return { changeEnding };
})();

console.log(112, ChangeEndingModule.changeEnding(112, massive1));
console.log(-112, ChangeEndingModule.changeEnding(-112, massive1));
console.log(122, ChangeEndingModule.changeEnding(122, massive1));
console.log(12, ChangeEndingModule.changeEnding(12, massive1));
console.log(1012, ChangeEndingModule.changeEnding(1012, massive2));
console.log(1024, ChangeEndingModule.changeEnding(1024, massive2));
console.log(1026, ChangeEndingModule.changeEnding(1026, massive2));
console.log(-1026, ChangeEndingModule.changeEnding(-1026, massive2));
console.log(121, ChangeEndingModule.changeEnding(121, massive2));
