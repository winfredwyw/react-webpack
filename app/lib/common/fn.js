/**
 * name: app核心辅助函数
 * 已在wabpack配置别名，方便引用
 */

// 环境判断
const G_BROWSER_JUDGES = (function () {
    let _UA = navigator.userAgent.toLowerCase();

    return {
        isMobile: !!_UA.match(/AppleWebKit.*Mobile.*/i), //是否为移动终端
        isWX: _UA.match(/MicroMessenger/i) == 'micromessenger', //在微信中打开
        isWB: _UA.match(/WeiBo/i) == 'weibo', //在新浪微博客户端打开
        isQQ: _UA.match(/QQ/i) == 'qq', //在QQ内置浏览器打开
        isDyAndroid: _UA.match(/Douyu_Android/i) == 'douyu_android', //在斗鱼Android客户端打开
        isDyIOS: _UA.match(/Douyu_IOS/i) == 'douyu_ios', //在斗鱼IOS客户端打开
        isIOS: !!_UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i), //ios终端
        isIOSHD: _UA.match(/ipad/i), // ipad终端
    }
})();

// 文字大小适配对象
const G_FONTSIZE_STYLES= (function(){
    // 屏幕宽度
    let WIN_WIDTH = document.body.clientWidth;
    // 设计稿宽度
    let UI_WiDTH = 750;

    let result = {};

    // 获取屏幕与设计稿的宽度比
    let getFitVal = function () {
        let val = WIN_WIDTH / UI_WiDTH;
        return val.toFixed(2);
    }

    // 字体大小自适应
    let getFitFontSize = function (fs) {
        if (!fs)
            return '0px';
        let fsNum = parseInt(fs.replace(/px/g, ''));
        let fitVal = getFitVal();
        let fitFsNum = fsNum * fitVal;

        return fitFsNum.toFixed(0) + 'px';
    }

    // 生成文字大小样式对象集合
    let mapFitFontSize = function () {
        let fsArr = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44];

        fsArr.map(function (item) {
            let key = 'fs' + item;
            let val = getFitFontSize(item + 'px');

            result[key] = {
                fontSize: val
            };
        })
    }
    mapFitFontSize();

    return result;

})();

// SET_TOAST提示
const SET_TOAST = function (msg, time) {
    window.layer.open({
        content: msg || ''
        ,time: time || 2
        ,skin: 'msg'
    });
}

// 获取安全的手机号码格式
const GET_FIT_PHONE = function (phone) {
    if (!phone)
        return '';

    let len = phone.length;
    return phone.substring(0, 3) + '****' + phone.substring(len-4, len);
};

// 订单状态定义
const G_ORDER_STATUS = {
    ALL: {
        title: '全部',
        status: '',
        tip: '',
        action: ''
    },
    WAIT_BUYER_PAY: {
        title: '待付款',
        status: 'WAIT_BUYER_PAY',
        tip: '请尽早付款',
        action: '立即支付'
    },
    WAIT_SELLER_SEND_GOODS: {
        title: '待发货',
        tip: '如长时间未发货，请主动提示商家',
        status: 'WAIT_SELLER_SEND_GOODS',
        action: '催单'
    },
    WAIT_BUYER_CONFIRM_GOODS: {
        title: '待收货',
        tip: '订单已发货，请关注物流及时收货',
        status: 'WAIT_BUYER_CONFIRM_GOODS',
        action: '确认收货'
    },
    WAIT_RATE: {
        title: '待评价',
        tip: '购物愉快，欢迎给予评价',
        status: 'WAIT_RATE',
        action: '立即评价'
    },
    TRADE_CLOSED_BY_SYSTEM: {
        title: '已关闭',
        tip: '如有疑问，请联系客服',
        status: 'TRADE_CLOSED_BY_SYSTEM',
        action: '联系客服'
    },
    TRADE_FINISHED: {
        title: '已完成',
        tip: '购物愉快，欢迎给予评价',
        status: 'TRADE_FINISHED',
        action: '联系客服'
    }
};

module.exports = {
    // 文字大小
    G_FONTSIZE_STYLES,
    // 获取保密格式手机号码
    GET_FIT_PHONE,
    // SET_TOAST提示
    SET_TOAST,
    // 客户端判断
    G_BROWSER_JUDGES,
    // 订单状态定义
    G_ORDER_STATUS
};
