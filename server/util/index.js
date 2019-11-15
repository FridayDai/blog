export const invariant = (...args) => {
    let flag = false;
    for(let i = 0; i < [...args].length; i++) {
        const item = [...args][i];
        if(item === null || item === undefined || !item) {
            flag = true;
            throw new Error('args is null');
            break;
        }
    }
    return flag;
};

export const whitchType = (data) => {
    const type = Object.prototype.toString.call(data);
    switch (type) {
        case '[object Null]':
            return 'Null';
        case '[object Undefined]':
            return 'Undefined';
        case '[object Number]':
            return 'Number';
        case '[object Boolean]':
            return 'Boolean';
        case '[object String]':
            return 'String';
        case '[object Object]':
            return 'Object';
        case '[object Symbol]':
            return 'Symbol';
        case '[object Array]':
            return 'Array';
        case '[object Function]':
            return 'Function';
        case '[object Date]':
            return 'Date';
        case '[object Math]':
            return 'Math';
        default:
            return '';
    }
};
