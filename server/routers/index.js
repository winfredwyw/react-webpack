/**
 * 服务器路由
 */
var express = require('express'),
    appConfig = require('../../bin/config.js'),
    router = express.Router();

// 项目介绍页
router.get("/", function (req, res, next) {
    res.render('spa', { title: '首页', ip: appConfig.dev_ip });
});

// 解析包含/mob/的路径（spa）
router.get(/mob/, function (req, res, next) {
    res.render('spa', { title: '首页', ip: appConfig.dev_ip });
});

// 解析包含/m/路径的地址（多页面地址）
router.get(/\/m\//, function (req, res) {
    // 解析文件夹名，会依据这个去请求对应的静态资源文件
    let file = req.path.replace(/\/m\//g, '');
    res.render('mpa', { title: '活动页', ip: appConfig.dev_ip, file: file });
});

module.exports = router;
