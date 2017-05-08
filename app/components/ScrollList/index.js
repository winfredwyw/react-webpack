/**
 * name: 上拉加载组件
 * anchor: wangyawei@douyu.tv
 * example: 
        <div className="l-list" ref='c'>
            <ScrollList isHasMore={true} loadMoreFun={this.loadMoreFun.bind(this)}>
                {
                    this.state.mock.map((item, index) => {
                        return (
                            <div className='item' key={index}>{'顶'+index}</div>
                        )
                    })
                }
            </ScrollList>
        </div>
 */

import React from 'react';
import Hammer from 'react-hammerjs';
import './index.scss';

// 离底部开始加载距离
const LOAD_INTERVAL_HEIGHT = 100;

class ScrollList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isToEnd: false, // 是否滚动到底部
            isHasMore: this.props.isHasMore, // 是否还有更多数据
            isLoading: false // 是否加载数据中
        };
    }
    componentDidMount () {
        // 滚动容器dom
        this.scroller = this.refs.scroller;
        // 滚动内容dom
        this.list = this.refs.list;
        // 容器高度（只需获取一次）
        this.vHeight = $(this.scroller).height();

        $(this.scroller).scroll((e) => {
            this.handleScroll($(this.scroller).scrollTop());
        });
    }
    // 加载更多数据回调
    // @param {bool} isHasMore 是否还有更多数据
    loadMoreBack (isHasMore) {
        this.setState({
            isLoading: false,
            isHasMore: isHasMore
        })
    }
    // 滚动判断逻辑
    handleScroll (scrollTop) {
        // 内容高度（每次滚动都会从新获取）
        let sHeight = $(this.list).height();
        // 容器高度
        let vHeight = this.vHeight;

        // 到达底部
        if (vHeight + scrollTop + LOAD_INTERVAL_HEIGHT >= sHeight) {
            this.setState({
                isToEnd: true
            });
            // 阻止重复加载（加载中或没有更多数据）
            if (this.state.isLoading || !this.state.isHasMore) 
                return;
            
            // 加载下一页数据
            this.setState({
                isLoading: true
            });
            this.props.loadMoreFun && this.props.loadMoreFun(this.loadMoreBack.bind(this));
        } else {
            this.setState({
                isToEnd: false
            });
        }
    }
    renderMore () {
        // 加载中
        if (this.state.isToEnd && this.state.isHasMore)
            return (
                <div className='loadmore-tip'>
                    加载中···
                </div>
            );
        // 没有更多数据
        if (this.state.isToEnd && !this.state.isHasMore)
            return (
                <div className='loadmore-tip'>
                    没有更多内容
                </div>
            );
        return '';
    }
    render () {
        return (
            <div ref='scroller' className='c-scroller'>
                <div ref='list'>
                    {
                        this.props.children
                    }
                    {
                        this.renderMore()
                    }
                </div>
            </div>
        )
    }
};

ScrollList.defaultProps = {
    // 加载更多回调
    loadMoreFun: null
};
export default ScrollList;