const book = {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    getTitle() { return this.title; },
    setTitle(title) { this.title = title; },
    getAuthor() { return this.author; },
    setAuthor(author) { this.author = author; },
    getYear() { return this.year; },
    setYear(year) { this.year = year; },
}

console.log(book.getTitle(), book.getAuthor(), book.getYear());
book.setTitle('Nineteen Eighty-Four');
book.setAuthor('George Orwell');
book.setYear(1949);
console.log(book.getTitle(), book.getAuthor(), book.getYear());