const nodeList = [
    { id: 2, parentId: 1 },
    { id: 1, parentId: 0 },
    { id: 3, parentId: 0 }
];

const res = [
    {
        id: 1,
        parentId: 0,
        children: [
            {
                id: 2,
                parentId: 1
            }
        ]
    },
    {
        id: 3,
        parentId: 0
    }
];

function myMap(arr, fn) {
    return arr.reduce((acc, value, index, array) => {
        return acc.concat([fn(value, index, array)]);
    }, []);
}

function myfilter(arr, fn) {
    return arr.reduce((acc, value, index, array) => {
        if(fn(value, index, array) === true) {
            console.log(acc);
            return acc.push(value);
        }
    }, []);
}

// console.log(myfilter([1,2,3,4,5], (item) => item > 2));
console.log(myMap([1,2,3,4,5], (item) => item * 2));
