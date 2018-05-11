import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Items from './items';

import Wallet from './../../models/wallet';
import { BET_LESS, BET_MORE } from './../../models/consts';

export default class Predict extends Component {
  constructor(opts) {
    super(opts);

    this.state = {
      bets: []
    };
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    window.addEventListener('click', this.onClose, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClose, false);
    this.node = null;
  }

  onClose = e => {
    if (!e.target.classList.contains('menu-icon') && !this.node.contains(e.target)) {
      this.props.onClose();
    }
  };

  get myTokens() {
    const { tokens } = this.props;
    const userAccount = Wallet.getUserAccount();

    return tokens.filter(token => {
      return token.ownerToken.toLowerCase() == userAccount.toLowerCase();
    });
  }

  render() {
    return (
      <Wrapper>
        <Title>Your Bids List</Title>
        <Container>
          <Items bets={this.myTokens} />
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background-color: rgba(255, 255, 255, 1);
  top: 133px;
  height: 584px;
  width: 955px;
  position: absolute;
  margin: 0;
  left: 243px;
  border-radius: 17px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  opacity: 0;
  transform: translateY(2.4rem);
  animation: showUp 0.25s cubic-bezier(0.06, 0.67, 0.37, 0.99) forwards;
`;

const Title = styled.div`
  height: auto;
  width: 240px;
  margin: 50px auto 0;
  font-family: 'San Francisco', Helvetica, Arial, serif;
  font-size: 36px;
  color: rgba(12, 38, 74, 1);
  text-align: center;
`;

const Container = styled.div`
  text-align: center;
  padding: 30px;
  overflow-y: auto;
`;
