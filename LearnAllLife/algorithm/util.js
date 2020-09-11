// 深拷贝
function deepClone(target) {
    if(!target) return target;
    if(target instanceof RegExp) return new RegExp(target);
    if(target instanceof Date) return new Date(target);

    if(typeof target !== 'object') {
        return target;
    }

    const res = Array.isArray(target) ? [] : {};

    for(const key in target) {
        const value = target[key];
        res[key] = deepClone(value);
    }
    return res;
}

function inherits(subclass, superclass) {
    function Inner() {}
    Inner.prototype = superclass.prototype;
    subclass.prototype = new Inner();
    subclass.prototype.constructor = subclass;

    Inner = null;
}

function myInstanceOf(a, b) {
    if(!a) return false;
    if(a.__proto__ === b.prototype) {
        return true;
    }

    myInstanceOf(a.__proto__, b);
}

// js new
// 1. 生成一个新对象,新对象。prototype指向构造函数的prototype 2. 将this绑定到这个对象上 3。 执行构造函数返回结果

function myNew(fn, ...args) {
    const obj = {};
    obj.prototype = fn.prototype;
    const result = fn.call(obj, ...args);

    return typeof result === 'object' ? result : obj;
}

// 防抖和节流
const debounce = (fn, wait) => {
    let timer = null;
    const cancel = () => {
        if(timer) clearTimeout(timer);
    };

    const run = (...args) => {
        cancel();
        timer = setTimeout(() => {
            fn(...args);
        }, wait);
    };

    return {
        run,
        cancel
    }
};

const throttle = (fn, wait) => {
    let timer = null;
    const cancel = () => {
        if(timer) {
            clearTimeout(timer);
        }
        timer = null;
    };

    const run = (...args) => {
        if(!timer) {
            timer = setTimeout(() => {
                fn(...args);
                timer = null;
            }, wait);
        }
    };

    return {
        run,
        cancel
    }
};

// async await, generator的语法糖，将函数封装成自执行的generator函数

Function.prototype.myBind = function(obj, ...args) {
    const fn = this;
    return function F(...args2) {
        const result = fn.call(obj, ...args, ...args2);
        if(result instanceof F) {
            return new fn(...args, ...args2);
        }

        return result;
    }
};

const curry = (fn, ...args) => {
    const fnLength = fn.length;
    const firstArgLength = args.length;

    return function(...args2) {
        const allLength = args2.length + firstArgLength;
        if(fnLength <= allLength) {
            return fn(...args, ...args2);
        } else {
            const allArgs = args.concat(args2);
            return curry(fn, ...allArgs);
        }
    }
};

function add(a, b, c) { return a+b+c; }
const curryAddOne = curry(add, 1);
curryAddOne(2,3);
curryAddOne(2);

// 1。排序算法过一遍 2。基础知识过一遍（event Loop，和大文件上传重点看下） 3。算法题继续刷

function request(index) {
    return new Promise((resolve, reject) => {
        const time = Math.random() * 3000;
        setTimeout(() => {
            if(index === 3) {
                reject({ 'status': 'fail', 'index': index, 'data': time });
            }
            resolve({ 'status': 'success', 'index': index, 'data': time });
        }, time);
    }).catch(err => err); // 这里的catch很重要，即使出错，也能继续执行下去
}

const chunks = [
    { 'index': 1, 'form': chunk },
    { 'index': 2, 'form': chunk },
    { 'index': 3, 'form': chunk },
    // ...
];

function sendRequest(chunks, max = 5) {
    return new Promise((resolve, reject) => {
        let idx = 0;
        let counter = 0;
        const len = chunks.length;
        const start = async() => {
            while(idx < len && max > 0) {
                max--;
                idx++;
                fetch('/test', { 'data': chunks[idx] })
                    .then(() => {
                        max++;
                        counter++;
                        if(counter === len) {
                            resolve();
                        } else {
                            start();
                        }
                    });
            }
        };
        start();
    });
}

async function conRequest(file) {
    const requests = [];
    for(let i = 0; i < 10; i++) {
        requests.push(request(i));
    }


    const res = await Promise.all([1,2,3,4,5,6,7,8,9,10].map((item) => request(item)))
    console.log('res:', res);
}

conRequest();

// todo 1. 巩固算法题 2。继续刷算法题，多看面筋 3。基础知识过一遍 4。英文部分
