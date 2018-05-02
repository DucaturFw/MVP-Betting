import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Items from './items';

export default class Predict extends Component {
  constructor(opts) {
    super(opts);

    this.state = {
      bets: [
        {
          price: 10400,
          date: Date.now(),
          bet: 1.121,
          result: 'active'
        },
        {
          price: 9000,
          date: Date.now(),
          bet: 2,
          result: 'active'
        }
      ]
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

  render() {
    return (
      <Wrapper>
        <Title>Your Bids List</Title>
        <Container>
          <Items bets={this.state.bets} />
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
`;
