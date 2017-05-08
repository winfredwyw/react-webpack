import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Perf from 'react-addons-perf';
import {
    BrowserRouter as Router, Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
// app状态
import store from './store';
// app基础js及css
import './lib/base';


// app页面
import {
    HomeContainer
} from './containers';

// 路由配置
const routeConfigs = [
    // 首页
    {
        path: '/mob/index',
        component: HomeContainer,
        isExact: true // 是否精准匹配
    }
];

ReactDom.render(
    <Provider store={store}>
        <Router>
            <div id="js-app-content">
                {
                    routeConfigs.map(function (item, index) {
                        return (
                            <Route
                                key={ index }
                                exact={ item.isExact } 
                                path={ item.path } 
                                component={ item.component } />
                        );
                    })
                }
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);