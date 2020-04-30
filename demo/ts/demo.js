// import { Interface } from "readline";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var baseParent = /** @class */ (function () {
    function baseParent(s, l) {
        this.s = s;
        this.l = l;
    }
    baseParent.prototype.getChild = function () {
        return this.s;
    };
    return baseParent;
}());
/*
* ts 不支持多类继承
*
*/
var baseChild = /** @class */ (function (_super) {
    __extends(baseChild, _super);
    function baseChild(s, l, name, age) {
        var _this = _super.call(this, s, l) || this;
        _this.name = name;
        _this.age = age;
        return _this;
    }
    return baseChild;
}(baseParent));
/*
* 范型
*/
var testTemplate = /** @class */ (function () {
    function testTemplate(name, greet) {
        this.name = name;
        this.message = greet;
    }
    testTemplate.prototype.getGreeting = function () {
        this.message ? console.log(this.name + ", " + this.message) : console.log("" + this.name);
    };
    return testTemplate;
}());
// 类与继承， 接口
var s = ['tom', 'jim', 'lily'];
var ageList = [12, 17, 32];
var obj = new baseChild({
    name: s[2],
    age: ageList[1],
    // age: ages[s[2]],
    sex: 'female'
}, {}, 'jim', 19);
console.log(obj.name);
console.log(obj.getChild());
// 范型
var greet1 = new testTemplate('lucy', 'hello~~~~~');
greet1.getGreeting();
var greet2 = new testTemplate('Tom');
greet2.getGreeting();
// 联合类型
function getS() {
    var s;
    s = ['1', '2', '3'];
    // es6 语法中 Array.isArray(s) 可以用来判断是否为数组
    if (Object.prototype.toString.call(s) === '[object Array]') {
        console.log("\u6570\u7EC4s\u4E3A: " + s);
    }
    else {
        console.log("\u5B57\u7B26\u4E32s\u4E3A\uFF1A " + s);
    }
}
getS();
var name1;
var name2;
name1 = {
    name: '2222',
    age: '22'
};
name2 = {
    name: 222,
    age: 12
};
console.log(name1);
console.log(name2);
