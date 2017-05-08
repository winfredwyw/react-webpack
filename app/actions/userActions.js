import * as actions from './actionTypes.js';
import { G_BROWSER_JUDGES } from 'baseFunJs';

// 获取登录信息
let receivLoginInfo = (isLogin, userinfo = {}) => {
    return {
        type: 'RECEIVE_LOGIN_INFO',
        userInfo: userinfo,
        isLogin: isLogin
    }
}

let receiveUserCart = (data) => {
    return {
        type: 'RECEIVE_USER_CART',
        userCart: data
    }
}