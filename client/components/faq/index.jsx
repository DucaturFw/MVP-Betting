import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Popup from './../elements/popup';
import Item from './item';

export default class Oracles extends Component {
  render() {
    return (
      <Wrapper onClose={this.props.onClose} name="faq">
        <Title>FAQ</Title>
        <Container>
          <Item
            question={'How to participate in the game?'}
            answer={`Install the application for browser - <a href="https://metamask.io/" target="_blank">https://metamask.io/</a>, log in to
            your account. On the game’s web page click the button “make precision”, choose your bet. Now you’re in!`}
          />
          <Item
            question={'How is the game going?'}
            answer={`To begin with, ensure that you have already installed MetaMask and that there is enough money in Ethereum. For example, if you and another 9 people make bets and  4 of them win. The bets of 6 losers (excluding the website commission of 5%) share between 4 winners`}
          />
          <Item
            question={'In what currency is the bet accepted?'}
            answer={`All bets are accepted only in Ethereum (ETH)`}
          />
          <Item
            question={'What gets the winner? '}
            answer={`If your prediction turned to be right, you will receive the amount of bets placed against your position excluding the commission for transaction.`}
          />
          <Item
            question={'What loses the loser?'}
            answer={`If your prediction turned to be wrong, your bet is going to the winner.`}
          />
          <Item
            question={'How do you ensure that the currency rate is correct?'}
            answer={`We provide the open log of currency rate information supply in Oracle. Also, you always can check the data via <a href="https://coinmarketcap.com/" target="_blank">https://coinmarketcap.com/</a> .`}
          />
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Popup)`
  background-color: rgba(255, 255, 255, 1);
  height: 584px;
  width: 955px;
  border-radius: 17px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  height: auto;
  width: 240px;
  margin: 50px auto 0;
  font-family: 'Montserrat-Regular', Helvetica, Arial, serif;
  font-size: 36px;
  color: rgba(12, 38, 74, 1);
  text-align: center;
`;

const Container = styled.div`
  padding: 30px;
  overflow-y: auto;
  font-family: 'Montserrat-Regular', Helvetica, Arial, serif;
`;
