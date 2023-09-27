function f() {
    let age = 20;

    function incrAge() {
        age += 1;
        return `age: ${age}`;
    }

    return incrAge;
}

let tmp = f();
console.log(tmp());
console.log(tmp());
console.log(tmp());
console.log(tmp());
console.log(tmp());
