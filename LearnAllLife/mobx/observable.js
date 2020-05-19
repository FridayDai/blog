let nowObserver = null;
let nowTarget = null;
let observerStack = [];
let targetStack = [];
let isCollecting = false;
const dependenceManager = {
    _store: {},

    trigger(id) {
        // store里面的watchers循环执行一遍
        const handler = this._store[id];
        if (handler && handler.watchers) {
            handler.watchers.forEach(item => {
                item.call(item.target || this);
            });
        }
    },
    collect(obID) {
        // 将最新的observer添加到watchers里
        if(nowObserver) {
            this._addNowObserver(obID);
        }
        return false;
    },
    _addNowObserver(obID) {
        this._store[obID] = this._store[obID] || {};
        this._store[obID].target = nowTarget;
        this._store[obID].watchers = this._store[obID].watchers || [];
        this._store[obID].watchers.push(nowObserver);
    },
    beginCollect(observer, target) {
        isCollecting = true;
        observerStack.push(observer);
        targetStack.push(target);
        nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
        nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
    },
    endCollect() {
        isCollecting = false;
        observerStack.pop();
        targetStack.pop();
        nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
        nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
    }
};

let count = 0;
class Observable {
    obID = 0;
    value = null;

    constructor(v) {
        this.obID = `ob-${++count}`;
        if(Array.isArray(v)) {
            this._wrapArrayProxy(v);
        } else {
            this.value = v;
        }
    }

    _wrapArrayProxy(v) {
        const that = this;
        this.value = new Proxy(v, {
            set(object, key, value, receiver) {
                console.log(object, key, value, receiver, 'set array');
                if(key !== 'length') {
                    dependenceManager.trigger(that.obID);
                }
                return Reflect.set(object, key, value, receiver);
            }
        });
    }

    get() {
        dependenceManager.collect(this.obID);
        return this.value;
    }

    set(v) {
        if(Array.isArray(v)) {
            this._wrapArrayProxy(v);
        } else {
            this.value = v;
        }
        dependenceManager.trigger(this.obID);
    }
}

const autorun = (handler) => {
    dependenceManager.beginCollect(handler);
    handler();
    dependenceManager.endCollect();
};

function observable(target, name, descriptor) {
    const v = descriptor.initializer.call(this);
    // todo object

    const observable = new Observable(v);

    return {
        ...descriptor,
        'get': function() {
            return observable.get();
        },
        'set': function() {
            return observable.set(v);
        }
    }
}


