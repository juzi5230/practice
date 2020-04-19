
module.exports = {
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