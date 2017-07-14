var path = require('path'),
    webpack = require('webpack'),
    appConfig = require('./config.js');

// 相对于该文件的绝对路径
var _staticPath = function (pa) {
    return path.join(__dirname, pa);
};

var _MPA = appConfig.mpa_entries;
console.log(_MPA);

var config = [
   {
        entry: {
            app: [
                _staticPath('../spa')
            ],
            bundle: ['react', 'react-dom', 'react-router-dom', 'react-redux']
        },
        output: {
            path: _staticPath('../build'),
            publicPath: './',
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
        ].concat(appConfig.plugins.public).concat(appConfig.plugins.uglify),
        // 调试map
        devtool: ''
    },
    {
        entry: appConfig.mpa_entries,
        output: {
            path: _staticPath('../build'),
            publicPath: './',
            filename: '[name].min.js'
        },
        module: {
            loaders: appConfig.loaders
        },
        // 重命名
        resolve: appConfig.resolve,
        plugins: [].concat(appConfig.plugins.public).concat(appConfig.plugins.uglify),
        // 调试map
        devtool: ''
    }
];

module.exports = config;
