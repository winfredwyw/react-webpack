/**
 * 服务器路由
 */
var express = require('express'),
    router = express.Router();

router.get(/mob/, function (req, res, next) {
    res.render('index', { title: '首页' });
});

module.exports = router;