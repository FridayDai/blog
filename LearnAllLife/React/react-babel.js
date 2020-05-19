const getData = (a) => new Promise(resolve => {
    setTimeout(() => resolve(a), 1000);
});

function* gen() {
    const data = yield getData('data1');
    const data2 = yield getData('data2');
    return data2;
}

function asyncToGenerator(generatorFunc) {
    return function() {
        const gen = generatorFunc.apply(this, arguments)
        return new Promise((resolve, reject) => {
            function step(key, arg) {
                let generatorResult
                try {
                    generatorResult = gen[key](arg)
                } catch (error) {
                    return reject(error)
                }
                const { value, done } = generatorResult
                if (done) {
                    return resolve(value)
                } else {
                    return Promise.resolve(value)
                        .then(val => step('next', val),
                                err => step('throw', err))
                }
            }
            step("next")
        })
    }
}
asyncToGenerator();

// asyncToGenerator(gen)().then(data => console.log('test', data));

function Promise(excutor) {
    var self = this;
    self.onResolvedCallback = []; // Promise resolve时的回调函数集

    // 传递给Promise处理函数的resolve
    // 这里直接往实例上挂个data
    // 然后把onResolvedCallback数组里的函数依次执行一遍就可以
    function resolve(value) {
        // 注意promise的then函数需要异步执行
        setTimeout(() => {
            self.data = value;
            self.onResolvedCallback.forEach(callback => callback(value));
        })
    }

    // 执行用户传入的函数
    excutor(resolve.bind(self))
}

Promise.prototype.then = function(onResolved) {
    const self = this;
    return new Promise(resolve => {
        const func = () => {
            const result = onResolved(self.data);
            if(result instanceof Promise) {
                result.then(resolve);
            } else {
                resolve(result);
            }
        };
        self.onResolvedCallback.push(func);
    });
};

new Promise((resolve) => {
    setTimeout(() => {
        resolve(1);
    }, 500);
}).then(data => console.log(data));


function compose(...funcs) {
    return funcs.reduce((a, b) => {
        return function(...args) {
            return a(b(...args));
        }
    });
}

function test1(a) {
    console.log('test1', a);
    return a;
}
function test2(a) {
    console.log('test2', a);
    return a;
}
function test3(a) {
    console.log('test3', a);
    return a;
}

compose(test1, test2, test3)(3);


[test1, test2, test3].reduce((acc, current) => {
    return function(...args) {
        return acc(current(...args));
    }
});
