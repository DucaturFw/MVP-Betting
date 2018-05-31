import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Popup from './../elements/popup';
import Item from './item';

export default class Oracles extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Wrapper onClose={this.props.onClose} name="faq" className="faq toggleable">
        <h1>faq</h1>
        <Container>
          <Item
            question="How to participate in the game?"
            answer={`Install the application for browser - <a href="https://metamask.io/">https://metamask.io/</a>, log in to your account. On the game’s web page click the button “make precision”, choose your bet. Now you’re in!`}
          />
          <Item
            question="How is the game going?"
            answer={`To begin with, ensure that you have already installed MetaMask and that there is enough money in Ethereum.
            For example, if you and another 9 people make bets and 4 of them win. The bets of 6 losers (excluding the
            website commission of 5%) share between 4 winners.`}
          />
          <Item
            question="In what currency is the bet accepted?"
            answer={`Install the application for browser - <a href="https://metamask.io/">https://metamask.io/</a>, log in to your account. On the game’s web page click the button “make precision”, choose your bet. Now you’re in!`}
          />
          <Item
            question="How to participate in the game?"
            answer={`Install the application for browser - <a href="https://metamask.io/">https://metamask.io/</a>, log in to your account. On the game’s web page click the button “make precision”, choose your bet. Now you’re in!`}
          />
          <Item
            question="What gets the winner?"
            answer={`If your prediction turned to be right, you will receive the amount of bets placed against your position
            excluding the commission for transaction.`}
          />
          <Item
            question="What loses the loser?"
            answer={`If your prediction turned to be right, you will receive the amount of bets placed against your position
            excluding the commission for transaction.`}
          />
          <Item
            question="How do you ensure that the currency rate is correct?"
            answer={`We provide the open log of currency rate information supply in Oracle. Also, you always can check the data
            via <a href="https://coinmarketcap.com/">https://coinmarketcap.com/</a>.`}
          />
          <Item
            question="From which sources the Oracle collects information?"
            answer={`We synchronize the data with TOP-5 cryptocurrency exchanges: OKEx, Binance, Bitfinex, Huobi, Upbit.`}
          />
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Popup)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`;

const Container = styled.div`
  /* overflow-y: auto; */
  padding-bottom: 30px;
`;
