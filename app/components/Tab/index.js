import React from 'react';
import './index.scss';

class Tab extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            current: 0
        };
    }
    itemNav (index) {
        return index === this.state.current ? 'item-title active' : 'item-title';
    }

    itemCon (index) {
        return index === this.state.current ? 'con active' : 'con';
    }
    render () {
        return (
            <div className='c-tab'>
                <ul className="c-tab-nav clearfix">
                    {
                        React.Children.map(this.props.children,(element,index) => {
                            return (
                                <li onClick={ () => { this.setState({ current: index }) } } className={ this.itemNav(index) }>
                                    { element.props.name }
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="c-tab-content">
                    {
                        React.Children.map(this.props.children, (element,index) => {
                            return (
                                <div onClick={ () => { this.setState({ current: index }) } } className={ this.itemCon(index) }>
                                    { element }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
};

export default Tab;
