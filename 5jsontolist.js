const employees = [
    {
        "id": 1,
        "name": "John Doe",
        "title": "Software Engineer",
        "salary": 100000,
        "managerId": null
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "title": "Product Manager",
        "salary": 120000,
        "managerId": 1
    },
    {
        "id": 3,
        "name": "Bob Johnson",
        "title": "Marketing Specialist",
        "salary": 80000,
        "managerId": 2
    },
    {
        "id": 4,
        "name": "Lisa Lee",
        "title": "UX Designer",
        "salary": 90000,
        "managerId": 2
    },
    {
        "id": 5,
        "name": "Mike Brown",
        "title": "Sales Representative",
        "salary": 75000,
        "managerId": 2
    }
]
function convertJSONToList(massive) {
    if (!massive || massive.length === 0) return null;

    let list = { ...massive[0], next: null };
    let currentNode = list;
    for (let i = 1; i < massive.length; i++) {
        currentNode.next = { ...massive[i], next: null };
        currentNode = currentNode.next;
    }
    return list;
}

console.log(convertJSONToList(employees));