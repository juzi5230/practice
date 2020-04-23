const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      // config.externals = {
      //   vue: 'Vue',
      //   vant: 'vant',
      //   axios: 'axios',
      //   vuex: 'Vuex',
      //   'vue-router': 'VueRouter',
      //   fastclick: 'FastClick'
      // }
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              // warnings: false,
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: false, // 是否需要生成sourceMap文件
          parallel: true // 加快打包速度 webpack提供的UglifyJS插件由于采用单线程压缩，速度很慢 , webpack-parallel-uglify-plugin插件可以并行运行UglifyJS插件，这可以有效减少构建时间
        })
      )
    } else {
    // 为开发环境修改配置...
    }
  },
  pluginOptions: {
    // 规范css，目前还是比较宽松的
    lintStyleOnBuild: true, // 添加了插件(@ascendancyy/vue-cli-plugin-stylelint), 所以需要配置
    stylelint: {
      fix: true, // boolean (default: true)
      files: ['src/**/*.vue', 'src/assets/css/*.(l|s)?(e|c)ss'] // string | [string] (default: ['src/**/*.{vue,htm,html,css,sss,less,scss}'])
      // formatter: () => { } // function (default: require('stylelint-codeframe-formatter'))
      // etc...
    }
  },
}