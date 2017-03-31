var path = require('path'),
    webpack = require('webpack');

var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var DEVELOP_IP = '10.118.21.116';

// 相对于该文件的绝对路径
var _staticPath = function (pa) {
    return path.join(__dirname, pa);
}

var config = {
    entry: {
        app: [
            _staticPath('../src')
        ]
    },
    output: {
        path: _staticPath('../build'),
        publicPath: './',
        filename: '[name].min.js'
    },
    module: {
        loaders: [
            // 编译react、es6
            { test: /\.js$/, loader: 'babel-loader', query: { presets: ['react', 'es2015'] }, exclude: /node_modules/ },
            // 编译scss, 自动加前缀
            { 
                test: /\.scss$/, 
                loader: 
                    ExtractTextPlugin.extract({
                        fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader']
                    }), 
                exclude: /node_modules/ 
            },
            // 图片转化，小于8k自动转化成base64编码
            { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=images/[name].[ext]', exclude: /node_modules/ },
            // 字体
            { test: /\.(woff|svg|eot|ttf|otf)\??.*$/, loader: 'file-loader?name=iconfont/[name].[ext]', exclude: /node_modules/ },
            // 音乐
            { test: /\.mp3$/, loader: 'file-loader?name=music/[name].[ext]', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                // postcss配置
                postcss: function(){
                    return [
                        require("autoprefixer")({
                            browsers: ['ie>=8','>1% in CN']
                        })
                    ]
                }
            }
        }),
        // css打包
        new ExtractTextPlugin('app.min.css'),
        // 压缩代码
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    ],
    // 调试map
    devtool: 'cheap-source-map'
};

module.exports = config;