var glob = require('glob'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    path = require('path');

// 版本
var _VESION__ = 1.0;
// 环境
var _ENV_ = process.env.NODE_ENV;

const config = {
    // 资源版本号
    vesion: _VESION__,
    // webpack-loaders
    loaders: (function () {
        let ret = [
            // 编译react、es6
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    // 转换react/es6语法
                    presets: ['react', 'es2015'],
                    // [收集复用函数（减小打包体积）、 转换es6-assign-api]
                    plugins: ['transform-runtime', 'transform-object-assign']
                },
                exclude: /node_modules/
            },
            // 编译scss, 自动加前缀
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                }),
                exclude: /node_modules/
            },
            // 图片转化，小于1k自动转化成base64编码
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=1024&name=images/[name][hash:6].[ext]',
                exclude: /node_modules/
            },
            // 字体
            {
                test: /\.(woff|svg|eot|ttf|otf)\??.*$/,
                loader: 'file-loader?name=iconfont/[name][hash:6].[ext]',
                exclude: /node_modules/
            },
            // 音乐
            {
                test: /\.mp3$/,
                loader: 'file-loader?name=music/[name][hash:6].[ext]',
                exclude: /node_modules/
            }
        ]

        // 开发环境不分离css（为了实现热更新）
        if (_ENV_ == 'dev') {
            ret[1] = {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                exclude: /node_modules/
            }
        }

        return ret;
    })(),
    // webpack-别名
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js'],

        // 别名，可以直接使用别名来代表设定的路径以及其他
        alias: {
            // 全局通用js
            baseFunJs: path.join(__dirname, '../app/lib/common/fn.js'),
            // 客户端交互方法
            dyApp: path.join(__dirname, '../app/lib/common/DYApp/index.js')
        }
    },
    // webpack-plugins
    plugins: {
        // 通用
        public: [
            // postcss配置
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: function () {
                        return [
                            autoprefixer({
                                browsers: ['ie>=8', '>1% in CN']
                            })
                        ];
                    }
                }
            }),
            // css打包
            new ExtractTextPlugin('[name].min.css'),
            // 全局环境变量
            new webpack.DefinePlugin({
                // app环境
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                // app版本号
                __VESION__: _VESION__
            })
        ],
        // 压缩
        uglify: [
            // 压缩css代码
            new OptimizeCssAssetsPlugin(),
            // 压缩js代码
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false
                },
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                }
            })
        ],
        // 热替换
        hot: [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    },
    // 开发者电脑IP
    dev_ip: (function () {
        function getIPAdress() {
            var interfaces = require('os').networkInterfaces();
            for (var devName in interfaces) {
                var iface = interfaces[devName];
                for (var i = 0; i < iface.length; i++) {
                    var alias = iface[i];
                    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                        return alias.address;
                    }
                }
            }
        };

        return getIPAdress();
    })(),
    // 多页应用入口自动获取
    mpa_entries: (function () {
        var files = glob.sync('./mpa/*/index.js');

        function getEntried() {
            var newEntries = {};
            files.forEach(function (f) {
                var name = /.*\/(.*?)\/index\.js/.exec(f)[1]; // 会得到文件夹名，如3c活动聚合页：3c-review
                newEntries[name + '/app'] = f; // 如：3c-review/app 为了让每个页面打包到文件夹里面
            });
            return newEntries;
        };

        return getEntried();
    })()
};

module.exports = config;