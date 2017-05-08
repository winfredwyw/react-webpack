import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    userInfo: {},
    userCart: {
        'variety': 0,//商品种类
        'number': 0 //商品总数
    },
    isLogin: false
};

let userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RECEIVE_LOGIN_INFO:
            return Object.assign({}, state, {
                userInfo: action.isLogin ? action.userInfo : {},
                isLogin: action.isLogin
            })
        case actionTypes.RECEIVE_USER_CART:
            return Object.assign({}, state, {
                userCart: action.userCart
            })
        default:
            return state;
    }
}

export default userReducer;