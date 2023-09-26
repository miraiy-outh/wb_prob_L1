/**
* Быстрая сортировка. 
* Алгоритм состоит в выборе опорного элемента, его сравнении с остальными и разделении на 2 части - меньше и больше опорного элемента.
* Лучшее время: O(n).
* Среднее время: O(n log n).
* Худшее время: O(n^2).
* 
* @param {Object[]} array - Массив объектов сотрудников.
* @return {Object[]} - Отсортированный массив.
*/
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    // Выбор опорного элемента для разделения массива на 2 части.
    const pivot = array[Math.floor(array.length / 2)];

    // Массивы для элементов < и >= опорному элементу.
    const left = [];
    const right = [];

    // Проходимся по всему массиву и разделяем элементы по 2 массивам.
    for (let i = 0; i < array.length; i++) {
        if (i === Math.floor(array.length / 2)) continue;

        // К проверке возраста добавляем еще проверку имени, если возраст совпадает.
        if (array[i].age < pivot.age || (array[i].age === pivot.age && array[i].name < pivot.name)) left.push(array[i]);
        else right.push(array[i]);
    }

    // Рекурсивно вызываем функцию quickSort для обеих частей массива и объединяем результаты вместе с опорным элементом между ними.
    return [...quickSort(left), pivot, ...quickSort(right)];
}

const people = [
    { name: "Andrew", age: 25 },
    { name: "Maria", age: 30 },
    { name: "Ivan", age: 20 },
    { name: "Natalie", age: 25 },
    { name: "Sergey", age: 35 },
    { name: "Alexandra", age: 30 },
    { name: "Dmitry", age: 25 },
    { name: "Elena", age: 20 },
    { name: "Peter", age: 35 },
    { name: "Olga", age: 25 },
    { name: "Gregory", age: 30 },
    { name: "Tatiana", age: 20 },
    { name: "Alexey", age: 35 },
    { name: "Ekaterina", age: 25 },
    { name: "Vladimir", age: 30 },
    { name: "Sophia", age: 20 },
    { name: "Michael", age: 35 },
    { name: "Julia", age: 25 },
    { name: "Anastasia", age: 30 },
    { name: "Constantine", age: 20 },
    { name: "Jacob", age: 27 },
    { name: "Emily", age: 32 },
    { name: "Mason", age: 22 },
    { name: "Madison", age: 27 },
    { name: "William", age: 37 },
    { name: "Ava", age: 32 },
    { name: "Ethan", age: 27 },
    { name: "Emma", age: 22 },
    { name: "James", age: 37 },
    { name: "Ethan", age: 27 },
    { name: "Benjamin", age: 32 },
    { name: "Mia", age: 23 },
    { name: "Lucas", age: 37 },
    { name: "Isabella", age: 28 },
    { name: "Alexander", age: 33 },
    { name: "Charlotte", age: 23 },
    { name: "Daniel", age: 38 },
    { name: "Amelia", age: 28 },
    { name: "Matthew", age: 33 },
    { name: "Chloe", age: 24 },
    { name: "Henry", age: 38 },
    { name: "Avery", age: 28 },
    { name: "Ryan", age: 33 },
    { name: "Evelyn", age: 24 },
    { name: "Owen", age: 38 },
    { name: "Abigail", age: 29 },
    { name: "Liam", age: 34 },
    { name: "Elizabeth", age: 24 },
    { name: "Nicholas", age: 39 },
    { name: "Harper", age: 29 },
    { name: "Samuel", age: 34 },
    { name: "Grace", age: 25 },
    { name: "Joseph", age: 39 },
    { name: "Ella", age: 29 },
];

console.log(quickSort(people));