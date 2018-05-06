import React, { Component } from 'react';
import styled from 'styled-components';
import { BET_MORE, BET_LESS } from '../../../models/consts';

const START_POINT = 97;
const STEP = 14;
const RANGE = 150;

const PRICE_RANGE = 100;

export default class Scale extends Component {

  constructor(opts) {
    super(opts);

    this.state = {
      spread: {}
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
      })
    })

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
    let sign = token.betType == 1 ? -1 : 1,
      startY = sign > 0 ? 12 : -1,
      x = (parseInt(token.bet) - 4000) / 1000 * 150 - 219,
      y = startY + 10 * idx * sign;

    return <Token key={`${token.dateBuy}`} style={{ top: y, left: x }} type={token.betType} />;
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

  background-color: ${ props => props.type == 1 ? 'rgba(76, 215, 31, 0.78)' : 'rgba(215, 31, 31, 0.78)'};
  border-style: solid;
  border-width: 1px;
  border-color: ${ props => props.type == 1 ? 'rgba(76, 215, 31, 0.61)' : 'rgba(215, 31, 31, 0.61)'};
`;
