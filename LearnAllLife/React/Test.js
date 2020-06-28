import React from 'react';
import options from '../../webpack.production.config';

export default () => {
    return (
        <div>test</div>
    );
}

//
console.log(options);


function deepClone(target) {
    if(target === null) return null;
    if(target instanceof Date) return new Date(target);
    if(target instanceof RegExp) return new RegExp(target);
    if(typeof target !== 'object') return target;

    const obj = Array.isArray(target) ? [] : {};

    for(var key in target) {
        const value = target[key];
        obj[key] = deepClone(value);
    }

    return obj;
}

function inherits(subClass, superClass) {
    function Inner() {}
    Inner.prototype = superClass.prototype;
    subClass.prototype = new Inner();
    subClass.prototype.constructor = subClass;

    Inner = null;
}


Function.prototype.myCall = function(context, ...args) {
    context = context || window;

    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.myBind = function(context, ...args) {
    context = context || window;
    const fn = this;
    return function F(...args1) {
        if(fn instanceof F) {
            return new fn(...args, ...args1);
        }
        return fn.call(context, ...args, ...args1);
    }
};

function curry(fn, ...args1) {
    const fnLength = fn.length;
    const firstArgLength = args1.length;

    return function(...args2) {
        const self = this;
        const allArgLength = firstArgLength + args2.length;
        if(fnLength <= allArgLength) {
            return fn.call(self, ...args1, ...args2);
        } else {
            const arg = [...args1, ...args2];
            return curry(fn, ...arg);
        }
    }
}

