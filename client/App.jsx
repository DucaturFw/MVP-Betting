import React, { Component } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import FA from 'react-fontawesome';
// import theme from './styles/theme';
import './styles/base.less';

import Back from './components/elements/background';

import Hub from './components/inform';
import Header from './components/header';
import Counters from './components/counters';
import Range from './components/range';
import Plus from './components/plus';

import Predict from './components/predict';
import List from './components/list';
import Terms from './components/terms';
import Oracles from './components/oracles';
import FAQ from './components/faq';

import wallet from './models/wallet';

export default class App extends Component {
  constructor(opts) {
    super(opts);

    this.state = {
      predict: false,
      bids: false,
      terms: false,
      oracles: false,
      faq: false,
      loading: true,
      data: {}
    };

    this.handlePredict = this.onMenuClick.bind(this, 'predict');
  }

  componentDidMount() {
    wallet.init().then(data => {
      let status = wallet.getStatus();

      this.setState({
        loading: false,
        data,
        status
      });
    });
    wallet.subscription(this.update.bind(this));
  }

  update(data) {
    this.setState({ data });
  }

  onMenuClick = e => {
    this.setState(state => ({
      ...state,
      [e]: !state[e]
    }));
  };

  render() {
    console.log('state', this.state);

    if (this.state.loading) {
      return (
        <IconWrap>
          <FA name="spinner" spin size="4x" />
        </IconWrap>
      );
    }

    return (
      <div>
        <Hub status={this.state.status} />
        <Header onMenuClick={this.onMenuClick} />
        <Counters tokens={this.state.data.tokens} curr={this.state.data.currRate} onPredictClick={this.handlePredict} />
        {/* <Range tokens={this.state.data.tokens} curr={this.state.data.currRate} /> */}
        <Plus />
        {this.state.oracles && (
          <Back>
            <Oracles onClose={this.onMenuClick} />
          </Back>
        )}
        {this.state.faq && (
          <Back>
            <FAQ onClose={this.onMenuClick} />
          </Back>
        )}
        {this.state.bids && (
          <Back>
            <List onClose={this.onMenuClick} tokens={this.state.data.tokens} />
          </Back>
        )}
        {this.state.predict && (
          <Back>
            <Predict onClose={this.onMenuClick} status={this.state.status} />
          </Back>
        )}
        {this.state.terms && (
          <Back>
            <Terms onClose={this.onMenuClick} />
          </Back>
        )}
      </div>
    );
  }
}

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  top: 45%;
  width: 100%;

  color: #ccc;
`;
