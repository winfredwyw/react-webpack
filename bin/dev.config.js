/**
 * 开发模式webpack配置
 */
var path = require('path'),
    webpack = require('webpack');

var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// 本地开发ip
var DEVELOP_IP = '10.119.25.148';

// 相对于该文件的绝对路径
var _staticPath = function (pa) {
    return path.join(__dirname, pa);
}

// 静态资源版本号
var _VESION = 1.0;

var config = {
    entry: {
        app: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client?http://' + DEVELOP_IP + ':5252/',
            _staticPath('../app')
        ],
        bundle: ['react', 'react-dom', 'react-router-dom', 'react-redux']
        // bundle: ['react', 'react-dom']
    },
    output: {
        path: _staticPath('../build'),
        publicPath: 'http://' + DEVELOP_IP + ':5252/build/',
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
    // 重命名
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js'],

        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            // 全局通用js
            baseFunJs: path.join(__dirname, '../app/lib/common/fn.js')
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'bundle', filename: 'bundle.min.js' }),
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
        // 全局环境变量
        new webpack.DefinePlugin({
            // app环境
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            // app版本号
            __VESION__: _VESION
        }),
        // 热替换
        new webpack.HotModuleReplacementPlugin(),
        // css打包
        new ExtractTextPlugin('app.min.css')
    ],
    // 调试map
    devtool: 'cheap-source-map'
};

module.exports = config;