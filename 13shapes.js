class Shape {
    constructor() {
        this.type = 'shape';
    }

    getArea() {
        return 0;
    }

    getPerimeter() {
        return 0;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.type = 'rectangle';
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }

    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.type = 'circle';
        this.radius = radius;
    }

    getArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }

    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
}

class Triangle extends Shape {
    constructor(side1, side2, side3) {
        super();
        this.type = 'triangle';
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    getArea() {
        if ((this.side1 + this.side2) < this.side3 || (this.side1 + this.side3) < this.side2 || (this.side2 + this.side2) < this.side3) {
            return 'Такого треугольника не существует'
        }
        const p = (this.side1 + this.side2 + this.side3) / 2; // Коэффициент для нахождения по формуле Герона.
        return Math.sqrt(p * (p - this.side1) * (p - this.side2) * (p - this.side3)); // Формула Герона.
    }

    getPerimeter() {
        if ((this.side1 + this.side2) < this.side3 || (this.side1 + this.side3) < this.side2 || (this.side2 + this.side2) < this.side3) {
            return 'Такого треугольника не существует'
        }
        return this.side1 + this.side2 + this.side3;
    }
}

const rect = new Rectangle(4, 3);
console.log('Площадь прямоугольника:', rect.getArea());
console.log('Периметр прямоугольника:', rect.getPerimeter());

const circle = new Circle(5);
console.log('Площадь круга:', circle.getArea());
console.log('Периметр круга:', circle.getPerimeter());

const tr = new Triangle(1, 10, 1);
console.log('Площадь 1 треугольника:', tr.getArea());
console.log('Периметр 1 треугольника:', tr.getPerimeter());

const tr2 = new Triangle(3, 4, 5);
console.log('Площадь 2 треугольника:', tr2.getArea());
console.log('Периметр 2 треугольника:', tr2.getPerimeter());