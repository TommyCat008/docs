/*
 * @Author: 汤米猫 
 * @Date: 2020-06-08 11:28:33 
 * @Last Modified by: 汤米猫
 * @Last Modified time: 2020-06-08 12:45:37
 */

// 继续完善，支持异步功能
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

MyPromise.prototype.then = function(fn1, fn2) {
    fn1 = typeof fn1 === 'function' ? fn1 : function(v) {
        return v;
    }
    fn2 = typeof fn2 === 'function' ? fn2 : function(r) {
        return r;
    }
    if (this.status === 'fulfilled') {
        fn1(this.value);
    }
    if (this.status === 'rejected') {
        fn2(this.failReason);
    }
    if (this.status === 'pending') {
        this.onResolvedCallbacks.push(() => {
            fn1(this.value);
        });
        this.onRejectedCallbacks.push(() => {
            fn2(this.failReason);
        });
    }
}

const myPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(123)
    }, 1000)
}).then(data => {
    console.log('data', data)
})