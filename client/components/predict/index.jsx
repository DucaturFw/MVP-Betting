import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export default class Predict extends Component {
  constructor(opts) {
    super(opts);

    this.state = {
      bet: 1,
      price: 10000,
      amount: 1
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
    if (!e.target.classList.contains('btn-prediction') && !this.node.contains(e.target)) {
      this.props.onClose();
    }
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePredict = () => {
    console.log(this.state);
  };

  render() {
    return (
      <Wrapper>
        <Title>Your prediction for Bitcoin</Title>
        <Container>
          <Item>
            <Label>Condition</Label>
            <InputSelect name="bet" onChange={this.handleInput} value={this.state.bet}>
              <option value="1">Price will be Higher than</option>
              <option value="2">Price will be Lower than</option>
            </InputSelect>
          </Item>
          <Item>
            <Label>Price prediction</Label>
            <Input name="price" value={this.state.price} onChange={this.handleInput} />
            <Dollor>$</Dollor>
          </Item>
          <Item>
            <Label>Your bet in ETH</Label>
            <Input name="amount" value={this.state.amount} onChange={this.handleInput} />
          </Item>

          <Btn onClick={this.handlePredict}>
            <img className="b-t-noutline" src="./images/btn.png" />
            <BtnLabel>Make Prediction</BtnLabel>
          </Btn>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background-color: rgba(255, 255, 255, 1);
  top: 133px;
  height: 584px;
  width: 530px;
  position: absolute;
  margin: 0;
  left: 455px;
  border-radius: 17px;
  overflow: hidden;

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
