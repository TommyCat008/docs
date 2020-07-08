"use strict";
// Web 必须实现Person和Animal这两个接口
var Web = /** @class */ (function () {
    function Web(name) {
        this.name = name;
    }
    Web.prototype.eat = function () {
        console.log(this.name + '喜欢吃');
    };
    Web.prototype.work = function () {
        console.log(this.name + '在工作');
    };
    return Web;
}());
