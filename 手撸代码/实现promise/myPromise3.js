/*
 * @Author: 汤米猫 
 * @Date: 2020-06-08 11:28:33 
 * @Last Modified by: 汤米猫
 * @Last Modified time: 2020-06-08 14:17:39
 */

// 继续完善，支持链式调用
function MyPromise(executor) {
    // 状态
    this.status = 'pending'; // pending, fulfilled, rejected

    // 成功的结果值
    this.value = null;

    // 失败的原因
    this.failReason = undefined;

    // 收集then函数的列表
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
        if (this.status === 'pending') {
            this.status = 'fulfilled';
            this.value = value;
            this.onResolvedCallbacks.forEach(fn => {
                fn();
            })
        }
    }

    const reject = error => {
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.failReason = error;
            this.onRejectedCallbacks.forEach(fn => {
                fn();
            })
        }
    }

    // 立即执行函数
    executor(resolve, reject)
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    let self = this;
    let promise2 = new MyPromise(function(resolve, reject) {
        if (self.status === 'fulfilled') {
            try {
                let x = onFulfilled(self.value);
                resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
                reject(error);
            }
        }
        if (self.status === 'rejected') {
            try {
                let x = onRejected(self.failReason);
                resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
                reject(error);
            }
        }
        if (self.status === 'pending') {
            self.onResolvedCallbacks.push(() => {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            })
            self.onRejectedCallbacks.push(() => {
                try {
                    let x = onRejected(self.failReason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            })
        }
    })
    return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
    // 为了防止循环引用
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'));
    }

    // 如果x是promise
    if (x instanceof Promise) {
        x.then(data => {
            resolve(data)
        }, e => {
            reject(e)
        })
        return;
    }

    // x 是object或者书function
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        // 拿x.then可能会报错
        try {
            // 先拿到 x.then
            var then = x.then;
            var called
            if (typeof then === 'function') {
                // 这里的写法，是 then.call(this, fn1, fn2)
                then.call(x, (y) => {
                    // called 是干什么用的呢？
                    // 有一些 promise 实现的不是很规范，瞎搞的，比如说，fn1, fn2 本应执行一个，
                    // 但是有些then实现里面，fn1, fn2都会执行
                    // 为了 fn1 和 fn2 只能调用一个, 设置一个 called 标志位
                    if (called) {
                        return;
                    }
                    called = true;
                    return resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (called) {
                        return;
                    }
                    called = true;
                    return reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) {
                return;
            }
            return reject(e);
        }
    } else {
        resolve(x)
    }
}

const myPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        console.log(1)
        resolve(1)
    }, 1000)
}).then(data => {
    let res2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            console.log(2)
            resolve('end')
        }, 1000)
    })
    return res2
}).then(data => {
    console.log('data2', data)
})