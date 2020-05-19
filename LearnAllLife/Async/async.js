async function test() {
    await fetch('/tiger.jpg');
}

function _asyncToGenerator(fn) {
    return function(...args) {
        var gen = fn.apply(this, ...args);
    }
}
