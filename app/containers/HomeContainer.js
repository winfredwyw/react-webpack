import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Home } from '../pages';

// 商品详情页容器
class HomeContainer extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (
            <Home {...this.props} />
        );
    }
};

export default connect((state) => {
    const { User } = state;

    return {
        User // 用户数据
    };
})(HomeContainer);