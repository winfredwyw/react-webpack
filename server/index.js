/**
 * 服务启动文件
 */
var path = require('path'),
    express = require('express'),
    router = require('./routers'),
    app = express(),
    color = require('colors');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('../bin/webpack.config.js');
var compiler = webpack(webpackConfig);

var _ENV = process.env.NODE_ENV;

// 相对于服务启动文件的绝对
var staticPath = function (pa) {
    return path.join(__dirname, pa);
}

// 配置服务
app.set('views', staticPath('views'));
app.set('view engine', 'ejs');
app.use(router);
if (_ENV == 'dev') {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true }
    }));
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use(express.static('./build/'));
}

// 开启监听
app.listen(5252, function () {
    console.log('----> Listen on 5252'.green);
});