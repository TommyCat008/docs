/*
 * @Author: 汤米猫 
 * @Date: 2020-06-09 09:28:07 
 * @Last Modified by: 汤米猫
 * @Last Modified time: 2020-06-09 09:32:22
 */

// test arguments
function test(num) {
    console.log(arguments)
    console.log(Array.prototype.slice.call(arguments))
}

test(12312) // { '0': 12312 }