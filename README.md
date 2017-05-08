# 鱼商H5
2017-04-17

## 技术选型
* react——前端渲染视图、虚拟dom、组件化
* redux——单向数据流
* react-router——前端路由
* es6——模块化
* sass——CSS预处理器，使得CSS的开发，变得简单和可维护
* webpack——模块化管理和打包

## 优势
* SPA
* 模块化
* 组件化

## 运行流程
参考下图
### store
```
职责：app的整个状态树，为视图提供状态，并接受action的数据，触发app根据新状态重新渲染
```

### app
```
职责：app前端视图，根据store自上而渲染，并接受指令dispatch对应的action
```
### action
```
职责：接受app指令，操作store
```

* Store 只关心所只有的 state；
* View 中的组件，只关心显示数据和触发 Action；
* Action 只关注 state 中的某些数据发生变化了，并包含了这些数据；
* Reducer 只关注旧的状态并将 Action 放入到 state 中。

![流程图](https://f8-app.liaohuqiu.net/static/images/redux_flowchart.png)


## 目录结构 ##
```
|--bin  配置文件（包括webpack）
|--build  打包代码
|--server  服务器
|--app  开发代码
|--package.json  npm配置文件
|--README.md  项目说明
```

## 开发代码约束

#### actions 存放action指令

#### components 存放纯UI公用组件

#### containers 智能容器（连接视图与状态树及dispatch方法）

#### lib app辅助库

#### pages 页面视图

#### reducers 存放reducer状态函数

#### store 封装所有来自reducers的state

#### index.js 入口

#### 样式约定
```
页面样式以page开头，如：订单详情————page-order-detail
组件样式以c开头，如：评价项展示组件————c-comment
```

## 开发示例

```
1、约定actionType
    /**
    * 购物车页actions
    */
    // 获取购物车列表数据
    export const FETCH_CART_LIST = 'FETCH_CART_LIST';
    // 获取购物车数据成功
    export const RECEIVE_CART_LIST = 'RECEIVE_CART_LIST';

2、定义reducer
    // 引入约定的actionType
    import * as actionTypes from '../actions/actionTypes';

    // 默认状态
    const initialState = {
        cartList: [],
        isLoading: true
    };

    // 根据actionType接收新的state
    let shoppingCartReducer = (state = initialState, action) => {
        switch (action.type) {
            case actionTypes.FETCH_CART_LIST:
                return Object.assign({}, state, {
                    isLoading: true
                })
            case actionTypes.RECEIVE_CART_LIST:
                return Object.assign({}, state, {
                    isLoading: false
                })
            default:
                return state;
        }
    }

    export default shoppingCartReducer;

3、定义指令
    // 引入约定的actionType
    import * as actions from './actionTypes.js';

    // 为app提供的action
    export const fetchCart = () => {
        return dispatch => {
            dispatch(fetchCartList());
            setTimeout(function () {
                dispatch(receiveCartList());
            }, 2000);
        }
    };

    // 通过dispatch注入store新的state
    let fetchCartList = () => {
        return {
            type: actions.FETCH_CART_LIST
        }
    };

    // 通过dispatch注入store新的state
    let receiveCartList = () => {
        return {
            type: actions.RECEIVE_CART_LIST
        }
    };
4、组件智能组件接收state及dispatch，并传入子组件
    
    // 购物车容器
    class ShoppingCartContainer extends Component {
        constructor (props) {
            super(props);
        }
        render () {
            return (
                <ShoppingCart {...this.props} />
            );
        }
    };

    export default connect((state) => {
        const { User, ShoppingCart } = state;

        return {
            User, // 用户数据
            ShoppingCart
        };
    })(ShoppingCartContainer);

```

## 项目命令

```
1、nom run dev-server
    开启本地开发环境，会开一个本地服务器，模拟服务环境，方便本地开发
2、npm run build
    打包上线代码
3、npm run build-show
    打包上线代码，并生成分析文件stats.json
4、npm run debug
    开启debug模式，监听开发代码，并随时生成上线代码
```