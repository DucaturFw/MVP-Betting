import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

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

    tokens.forEach(token => {
      const range = _.range(token.betFrom, token.betTo, 100);

      range.forEach(item => {
        if (range.includes(item)) {
          if (spread[item]) {
            spread[item].push(token);
          } else {
            spread[item] = [token];
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
      results.push(<Point key={i} src="./images/point.png" style={{ left: 75 + RANGE * i }} />);
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
            src="./images/delimeter.png"
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

        prop.forEach((token, idx) => tokens.push(this.processToken({ token, idx, key })));
      }
    }

    return tokens;
  }

  processToken({ token, idx, key }) {
    let curr = parseInt(this.props.curr, 10),
      price = parseInt(key, 10);

    let sign = price >= curr ? -1 : 1,
      startY = sign > 0 ? 12 : -1,
      x = (price - 6000) / 1000 * 150 + 84,
      y = startY + 10 * idx * sign;

    return (
      <Token
        key={`${token.dateBuy}${key}`}
        style={{ top: y, left: x }}
        type={price >= curr}
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
          <span>From:</span>
          <Value>{token.betFrom} $</Value>
        </div>
        <div>
          <span>To:</span>
          <Value>{token.betTo} $</Value>
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

  background-color: ${props => (props.type == true ? 'rgba(76, 215, 31, 0.78)' : 'rgba(215, 31, 31, 0.78)')};
  border-style: solid;
  border-width: 1px;
  border-color: ${props => (props.type == true ? 'rgba(76, 215, 31, 0.61)' : 'rgba(215, 31, 31, 0.61)')};
`;

const Tooltip = styled.div`
  width: 150px;
  height: 100px;
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
