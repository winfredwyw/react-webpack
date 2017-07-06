/**
 * 服务启动文件
 */
var path = require('path'),
    express = require('express'),
    router = require('./routers'),
    app = express(),
    color = require('colors'),
    appConfig = require('../bin/config.js');

var webpack = require('webpack');
var proxy = require('http-proxy-middleware');// 引入代理中间件
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('../bin/webpack.config.js');
var compiler = webpack(webpackConfig);

var _ENV = process.env.NODE_ENV;

// 相对于服务启动文件的绝对
var staticPath = function (pa) {
    return path.join(__dirname, pa);
};

// 配置服务
app.set('views', staticPath('views'));
app.set('view engine', 'ejs');
app.use(router);
if (_ENV == 'dev') {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig[0].output.publicPath,
        reload: true,
        stats: { colors: true }
    }));
    app.use(webpackHotMiddleware(compiler));
} else {
    app.use(express.static('./build/'));
}

// 配置接口代理
// const apiProxy = proxy(
//     ['/item', '/trade', '/user', '/goodsList'], 
//     { 
//         target: '', 
//         changeOrigin: true
//     }
// );
// app.use(/((?!(mob)).)*/, apiProxy);

// 开启监听
// app.listen(5252, function () {
//     console.log('----> Listen on 5252'.green);
// });

var reload = require('reload');
var http = require('http');
var open = require("open");

var server = http.createServer(app);
reload(server, app);

server.listen(5252, function(){
    console.log('App (dev) is now running on port 5252!');
    open("http://" +  appConfig.dev_ip + ':5252' + '/mob/', "chrome");
});