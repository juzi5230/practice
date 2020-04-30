
// import { Interface } from "readline";

// 控制台输入tsc demo.ts 编译生成js文件, node demo.js 运行js代码，查看效果
interface parent {
    name: string,
    code?: string | number,
    message?: string
}

interface nameList {
    [index: number]: string
}
// interface ageList {
//     [index: string]: number
// }
/*
* ts 支持interface继承多个接口
*/ 
interface child extends parent {
    age: number,
    sex: string
}

class baseParent {
    s: child;
    l: parent;
    constructor (s, l) {
        this.s = s;
        this.l = l;
    }
    getChild():child {
        return this.s
    }
}

/*
* ts 不支持多类继承
* 
*/ 
class baseChild extends baseParent{
    name: string;
    age: number;
    s: child;
    l: parent;
  constructor(s, l, name, age) {
    super(s, l);
    this.name = name;
    this.age = age
  }
}

/*
* 范型
*/

class  testTemplate <temp> {
    name: temp;
    message?: temp
    constructor(name:temp, greet?:temp) {
        this.name = name
        this.message = greet
    }
    getGreeting():void {
        this.message ? console.log(`${this.name}, ${this.message}`) :console.log(`${this.name}`)
    }
}

// 类与继承， 接口
let s:nameList = ['tom', 'jim', 'lily']
let ageList:number[] = [12, 17, 32]
var obj = new baseChild(
    {
        name: s[2],
        age: ageList[1],
        // age: ages[s[2]],
        sex: 'female'
    },
    {},
    'jim',
    19
)
console.log(obj.name)
console.log(obj.getChild())

// 范型
let greet1 = new testTemplate<string>('lucy', 'hello~~~~~')
greet1.getGreeting()
let greet2 = new testTemplate<string>('Tom')
greet2.getGreeting()

// 联合类型


function getS() {
    let s: string | string[]
    s = ['1', '2', '3']
    // es6 语法中 Array.isArray(s) 可以用来判断是否为数组
    if(Object.prototype.toString.call(s) === '[object Array]') {
        console.log(`数组s为: ${s}`)
    } else {
        console.log(`字符串s为： ${s}`)
    }
}
getS()

/**
 * 
 * 命名空间
 * 命名空间一个最明确的目的就是解决重名问题
 * */ 
namespace str {
    export interface nameContainer {
        name: string,
        age: string
    }
}
namespace num {
    export interface nameContainer {
        name: number,
        age: number
    }
}
let name1:str.nameContainer
let name2:num.nameContainer
name1 = {
  name: '2222',
  age: '22'
}
name2 = {
    name: 222,
    age: 12
}
console.log(name1)
console.log(name2)
