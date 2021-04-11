// 参考链接 https://www.cnblogs.com/liquanjiang/p/11724793.html
const  shop = {}; // 首先定义一个商铺

shop.list = {};  // 定义商铺里的商品信息列表

shop.listen = function(key, fn) { // 添加订阅者
    if ( !this.list[key] ){ // 如果没有订阅,创建一个缓存列表
        this.list[key] = [];
    }
    this.list[key].push( fn ); // 订阅的消息添加进消息缓存列表
}  

shop.sell = function(){
   const key = Array.prototype.shift.call( arguments );// 取出消息
   const fns = this.list[ key ]; // 取出该消息对应的回调函数集合
    if ( !fns || fns.length === 0 ){ // 如果没有订阅该消息，则返回
        return false;
    }
    for( var i = 0, fn; fn = fns[ i++ ]; ){
        fn.apply( this, arguments ); // (2) // arguments 是参数
    }
}

// 这是来了一个顾客询问手机的价格，那么
shop.listen('IphoneX', function(price) {
    console.log('价格' + price)
})

// 这是来了一个顾客询问手机的价格，那么
shop.listen('Iphone11', function(price) {
    console.log('价格' + price)
})


// 发布消息,本店卖IphoneX， 价格7000
shop.sell('IphoneX', 7000);

shop.sell('Iphone11', 9000);

// 输出 价格7000
// 输出 价格9000