import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FA from 'react-fontawesome';

import Popup from './../elements/popup';

import Wallet from './../../models/wallet';

export default class Predict extends Component {
  constructor(opts) {
    super(opts);

    this.state = {
      from: 10000,
      to: 10100,
      amount: 0.1,
      text: '',
      available: false,
      loading: false,
      completed: false,
      difference: 100
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

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value }, this.setParams);
  };

  setParams() {
    this.setAvailble();
    this.setDifference();
  }

  setDifference() {
    const { from, amount } = this.state;
    const price = parseFloat(amount, 10);
    const difference = price > 1 ? 1000 : Math.round(price / 0.1) * 100;

    this.setState({
      difference,
      text: `Your available range is from:${from} to ${+from + +difference}`
    });
  }

  setAvailble = () => {
    const { from, to, difference } = this.state;
    const raz = to - from;
    const available = raz > 0 && raz <= difference;

    this.setState(state => ({
      ...state,
      available: available && this.props.status === 'success'
    }));
  };

  handlePredict = () => {
    if (this.state.available) {
      this.setState(state => ({
        ...state,
        loading: true
      }));

      Wallet.createBet(this.state).then(({ events }) => {
        this.setState({ completed: true });
        const { LogToken } = events;

        Wallet.fire(LogToken.returnValues);
      });
    }
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
                <Label>Your bet in ETH</Label>
                <Input name="amount" value={this.state.amount} onChange={this.handleInput} />
              </Item>
              <Item>
                <Label>From</Label>
                <InputDollar name="from" value={this.state.from} onChange={this.handleInput} />
              </Item>
              <Item>
                <Label>To</Label>
                <InputDollar name="to" value={this.state.to} onChange={this.handleInput} />
              </Item>
              <StyledText>{this.state.text}</StyledText>
            </div>
          )}
          <Btn onClick={this.handlePredict} hide={this.state.loading} available={this.state.available}>
            <BtnLabel>Make Prediction</BtnLabel>
          </Btn>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Popup)`
  background-color: rgba(255, 255, 255, 1);
  padding: 20px 40px;
  border-radius: 17px;
  overflow: hidden;
`;

const Title = styled.div`
  width: 100%;
  margin: 50px auto 0;
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
  font-size: 18px;
  color: rgba(49, 53, 65, 1);
  line-height: 22px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  height: 40px;
  width: 240px;

  outline: none;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  padding: 19px 5% 19px 12px;
  font-size: 13px;
  color: #222051;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 700;
  box-shadow: inset 0 0 0 3px rgba(0, 153, 250, 0.15);
  border-radius: 4px;
  border: 1px solid #0099fa;
  background-color: #ffffff;
`;

const InputDollar = styled(Input)`
  background-image: url(./images/dollar.png);
  background-repeat: no-repeat;
  background-position: 220px;
`;

const Btn = styled.div`
  margin-top: 35px;
  position: relative;
  cursor: ${props => (props.available ? 'pointer' : 'not-allowed')};

  display: ${props => (props.hide ? 'none' : 'block')};
`;

const BtnLabel = styled.div`
  width: 218px;
  height: 53px;
  border-radius: 9px;
  background-image: linear-gradient(135deg, #3023ae 0%, #c86dd7 100%);
  text-align: center;
  color: #ffffff;
  font-family: 'Montserrat Medium';
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.86px;
  margin: 53px auto 54px auto;
  padding: 14px;
`;

const Text = styled.div`
  margin-top: 150px;
  text-align: center;
  font-size: 16px;
  color: ${props => (props.completed ? '#00B13E' : '#498FE1')};
`;

const StyledText = styled(Text)`
  margin-top: 15px;
`;

const Icon = styled(FA)`
  margin-top: 50px;
  text-align: center;
`;

const Img = styled.img`
  opacity: ${props => (props.available ? '1' : '0.5')};
`;
