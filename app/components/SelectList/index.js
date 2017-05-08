/**
 * 列表选择组件
 * 根据选择options.js配置，提供多种选择内容
 * @prop onSelected 选择完成回调, 回调结果:  value1/value2:id1/id2
 */
import React from 'react';
import './index.scss';
import { G_FONTSIZE_STYLES, SET_TOAST } from 'baseFunJs';
import Loading from '../Loading';
import selectOptions from './options.js';

class SelectList extends React.Component {
    constructor (props) {
        super(props);

        // 选择组件类型
        let type = props.type;
        // 获取配置
        let selectOption = selectOptions[type];

        this.state = {
            // 选项接口
            url: selectOption.url,
            // 区域对象
            options: selectOption.options,
            // 选择提示
            tip: selectOption.tip,
            // 选择的区域
            selectArr: [],
            // 选中的tab（默认为0）
            tabIdx: 0,
            // 是否还有子区域
            isHasChild: true
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.selectOption = selectOption;
    }
    componentDidMount () {
        // 入口配置了选项接口，就从接口获取选项
        if (this.state.url) {
            this.fetchData();
        }
    }
    fetchData () {
        let that = this;
        let url = that.state.url;
        $.ajax({
            url: url,
            type: 'GET',
            cache: true,
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    that.setState({
                        options: that.selectOption.getOptions(data)
                    })
                } else {
                    SET_TOAST('网络异常');
                }
            },
            error: function () {
                SET_TOAST('网络异常');
            }
        });
    }
    // 选择
    handleSelect (obj) {
        let { selectArr, tabIdx, isHasChild } = this.state;
        let len = selectArr.length;

        // 重新选择tab索引
        if (tabIdx + 1 < len) {
            selectArr.splice(tabIdx + 1, len - tabIdx - 1);
        }

        // 选择赋值
        selectArr[tabIdx] = obj;

        // 选择完成回调
        if (!obj.isHasChild) {
            let selectNameArr = [];
            let selectIdArr = [];
            let selectData = selectArr.map((item) => {
                selectNameArr.push(item.value);
                selectIdArr.push(item.id);
            })
            this.props.onSelected(selectNameArr.join('/') + ':' + selectIdArr.join('/'));
        }
        this.setState({
            selectArr: selectArr,
            isHasChild: obj.isHasChild,
            tabIdx: obj.isHasChild ? selectArr.length : tabIdx
        });
    }
    // tab切换
    handleTabClick (e) {
        let idx = e.target.getAttribute('data-idx');

        // 设置重新选择索引
        this.setState({
            tabIdx: parseInt(idx)
        });
    }
    render () {
        let { selectArr, options, tabIdx, tip } = this.state;

        if (!options)
            return (
                <div className='c-select'>
                    <Loading />
                </div>
            );

        let len = selectArr.length;
        let selectList = options;

        selectArr.map((item, index) => {
            if(tabIdx >= 0 && index >= tabIdx) return;
            if(!item.isHasChild) return;
            selectList = selectList[item.idx].children;
        });

        return (
            <div className='c-select' style={ G_FONTSIZE_STYLES.fs28 }>
                <div className='c-select-header'>
                {
                        selectArr.map((item, index) => {
                            return (                                             
                            <span 
                                className={ index == tabIdx ? 'cur' : '' }
                                data-idx={ index }
                                key={ index.toFixed(len) }
                                onClick={ this.handleTabClick }
                            >
                                { item.value }
                            </span>
                            )
                        })
                }
                {
                    len === 0 || selectArr[len-1].isHasChild ? 
                    <span className={ len == tabIdx ? 'cur' : '' }>{ tip }</span> 
                    : ''
                }
                </div>
                <div className='c-select-list'>
                {
                    selectList.map((item, index) => {
                        return (
                            <div 
                                className={ 
                                    (selectArr[tabIdx] && item.id == selectArr[tabIdx].id) ?
                                    'c-select-item cur' : 'c-select-item'
                                }
                                key={ index.toFixed(len) }
                                onClick={() => {
                                    let obj = {
                                        id: item.id,
                                        parentId: item.parentId,
                                        idx: index,
                                        value: item.value,
                                        isHasChild: item.children ? true : false
                                    }
                                    this.handleSelect(obj);
                                }}
                            >
                                <span>{ item.value }</span>
                                <span className='iconfont icon-selected'></span>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        );
    }
};

SelectList.defaultProps = {
    type: 'area',
    onSelected: function (data) {
        console.log(data)
    }
};

export default SelectList;
