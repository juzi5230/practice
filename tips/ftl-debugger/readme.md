# ftl可视化调试

参考网址： [https://segmentfault.com/q/1010000008625801](https://segmentfault.com/q/1010000008625801)

+ 1、在vue+webpack项目或者react工程化项目中： npm install freemarker2js-loader --save-dev

+ 2、配置好webpack

rules: [{

  test: /\.ftl$/,

  use: {

    loader: 'freemarker2js-loader'

  }

}

+ 3、在随便一个组件中： 

import Demo from 'demo.ftl'; // 需要调试的ftl文件

$('body').html(Demo({ // 大括号中为要传递的值，可以根据需要编写对应的mock数据

  propA: 'valA',

  propB: 'valB'

}));

+ 4、 分页打印： 

.break-page {

  page-break-after: always;

}

+ 5、 定义函数并在ftl文件中调用： 

[http://freemarker.foofun.cn/pgui_datamodel_method.html](http://freemarker.foofun.cn/pgui_datamodel_method.html)