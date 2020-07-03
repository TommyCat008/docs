/*
 * @Author: 汤米猫 
 * @Date: 2020-06-09 09:28:07 
 * @Last Modified by: 汤米猫
 * @Last Modified time: 2020-07-03 11:34:07
 */

// arguments
function testArguments(num) {
    console.log(arguments)
    console.log(Array.prototype.slice.call(arguments))
}

testArguments(12312) // { '0': 12312 }

// 测试异步 类似Promise.all()的功能实现
async function somethingAsync(val) {
    // 此处有问题，不能直接return promise，因为没有办法处理reject的情况。因此可以在这里定义一个变量来处理失败的问题。
    return await new Promise((resolve, reject) => {
        setTimeout(() => { // 异步请求内容
            console.log(val) // console array promises val
            resolve(val)
        }, 1000)
    })
}
(async() => {
    const promises = [1, 2]
    console.log('start')
    for await (res of promises.map(val => {
        return somethingAsync(val)
    })) {
        console.log('res', res)
    }
    console.log('end')
})();