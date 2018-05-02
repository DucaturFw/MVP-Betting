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

import Predict from './components/predict';

export default class App extends Component {
  constructor(opts) {
    super(opts);

    this.state = {
      showBet: true
    };
  }

  onMenuClick = () => {
    this.setState(state => ({
      ...state,
      showBet: !state.showBet
    }));
  };

  render() {
    console.log(this.state);
    return (
      <Main>
        <Header onMenuClick={this.onMenuClick} />
        <Counters />
        <Prediction />
        <Range />
        {this.state.showBet && <Predict onClose={this.onMenuClick} />}
      </Main>
    );
  }
}
