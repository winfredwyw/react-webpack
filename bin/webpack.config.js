// 开发配置
var devConfig = require('./dev.config.js'),
    // 上线配置
    proConfig = require('./pro.config.js'),
    // debug配置
    debugConfig = require('./debug.config.js');

// 环境
var _ENV_ = process.env.NODE_ENV;
// webpack配置
var _CONFIG_ = {
    dev: devConfig,
    production: proConfig,
    debug: debugConfig
};

if (!_CONFIG_[_ENV_]) {
    console.error('ERROE---->NODE_ENV对应的配置未找到'.red);
}

module.exports = _CONFIG_[_ENV_];
