// 单独导出
exports.a = 1
exports.b = 2

let c = 3

// 批量导出1
module.exports = {
    a: 1,
    b: 2
}

// 批量导出2
module.exports = function () {
    console.log(123)
}

// 批量导出3

module.exports = class {
    constructor(name) {
        this.name = name
    }
    show() {
        console.log(this.name)
    }
}