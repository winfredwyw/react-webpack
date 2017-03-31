var path = require('path'),
    webpack = require('webpack'),
    // 开发配置
    devconfig = require('./dev.config.js'),
    // 上线配置
    proconfig = require('./pro.config.js'),
    color = require('colors');

// 版本号
var _VESION = 1.0;
// 环境
var _ENV = process.env.NODE_ENV;
// webpack配置
var _CONFIG = {
    dev: devconfig,
    pro: proconfig
}

if (!_CONFIG[_ENV]) {
    console.error('ERROE---->NODE_ENV对应的配置未找到'.red);
}

// 添加全局变量
var config = _CONFIG[_ENV];
config.plugins.push(
    // 全局环境变量
    new webpack.DefinePlugin({
        // app环境
        // __DEV__: JSON.stringify(JSON.parse(!isPro)),
        // app版本号
        __VESION__: _VESION
    })
);

module.exports = _CONFIG[_ENV];