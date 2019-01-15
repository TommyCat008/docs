### 1、ES 2015 Classes 

JSDoc3 描述一个遵循 ECMAScript 2015规范的类是很简单的。你并不需要使用诸如如@class 和 @constructor的标签来描述 ES 2015 classes，JSDoc通过分析你的代码会自动识别类和它们的构造函数。ES 2015 classes在JSDoc3.4.0及更高版本支持。

举个栗子：
下面的例子解释了如何注释class中的构造函数和实例方法：(官网示例)

```
/** Class representing a point. */
class Point {
    /**
     * Create a point.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        // ...
    }

    /**
     * Get the x value.
     * @return {number} The x value.
     */
    getX() {
        // ...
        return X;
    }

    /**
     * Get the y value.
     * @return {number} The y value.
     */
    getY() {
        // ...
        return Y;
    }
}
```

### 2、ES 2015 Modules

当你描述一个 ES 2015 module（模块）时，您将使用@module 标签来描述模块的标识符。例如，如果用户通过调用import * as myShirt from 'my/shirt' 加载模块，你会写一个包含@module my/shirt标签的JSDoc注释。

同样，模块中每个成员的namepath （名称路径）将以module: 开始：，后面跟模块名字。例如，如果你的my/pants模块输出一个Jeans类，并且Jeans 有一个名为hem的实例方法，那么这个实例方法longname（长名称）是module:my/pants.Jeans#hem。


```
/** @module color/mixer */

/** The name of the module. */
export const name = 'mixer';

/** The most recent blended color. */
export var lastColor = null;

/**
 * Blend two colors together.
 * @param {string} color1 - The first color, in hexidecimal format.
 * @param {string} color2 - The second color, in hexidecimal format.
 * @return {string} The blended color.
 */
export function blend(color1, color2) {}

// convert color to array of RGB values (0-255)
function rgbify(color) {}

export {
    /**
     * Get the red, green, and blue values of a color.
     * @function
     * @param {string} color - A color, in hexidecimal format.
     * @returns {Array.<number>} An array of the red, green, and blue values,
     * each ranging from 0 to 255.
     */
    rgbify as toRgb
}
```

### 3、块标签

按照字母的排列顺序抽取合适的注释标签

1. @Callback描述一个回调函数。@Callback标签提供回调函数（可传递给其他函数）的描述，包括回调的参数和返回值。

```
/**
 * @class
 */
function Requester() {}

/**
 * Send a request.
 * @param {Requester~requestCallback} cb - The callback that handles the response.
 */
Requester.prototype.send = function(cb) {
    // code
};

/**
 * This callback is displayed as part of the Requester class.
 * @callback Requester~requestCallback
 * @param {number} responseCode
 * @param {string} responseMessage
 */
```


2. @param标签提供了对某个函数的参数的各项说明，包括参数名、参数数据类型、描述等。

@param标签要求您指定要描述参数的名称。您还可以包含参数的数据类型，使用大括号括起来，和参数的描述。


```
只注释变量名称
/**
 * @param somebody
 */

注释变量名 和 变量类型
/**
 * @param {string} somebody
 */

注释变量名 、 变量类型 和 变量说明
/**
 * @param {string} somebody Somebody's name.
 */
 
你可以在变量说明前加个连字符，使之更加容易阅读
/**
 * @param {string} somebody - Somebody's name.
 */
 
如果参数是一个对象，有特定的属性，您可以通过@param标签提供额外的属性。例如，假如employee参数有name和department属性，您可以按以下方式描述。
/**
 * Assign the project to an employee.
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {string} employee.name - The name of the employee.
 * @param {string} employee.department - The employee's department.
 */
```

3. @private标签标记标识符为私有，或者不昨一般用途使用。私有成员不会在生成文档中输出任何内容，除非JSDoc使用 -p/--private 命令行选项运行。在JSDoc3.3.0或更高版本中，您还可以使用 -a/--access 命令行选项来改变这种行为。

在下面的例子中，Documents和Documents.Newspaper会被输出到生成的文档中，但是Documents.Diary不会。

```
/** @namespace */
var Documents = {
    /**
     * An ordinary newspaper.
     */
    Newspaper: 1,
    /**
     * My diary.
     * @private
     */
    Diary: 2
};
```
4. @todo标签可以让你记录要完成的任务。在一个JSDoc注释块中您可以包含多个@todo标签。
```
/**
 * @todo Write the documentation.
 * @todo Implement this function.
 */
function foo() {
    // write me
}
```
5. @returns 标签描述一个函数的返回值。语法和@param类似。
```
返回值的类型
/**
 * Returns the sum of a and b
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function sum(a, b) {
    return a + b;
}

返回值的类型和描述

/**
 * Returns the sum of a and b
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} Sum of a and b
 */
function sum(a, b) {
    return a + b;
}

返回值可以有不同的类型

/**
 * Returns the sum of a and b
 * @param {Number} a
 * @param {Number} b
 * @param {Boolean} retArr If set to true, the function will return an array
 * @returns {Number|Array} Sum of a and b or an array that contains a, b and the sum of a and b.
 */
function sum(a, b, retArr) {
    if (retArr) {
        return [a, b, a + b];
    }
    return a + b;
}
```

### 4、针对freedoX的源码进行注释

1、使用@constructor可以标识一个函数是构造函数
2、使用@description可以在代码提示时显示被描述变量或者函数的描述信息。
3、@example 示例内容
4、使用@return可以描述一个对象的属性

### 总结

通过浏览JSDoc文档能学到很多的注释标签，但实际上用到的标签不是特别的多，大致常用的也就是@param、@returns、@private、@description这些标签。还有就是对于模块化开发的现状，要知道对classes类和构造函数如何去注释才能生成有效的文档。

### 写法规范统一

1、@param 编写数据类型，写法第一个首字母是大写。例如字符串类型---String、对象类型---Object。一个正确的数据类型注释应该如下：
组成部分，类型、名称、解释说明

如果是参数是可选择的，需要加一个[]来进行区分。
```
/**
 * 大致的参数类型注释方法
 * @param {Number} 变量名 详细解释
 * @param {Boolean} 参数名 布尔值
 * @param {String} 变量名 详细解释
 * @param {Array} 数组名 详细解释
 * @param {Function} 函数名 详细解释
 * @param {Object} 对象名 详细解释
 * @param {Array} Object.array 详细解释
 * @param {String} Object.string 详细解释
 */
```

2、@return返回结果，需要详细叙述一下返回的内容。对于之前提出的需求：关于复杂的返回值怎么去表示？
关于return暂时无法提供类似于param的拆分写法，所以需要注释者在写返回注释的时候详细写一下返回的内容解释。或者直接return所写的类。

3、@private 在注释代码的时候如果是希望注释不被生成到Doc中，需要在注释上添加@private标识符来屏蔽注释。私有成员函数可以使用此方法来进行注释。

4、如果开发中需要继续完善和需求需要跟进的情况下，以如下的写法：

```
// TODO(责任人) 详细的需求或者改进的方式或者是禅道上bug的编号 by TODO写入着 日期
```

5、回调函数的写法
在
```
/**
 * 这个描述指的是全局的回调，直接用requestCallback来标识即可
 * @param {data} data 传参对象
 * @param {requestCallback} callback 事件请求完成后回调函数
 */
userLoginAsync(data, callback) {
    ...
    ...
}
```
6、@type 后面不接详细

7、应该先写详细文字注释，然后再写标签，否则会报错。

8、详细的注释，一个完整的文件注释。
```
import "./FdBackWidget.css";
import {
    FdMisc
} from "../../misc/FdMisc";

/**
 * 返回操作的widget
 * @param {Object} controller 传入控制器对象
 */
class FdBackWidget {
    constructor(controller) {
        this._controller = controller;
        let ele_ui = document.createElement("div");
        let id = "fd_back_" + Date.now();
        FdMisc.hiddenContainer().appendChild(ele_ui);
        this.ui = ele_ui;
        ele_ui.innerHTML = `
        <div id="${id}" v-show="elementVisiable">
            <div class="FD-top-container" @click="popSidebarStatus()">
                <span class="FD-back">
                    <i class="fa fa-angle-left"></i> 返回</span>
            </div>
        </div>
        `;
        this._freedoUI = new Vue({
            el: "#" + id,
            data: {
                elementVisiable: true,
            },
            methods: {
                popSidebarStatus: function () {
                    controller.sidebarStatusController.popSidebarStatus();
                }
            },
        });
    }
    /**
     * 设置当前widget的显隐
     * @private
     * @return {String} 返回一个字符串 
     */
    _infoMessage() {
        return '我是内部成员函数';
    }
    /**
     * 设置当前widget的显隐
     * @param {Bollean} boolean 传入的布尔值 true：显示、false：隐藏
     */
    setElementVisiable(boolean) {
        this._freedoUI.elementVisiable = boolean;
    }
}

export {
    FdBackWidget
};
```