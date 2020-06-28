
function request(index) {
    return new Promise((resolve, reject) => {
        const time = Math.random() * 3000;
        setTimeout(() => {
            if(index === 3) {
                reject({ 'status': 'fail', 'index': index, 'data': time });
            }
            resolve({ 'status': 'success', 'index': index, 'data': time });
        }, time);
    }).catch(err => err);
}

async function conRequest() {
    const res = await Promise.all([1,2,3,4,5,6,7,8,9,10].map((item) => request(item)))
    console.log('res:', res);
}


async function conRequest2() {
    const requests = [];
    for(let i = 0; i < 10; i++) {
        requests.push(request(i));
    }
    console.log(requests);

    const result = [];
    for(let req of requests) {
        result.push(await req);
    }
    console.log('result: ', result);
}

// conRequest2();



var nodesObj = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 3
        },
        right: {
            value: 4
        }
    },
    right: {
        value: 5
    }
};

function traverse(node) {
    if(!node) return;
    const queue = [];
    queue.push(node);

    while(queue.length !== 0) {
        const currentNode = queue.pop();

        currentNode.right && queue.push(currentNode.right);
        currentNode.left && queue.push(currentNode.left);

        console.log(currentNode.value);
    }
}

traverse(nodesObj);
