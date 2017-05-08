var path = require('path'),
    webpack = require('webpack'),
    // 开发配置
    devConfig = require('./dev.config.js'),
    // 上线配置
    proConfig = require('./pro.config.js'),
    // debug配置
    debugConfig = require('./debug.config.js'),
    color = require('colors');

// 环境
var _ENV = process.env.NODE_ENV;
// webpack配置
var _CONFIG = {
    dev: devConfig,
    production: proConfig,
    debug: debugConfig
}

if (!_CONFIG[_ENV]) {
    console.error('ERROE---->NODE_ENV对应的配置未找到'.red);
}

module.exports = _CONFIG[_ENV];