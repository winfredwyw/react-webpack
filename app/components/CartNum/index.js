/**
 * 购物车统计小红点
 */

import React from 'react';
import './index.scss';
import { G_FONTSIZE_STYLES } from 'baseFunJs';
import { fetchUserCart } from '../../actions/userActions.js';

class CartNum extends React.Component {
    componentDidMount () {
        let { dispatch } = this.props;
        dispatch(fetchUserCart());
    }
    render () {
        let { userCart } = this.props;

        if (!userCart)
            return '';

        return (
            <span className='c-cart-num' style={ G_FONTSIZE_STYLES.fs20 }>
                { userCart.number }
            </span>
        );
    }
};

export default CartNum;
