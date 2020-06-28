async function test() {
    await fetch('/tiger.jpg');
}

function _asyncToGenerator(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            var gen = fn(...args);

            const _next = (value) => {
                asyncToGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
            };

            const _throw = (err) => {
                asyncToGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
            };

            _next(undefined);
        });
    }
}

function asyncToGeneratorStep(gen, resolve, reject, _next, _throw, type, arg) {
    try {
        const info = gen[type](arg);
        if(info.done) {
            resolve(info.value);
        } else {
            Promise.resolve(value).then(_next).catch(_throw);
        }
    } catch (e) {
        reject(e);
        return;
    }
}
