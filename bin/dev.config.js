var path = require('path'),
    appConfig = require('./config.js'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

// 开发者电脑IP
var DEVELOP_IP = appConfig.dev_ip;

// 相对于该文件的绝对路径
var _staticPath = function (pa) {
    return path.join(__dirname, pa);
};

var hotMiddlewareScript = 'webpack-hot-middleware/client?http://' + DEVELOP_IP + ':5252/';
var config = [
    {
        entry: {
            app: [
                _staticPath('../spa'),
                hotMiddlewareScript
            ],
            bundle: ['react', 'react-dom', 'react-router-dom', 'react-redux']
        },
        output: {
            path: _staticPath('../build'),
            publicPath: 'http://' + DEVELOP_IP + ':5252/build/',
            filename: '[name].min.js'
        },
        module: {
            loaders: appConfig.loaders
        },
        // 重命名
        resolve: appConfig.resolve,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'bundle',
                filename: 'bundle.min.js'
            })
        ].concat(appConfig.plugins.public).concat(appConfig.plugins.hot),
        // 调试map
        devtool: 'cheap-source-map'
    },
    {
        entry: (function () {
            // return appConfig.mpa_entries.map((item) => {
            //     return item.push
            // })
            let ret = {};

            for (let key in appConfig.mpa_entries) {
                ret[key] = [appConfig.mpa_entries[key], hotMiddlewareScript];
            }

            return ret;
        })(),
        output: {
            path: _staticPath('../build'),
            publicPath: 'http://' + DEVELOP_IP + ':5252/build/',
            filename: '[name].min.js'
        },
        module: {
            loaders: appConfig.loaders
        },
        // 重命名
        resolve: appConfig.resolve,
        plugins: [].concat(appConfig.plugins.public).concat(appConfig.plugins.hot),
        // 调试map
        devtool: 'cheap-source-map'
    }
];

module.exports = config;
