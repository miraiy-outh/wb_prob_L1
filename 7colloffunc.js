const functions = [
    () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(); // Успешное завершение работы promise.
            }, 2000);
        });
    },
    () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    },
    () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    }
];

async function runFunctions() {
    for (let i = 0; i < functions.length; i++) {
        console.log(i + 1);
        await functions[i](); // Приостановка работы runFunctions, пока не выполнится promise.
    }
}

runFunctions();