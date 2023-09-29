let maxStackSize = 0;

function recursiveFunction() {
    maxStackSize++;
    recursiveFunction();
}

try {
    recursiveFunction();
} catch (e) {
    console.log("Максимальная глубина коллстэка: " + maxStackSize);
}

// Google Chrome: 13948
// Firefox: 31926
// Microsoft Edge: 13967
// Яндекс: 13952