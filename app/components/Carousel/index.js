import React from 'react';
import Hammer from 'react-hammerjs';
import { Util } from '@douyu/sharkjs';
import './index.scss';

class Carousel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            curIdx: 0
        };
        this.slideWidth = 0;
    }
    // 绑定滑动事件
    handleSwiper (obj) {
        let $target = $(obj.target);
        let len = this.props.carousels.length;
        let newIdx;

        this.slideWidth = $target.width();

        // 左滑
        if (obj.direction == 2) {
            newIdx = this.state.curIdx + 1;
        }
        // 右滑
        if (obj.direction == 4) {
            newIdx = this.state.curIdx - 1;
        }

        if (Util.isUndefined(newIdx)) return;
        if (newIdx < 0) return;
        if (newIdx > len - 1) return;

        this.setState({
            curIdx: newIdx
        });
    }
    render () {
        let len = this.props.carousels.length;
        let tranX = -1 * this.state.curIdx * this.slideWidth;

        return (
            <Hammer onSwipe={this.handleSwiper.bind(this)} direction='DIRECTION_HORIZONTAL'>
                <div className="c-carousel-container">
                    <div className="c-carousel-wrapper" style={{"transform": 'translateX(' + tranX + 'px)'}}>
                        {
                            len > 0 ?
                            this.props.carousels.map((item, index) => {
                                return (
                                    <div className="c-carousel-slide" key={index}>
                                        <img src={item.imgUrl} alt={item.text} />
                                    </div>
                                )
                            })
                            : '无轮播图数据'
                        }
                    </div>
                    <div className='c-carousel-tag'>
                        <span>{this.state.curIdx + 1}</span><span>/{len}</span>
                    </div>
                </div>
            </Hammer>
        );
    }
};

// 默认属性
Carousel.defaultProps = {
    carousels: [
        {
            imgUrl: 'https://staticlive.douyucdn.cn/upload/signs/201704121835112806.jpg',
            src: 'www.baidu.com',
            text: '测试'
        },
        {
            imgUrl: 'https://staticlive.douyucdn.cn/upload/signs/201704121835112806.jpg',
            src: 'www.baidu.com',
            text: '测试'
        },
        {
            imgUrl: 'https://staticlive.douyucdn.cn/upload/signs/201704121835112806.jpg',
            src: 'www.baidu.com',
            text: '测试'
        },
        {
            imgUrl: 'https://staticlive.douyucdn.cn/upload/signs/201704121835112806.jpg',
            src: 'www.baidu.com',
            text: '测试'
        }
    ]
}

export default Carousel;
