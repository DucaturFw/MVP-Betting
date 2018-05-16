import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FA from 'react-fontawesome';

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
      loading: false,
      completed: false
    };
  }

  componentDidMount() {
    this.setState(
      state => ({
        loading: false,
        completed: false,
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
    this.setState(state => ({
      ...state,
      loading: true
    }));

    Wallet.createBet(this.state).then(({ events }) => {
      this.setState({ completed: true });
      const { LogToken } = events;
      console.log('fire event', LogToken);

      Wallet.fire(LogToken.returnValues);
    });
    // .catch(() => this.setState({ loading: false }));
  };

  get text() {
    return this.state.loading ? 'MetaMask transaction confirmation' : 'Your prediction for Bitcoin';
  }

  render() {
    return (
      <Wrapper onClose={this.props.onClose} name="predict">
        <Title>{this.text}</Title>
        <Container>
          {this.state.loading && (
            <div>
              {!this.state.completed && (
                <Text>
                  <p>Waiting for transaction confirmation</p>
                  <Icon name="spinner" spin size="4x" />
                </Text>
              )}
              {this.state.completed && (
                <Text completed>
                  <p>Transaction successfully confirmed</p>
                  <Icon name="check" size="4x" />
                </Text>
              )}
            </div>
          )}
          {!this.state.loading && (
            <div>
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
              {!this.state.available && <StyledText>{this.state.text}</StyledText>}
              <Item>
                <Label>Your bet in ETH</Label>
                <Input name="amount" value={this.state.amount} onChange={this.handleInput} />
              </Item>
            </div>
          )}
          {this.state.available && (
            <Btn onClick={this.handlePredict} hide={this.state.loading}>
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
  height: 584px;
  width: 530px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 17px;
  overflow: hidden;
`;

const Title = styled.div`
  width: 100%;
  margin: 50px auto 0;
  font-family: 'San Francisco', Helvetica, Arial, serif;
  font-size: 32px;
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

  display: ${props => (props.hide ? 'none' : 'block')};
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
  margin-top: 150px;
  text-align: center;
  font-size: 16px;
  font-family: 'AppleSystemUIFont', Helvetica, Arial, serif;
  color: ${props => (props.completed ? '#00B13E' : '#498FE1')};
`;

const StyledText = styled(Text)`
  margin-top: 15px;
`;

const Icon = styled(FA)`
  margin-top: 50px;
  text-align: center;
`;
