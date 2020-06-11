/*
 * @Author: 汤米猫 
 * @Date: 2020-06-08 10:53:10 
 * @Last Modified by: 汤米猫
 * @Last Modified time: 2020-06-08 11:49:26
 */


/**
 * 基本实现promise的方法
 * new MyPromise时，传递一个参数，这个参数是函数，又被称为执行器函数(executor)
 * @param {Function} executor executor是函数，它接受两个参数 resolve reject ，同时这两个参数也是函数
 */
function MyPromise(executor) {
    // 状态
    this.status = 'pending'; // pending, fulfilled, rejected

    // 成功的结果值
    this.value = null;

    // 失败的原因
    this.failReason = undefined;

    const resolve = value => {
        if (this.status === 'pending') {
            this.status = 'fulfilled';
            this.value = value;
        }
    }

    const reject = error => {
        if (this.status === 'pending') {
            this.status = 'rejected';
            this.failReason = error;
        }
    }

    // 立即执行函数
    executor(resolve, reject);
}

/**
 * 每一个promise实例都有方法 then ，then中有两个参数 ，我习惯把第一个参数叫做then的成功回调，把第二个参数叫做then的失败回调，
 * 这两个参数也都是函数，当执行器调用resolve后，then中第一个参数函数会执行。当执行器调用reject后，then中第二个参数函数会执行。
 */
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
}

// 测试使用
const myPromise = new MyPromise((resolve, reject) => {
    console.log('start');
    resolve(1);
    // 异步就无法执行，
    // setTimeout(() => {
    //     resolve(1231)
    // }, 0)
}).then(data => {
    console.log('data', data);
})

console.log('end');