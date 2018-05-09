import React, { Component } from 'react';
import styled from 'styled-components';

import { BET_MORE, BET_LESS } from '../../../models/consts';
import Wallet from '../../../models/wallet';

const START_POINT = 97;
const STEP = 15;
const RANGE = 150;

const PRICE_RANGE = 100;

export default class Scale extends Component {
  constructor(opts) {
    super(opts);

    this.state = {
      spread: {},
      info: {}
    };
  }

  componentDidMount() {
    this.spreadTokens();
  }

  spreadTokens() {
    let { tokens } = this.props;
    let { spread } = this.state;
    let range = this.createRange();

    range.forEach(price => {
      tokens.forEach(token => {
        let bet = parseInt(token.bet);
        if (bet >= price && bet < price + PRICE_RANGE) {
          if (spread[bet]) {
            spread[bet].push(token);
          } else {
            spread[bet] = [token];
          }
        }
      });
    });

    this.setState({ spread });
  }

  createRange() {
    let { curr } = this.props;

    let currentCourse = parseInt(curr),
      min = currentCourse - 4000,
      max = currentCourse + 4000,
      prices = [];

    for (let i = min; i <= max; i = i + PRICE_RANGE) {
      prices.push(i);
    }

    return prices;
  }

  get points() {
    const results = [];

    for (let i = 0; i <= 8; i++) {
      results.push(<Point key={i} src="./images/mvp  newpath  3.png" style={{ left: 70 + RANGE * i }} />);
    }

    return results;
  }

  get negativeDel() {
    const results = [];

    for (let j = 0; j <= 7; j++) {
      for (let i = 0; i <= 8; i++) {
        results.push(
          <Delimeter
            key={`${j}${i}`}
            src="./images/mvp  newline 2  35.png"
            style={{ left: START_POINT + STEP * i + RANGE * j, top: j < 4 ? 10 : 0 }}
          />
        );
      }
    }

    return results;
  }

  get tokens() {
    const { spread } = this.state;
    const tokens = [];

    for (let key in spread) {
      if (spread.hasOwnProperty(key)) {
        let prop = spread[key];

        const positive = prop.filter(token => token.betType == BET_MORE);
        const negative = prop.filter(token => token.betType == BET_LESS);

        positive.forEach((token, idx) => tokens.push(this.processToken({ token, idx, key })));
        negative.forEach((token, idx) => tokens.push(this.processToken({ token, idx, key })));
      }
    }

    return tokens;
  }

  processToken({ token, idx, key }) {
    console.log(key);
    let sign = token.betType == 1 ? -1 : 1,
      startY = sign > 0 ? 12 : -1,
      x = (key - 6000) / 1000 * 150 + 84,
      y = startY + 10 * idx * sign;

    return (
      <Token
        key={`${token.dateBuy}`}
        style={{ top: y, left: x }}
        type={token.betType}
        onMouseEnter={this.mouseEnter.bind(this, { x, y, token })}
        onMouseLeave={this.mouseEnter.bind(this, {})}
      />
    );
  }

  mouseEnter({ x, y, token }) {
    this.setState({ info: { x, y, token } });
  }

  get tooltip() {
    if (!this.state.info.token) return null;

    const { token, x, y } = this.state.info;

    return (
      <Tooltip style={{ left: x - 70, top: y - 110 }}>
        <div>
          <span>Who:</span>
          <Value>{token.ownerToken}</Value>
        </div>
        <div>
          <span>Bet:</span>
          <Value>{token.bet} $</Value>
        </div>
        <div>
          <span>When:</span>
          <Value>{token.dateBuy}</Value>
        </div>
        <div>
          <span>Amount:</span>
          <Value>{Wallet.fromWei(token.payment)} ETH</Value>
        </div>
      </Tooltip>
    );
  }

  render() {
    return (
      <Container className={this.props.className}>
        <PreLine src="./images/mvp  newline  1.png" />
        <Line src="./images/mvp  newline.png" />
        <PreLine src="./images/mvp  newline  1.png" />
        {this.tokens}
        {this.points}
        {this.negativeDel}
        {this.tooltip}
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  display: flex;
`;

const PreLine = styled.img`
  height: 3px;
  width: 80px;
  position: relative;
  top: 9px;
`;

const Line = styled.img`
  position: relative;
  top: 9px;
  height: 3px;
`;

const Point = styled.img`
  position: absolute;
`;

const Delimeter = styled.img`
  position: absolute;
`;

const Token = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 14px;
  height: 10px;

  background-color: ${props => (props.type == 1 ? 'rgba(76, 215, 31, 0.78)' : 'rgba(215, 31, 31, 0.78)')};
  border-style: solid;
  border-width: 1px;
  border-color: ${props => (props.type == 1 ? 'rgba(76, 215, 31, 0.61)' : 'rgba(215, 31, 31, 0.61)')};
`;

const Tooltip = styled.div`
  width: 150px;
  height: 80px;
  position: absolute;
  z-index: 2;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 5px;
  padding: 5px 10px;

  color: white;
  overflow: hidden;

  font-size: 14px;
  font-family: 'San Francisco', Helvetica, Arial, serif;

  left: 795px;
  top: -110px;
`;

const Value = styled.span`
  display: inline-block;
  margin-left: 5px;
  font-weight: bold;
`;
