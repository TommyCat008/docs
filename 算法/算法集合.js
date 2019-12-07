/**
 * 两数之和
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return [i, j];
            }
        }
    }
    return [];
};

// console.log(twoSum([-1, -2, -3, -4, -5], -8))

/**
 * 输出有序的两数
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
    let obj = new Object();
    for (let i = 0; i < numbers.length; i++) {
        obj[numbers[i]] = i;
    }
    for (let j = 0; j < numbers.length; j++) {
        if (obj.hasOwnProperty(target - numbers[j]) && j !== obj[target - numbers[j]]) {
            return [obj[target - numbers[j]], j].sort(function (a, b) { return a - b; });
        }
    }
};

// console.log(twoSum([2, 7, 11, 15], 9))

let arr = [12, 3, 3, 5, 3];

let res = arr.reduce((total, current, index) => {
    return total + current;
})

let res2 = arr.map(item => {
    return item += 1;
})

// console.log('2', res2);

/**
 * 测试对象，函数形参应该是传递的对象的引用地址
 * @param {*} obj 
 */
function test(obj) {
    obj.name = '李四';
    obj = {
        name: '王二',
        age: 23
    }
    return obj;
}

var p1 = {
    name: '张三',
    age: 32
}

var p2 = test(p1);

// console.log('p1', p1);
// console.log('p2', p2);



/**
 * 二叉搜索树求和
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function (root, k) {
    var findTargetFromHash = function (root, k, hash) {
        if (root == null) return false;

        let remainder = k - root.val;
        if (hash.hasOwnProperty(remainder)) return true;
        else hash[root.val] = true;
        console.log('left', root.left);
        console.log('right', root.right);
        return findTargetFromHash(root.left, k, hash) || findTargetFromHash(root.right, k, hash);
    }
    return findTargetFromHash(root, k, {});
};

// let BST = [5, 3, 6, 2, 4, null, 7];

// findTarget(BST, 9)
// console.log(BST.left);

/**
 * 罗马数字转换整数
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    let hashMap = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    }
    let strArr = s.split('');
    let numberArr = strArr.map(str => {
        return hashMap[str]
    })
    let sum = 0;
    // 例如出现如下的情况如何解决呢？ 'MCCMXXC'，会出现一个长串的数据
    // 解决方法，倒叙查询结果，倒叙循环查找比较两个值的大小
    for (let i = numberArr.length - 1; i > -1; i--) {
        if (i == 0) {
            sum += numberArr[i];
            continue;
        }
        sum += numberArr[i];
        if (Math.abs(numberArr[i]) > Math.abs(numberArr[i - 1])) {
            numberArr[i - 1] = -numberArr[i - 1];
        }
    }
    return sum;
};

// console.log(romanToInt('MCMXCIV'));

/**
 * 查找最大的公共前缀字符串
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (strs.length == 0) {
        return "";
    }
    for (let i = 1; i < strs.length; i++) {
        if (strs[0].length > strs[i].length) {
            strs[0] = strs[0].substring(0, strs[i].length);
        }
        for (let j = 0; j < strs[i].length; j++) {
            if (strs[0].length > j && strs[i].charAt(j) != strs[0].charAt(j)) {
                strs[0] = strs[i].substring(0, j);
            }
        }
    }
    return strs[0];
};
longestCommonPrefix(["flower", "flow", "flight"])

/**
 * 去除掉数组中的重复项，并且返回去除之后的长度
 */
var removeDuplicates = function (nums) {
    let currentVal = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (currentVal == nums[i]) {
            nums.splice(i, 1);
            i = i - 1;
        } else {
            currentVal = nums[i];
        }
    }
}

removeDuplicates([1, 1, 2, 2, 3, 4, 4])

/**
 * 原地移除指定元素，并返回数组长度
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    if (nums.length === 0) {
        return 0;
    }
    for (let i = 0; i < nums.length; i++) {
        if (val == nums[i]) {
            nums.splice(i, 1);
            i = i - 1;
        }
    }
    return nums.length;
};

removeElement([3, 2, 2, 3], 3);

/**
 * 查找排序数组中是否存在目标值，如果不存在插入目标值并返回当前值所在的位置。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] >= target) {
            nums.splice(i, 0, target);
            return i;
        }
    }
    return nums.length;
};

searchInsert([1, 3, 5, 6], 5);

/**
 * 求取最大的子序和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    var max = -Number.MAX_VALUE;
    var sum = 0;
    for (let num of nums) {
        if (sum < 0) {
            sum = 0;
        }
        sum += num;
        max = Math.max(max, sum);
    }
    return max;
};

maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4, 4]); 

/**
 * 
 * @param {*} count 
 * @param {*} num 
 */
