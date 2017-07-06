import React, { Component } from 'react';
import ReactDom from 'react-dom';
// app基础js及css
import '../lib/base';

ReactDom.render(
    <div>Hello World!</div>,
    document.getElementById('root')
);

if(module.hot) {
    module.hot.accept();
}