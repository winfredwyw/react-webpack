import React from 'react';
import './index.scss';
import { G_FONTSIZE_STYLES, SET_TOAST } from 'baseFunJs';

class ImageFiles extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            max: props.max,
            baseArr: []
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onChange = props.onChange;
    }
    checkType (file) {
        let res = true;
        let imageType = /^image\//;
        if (!imageType.test(file.type)) {
            res = false;
        }
        return res;
    }
    checkSize (file) {
        let res = true;
        if (file.size / (1024 * 1024) > 2) {
            res = false;
        }
        return res;
    }
    // 点击添加
    handleAdd () {
        let { max, baseArr } = this.state;
        let $files = $(this.refs.files);
        let $file = $('input[type=file]')[0];
        if (baseArr.length >= max)
            return;
        $file.click();
    }
    // 文件选择变化
    handleChange (e) {
        let that = this;
        let $files = $(this.refs.files);

        let file = $('input[type=file]')[0].files[0];

        if (!this.checkType(file)) {
            SET_TOAST('上传图片格式不对');
            return;
        }

        if (!this.checkSize(file)) {
            SET_TOAST('上传图片最大不可超过8MB');
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            let baseArr = that.state.baseArr;

            baseArr.push(e.target.result);
            that.onChange(baseArr);
            that.setState({
                baseArr: baseArr
            })
        };
        reader.readAsDataURL(file);
    }
    handleDelete (idx) {
        let baseArr = this.state.baseArr;

        baseArr.splice(idx, 1);
        this.setState({
            baseArr: baseArr
        })
    }
    render () {
        return (
            <div className='c-image-files' ref='files'>
                {
                    this.state.baseArr.map((item, index) => {
                        return (
                            <span className='item pic' key={ index }>
                                <img src={ item } />
                                <span className='close' onClick={ () => { this.handleDelete(index) } }>                                
                                </span>
                            </span>
                        );
                    })
                }
                <span className='item add' onClick={ this.handleAdd }>+</span>
                <span className='clr999' style={ G_FONTSIZE_STYLES.fs24 }>最多{ this.state.max }张</span>
                <input type="file" onChange={ this.handleChange } />
            </div>
        );
    }
};

ImageFiles.defaultProps = {
    // 最多上传几张
    max: 5,
    // 选择回调
    onChange: function () {}
};

export default ImageFiles;
