/**
 * 无数据组件
 */
import React from 'react';
import './index.scss';

class NoData extends React.Component {
    render () {
        return (
            <div className={ this.props.isCart ? 'c-nodata nocart' : 'c-nodata' }>
                <span className='img'></span>
                <span className='text'>{this.props.text}</span>
            </div>
        );
    }
};

NoData.defaultProps = {
    text: '暂无数据',
    isCart: false
};

export default NoData;
