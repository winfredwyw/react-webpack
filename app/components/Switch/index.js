import React from 'react';
import './index.scss';

class Switch extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            isOpen: props.isOpen
        };
    }
    // 开关切换
    handleToggle () {
        let isOpen = !this.state.isOpen;

        this.props.onSwitchToggle(isOpen);
        this.setState({
            isOpen: isOpen
        });
    }
    // 开关样式
    comClass () {
        return this.state.isOpen ? 'c-switch open' : 'c-switch';
    }
    render () {
        return (
            <div className={ this.comClass() } onClick={ this.handleToggle.bind(this) }>
                <div className='switch-bg'></div>
                <div className='switch-btn'></div>
            </div>
        );
    }
};

Switch.defaultProps = {
    isOpen: 1,
    onSwitchToggle: function () {}
};

export default Switch;
