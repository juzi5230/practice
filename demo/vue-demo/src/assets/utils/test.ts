
/**
 * 一个方法：生成错误提示信息
 * 
 * @param {string} message 提示信息，比如`you have a error`
 * @param {number | string} code 错误码，数字和字符都行
 * @param {string} type 类型，请写`demo1`或者`demo2`
 * 
 * 
 * ```js
 * // demo
 * genErrMsg('demo', 10086)
 * 
 * ```
 */
export function genErrMsg (message: string, code: number | string, type?: ('demo1' | 'demo2')): string {
    return (message || `网络繁忙，请稍候再试`) + (code ? `(${code})` : ``)
}
genErrMsg('ssss', 'ddd', 'demo1')

/*
* {string} message -- 函数返回内容， 警告信息
*/
interface messageTest {
    message: string,
    code: string | number,
    type?: 'demo1' | 'demo2'
}
export function getWarning (message:messageTest, code: number|string, type?:('demo1' | 'demo2')):messageTest {
    message.code = code
    message.type =  message.type? type:'demo1'
    return message
}