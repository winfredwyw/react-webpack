import React from 'react';
import './index.scss';

class Timer extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            duration: props.duration || 0 // 倒计时持续时间，单位s
        };
    }
    componentDidMount () {
        this.setRun();
    }
    componentWillUnmount () {
        console.log('卸载')
        this.timer && clearInterval(this.timer);
    }
    setRun () {
        this.timer = setInterval(() => {
            if (this.state.duration > 0) {
                this.setState({
                    duration: this.state.duration - 1
                });
            } else {
                clearInterval(this.timer);
            }
        }, 1000);
    }
    getObj_HMS () {
        let duration = this.state.duration;
        
        let h = parseInt(duration / 3600);
        let m = parseInt((duration - (h * 3600)) / 60);
        let s = parseInt(duration - (h * 3600) - (m * 60));

        return {
            h, m, s
        }
    }
    render () {
        let HMS = this.getObj_HMS();

        return (
            <span>{ HMS.h + '时' + HMS.m + '分' + HMS.s + '秒' }</span>
        );
    }
};

export default Timer;
