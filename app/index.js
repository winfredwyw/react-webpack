import React, { Component } from 'react';
import ReactDom from 'react-dom';
// app基础js及css
import '../lib/base';

ReactDom.render(
    <div>Hello World234!</div>,
    document.getElementById('root')
);

// 热更新
if(module.hot) {
    module.hot.accept();
}