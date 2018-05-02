import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
// import theme from './styles/theme';
import './styles/base.css';
import './styles/styles.less';

import Main from './components/main';
import Header from './components/header';
import Counters from './components/counters';
import Prediction from './components/prediction';
import Range from './components/range';

export default class App extends Component {
  render() {
    return (
      <Main>
        <Header />
        <Counters />
        <Prediction />
        <Range />
      </Main>
    );
  }
}
