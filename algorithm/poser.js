// 实现嵌套加减法(字节)

// 实现一个函数，sub(two(one())) 面试官 提示使用reduce实现，没有写出来

// 相关算法， 实现加法

/** 
 * function add() {}
 * function one() {}
 * function two() {}
 * console.log(one(add(two())))
*/

const two = n => 2 + (n || 0)
const one = n => 1 + (n || 0)
const add = n => n