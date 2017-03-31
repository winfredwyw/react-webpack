import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Header from './components/header';

let appContainer = document.getElementById('js-app-container');
ReactDom.render(<Header />, appContainer);