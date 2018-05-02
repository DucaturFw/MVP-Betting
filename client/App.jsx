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
import List from './components/list';

export default class App extends Component {
  constructor(opts) {
    super(opts);

    this.state = {
      showBet: false,
      showList: true
    };
  }

  onMenuClick = () => {
    this.setState(state => ({
      ...state,
      showList: !state.showList
    }));
  };

  onPredictionClick = () => {
    this.setState(state => ({
      ...state,
      showBet: !state.showBet
    }));
  };

  render() {
    return (
      <Main>
        <Header onMenuClick={this.onMenuClick} />
        <Counters />
        <Prediction onPredictClick={this.onPredictionClick} />
        <Range />
        {this.state.showBet && <Predict onClose={this.onPredictionClick} />}
        {this.state.showList && <List onClose={this.onMenuClick} />}
      </Main>
    );
  }
}
