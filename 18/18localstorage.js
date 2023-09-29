// Проверяем доступность localStorage.
if (typeof localStorage !== 'undefined') {
    try {
        // Очищаем localStorage для корректного подсчета.
        localStorage.clear();

        // Создаем ячейку данных и массив, куда будут добавлятся ячейки.
        const data = 'a'.repeat(1024 * 1024); // 1MБ данных.
        const array = [];

        // Цикл выполняется, пока localStorage не переполнится.
        while (true) {
            array.push(data); // Добавляем ячейку данных в массив.
            localStorage.setItem('testData', array); // Записываем массив в localStorage.
        }

    } catch (e) { // Error вызывается при переполнении localStorage.
        // Смотрим, сколько памяти записано в localStorage.
        const usedSpace = Math.round(localStorage.getItem('testData').length / (1024 * 1024));
        console.error(`Максимальный размер localStorage: ${usedSpace} MБайт.`);
    }
} else {
    console.error('localStorage не поддерживается в этом браузере.');
}