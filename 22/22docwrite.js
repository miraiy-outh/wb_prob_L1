let recursiveCount = 0;

function recursiveDocumentWrite() {
    recursiveCount++
    document.write(recursiveDocumentWrite(recursiveCount))
}

try {
    recursiveDocumentWrite();
} catch (e) {
    console.log("Максимальное количество вызовов document.write(): " + recursiveCount);
}

/*
* Веб-браузеры обрабатывают вызовы document.write() синхронно, поэтому вызов 
* первого document.write() будет завершен прежде, чем начнется второй.
* Каждый новый вызов будет записывать свои данные в тот момент, 
* когда он будет выполнен, т.е. текст добавляется последовательно
* в HTML-документ в том порядке, в котором вызываются функции document.write().
* Поэтому браузеры установили ограничение по вызову. Например, в Яндексе это 9659.
*/