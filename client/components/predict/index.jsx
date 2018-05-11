import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Popup from './../elements/popup';

import Wallet from './../../models/wallet';
import { BET_LESS, BET_MORE } from './../../models/consts';

export default class Predict extends Component {
  constructor(opts) {
    super(opts);

    this.state = {
      bet: BET_MORE,
      price: 10000,
      amount: 1,
      more: 0,
      less: 0,
      text: '',
      available: false,
      loading: false
    };
  }

  componentDidMount() {
    this.setState(
      state => ({
        ...state,
        ...Wallet.getRange()
      }),
      this.setParams
    );
  }

  setParams() {
    this.setState(state => ({ text: this.getText(state) }), this.setAvailble);
  }

  getText({ more, less, bet }) {
    return bet === BET_MORE ? `Price must be more than ${more}` : `Price must be less than ${less}`;
  }

  setAvailble = () => {
    const { bet, price, more, less } = this.state;
    const available = bet === BET_MORE ? price > more : price < less;

    this.setState(state => ({
      ...state,
      available: available && this.props.status === 'success'
    }));
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value }, this.setParams);
  };

  handlePredict = () => {
    this.setState({ loading: true });

    Wallet.createBet(this.state).then(({ events }) => {
      const { LogToken } = events;

      console.log('fire event', LogToken);
      Wallet.fire(LogToken.returnValues);
    });
    // .catch(() => this.setState({ loading: false }));
  };

  render() {
    if (this.state.loading) {
      return (
        <Wrapper onClose={this.props.onClose}>
          <Text>Loading...</Text>
        </Wrapper>
      );
    }

    return (
      <Wrapper onClose={this.props.onClose}>
        <Title>Your prediction for Bitcoin</Title>
        <Container>
          <Item>
            <Label>Condition</Label>
            <InputSelect name="bet" onChange={this.handleInput} value={this.state.bet}>
              <option value={BET_MORE}>Price will be Higher than</option>
              <option value={BET_LESS}>Price will be Lower than</option>
            </InputSelect>
          </Item>
          <Item>
            <Label>Price prediction</Label>
            <Input name="price" value={this.state.price} onChange={this.handleInput} />
            <Dollor>$</Dollor>
          </Item>
          {!this.state.available && <Text>{this.state.text}</Text>}
          <Item>
            <Label>Your bet in ETH</Label>
            <Input name="amount" value={this.state.amount} onChange={this.handleInput} />
          </Item>

          {this.state.available && (
            <Btn onClick={this.handlePredict}>
              <img className="b-t-noutline" src="./images/btn.png" />
              <BtnLabel>Make Prediction</BtnLabel>
            </Btn>
          )}
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Popup)`
  background-color: rgba(255, 255, 255, 1);
  top: 133px;
  height: 584px;
  width: 530px;
  position: absolute;
  margin: 0;
  left: 455px;
  border-radius: 17px;
  overflow: hidden;
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
  margin-top: 30px;
`;

const Item = styled.div`
  margin-top: 30px;
  position: relative;
`;

const Label = styled.div`
  font-family: 'AppleSystemUIFont', Helvetica, Arial, serif;
  font-size: 18px;
  color: rgba(49, 53, 65, 1);
  line-height: 22px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 250px;
  padding: 10px 12px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #aaa;
`;
const InputSelect = Input.withComponent('select');

const Dollor = styled.div`
  position: absolute;
  top: 35px;
  right: 160px;
  font-family: 'AppleSystemUIFont', Helvetica, Arial, serif;
  font-size: 18px;
  color: rgba(49, 53, 65, 1);
`;

const Btn = styled.div`
  margin-top: 35px;
  position: relative;
  cursor: pointer;
`;

const BtnLabel = styled.div`
  font-family: 'AppleSystemUIFont', Helvetica, Arial, serif;
  font-size: 18px;
  letter-spacing: 0.86px;
  line-height: 22px;

  position: absolute;
  top: 15px;
  left: 195px;
  color: white;
`;

const Text = styled.div`
  margin-top: 15px;
  text-align: center;
`;
