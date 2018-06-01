import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import BN from 'bn.js';

import Wallet from './../../../models/wallet';

const PRICE_RANGE = 100;

export default class Scale extends Component {
  prices = [];

  state = {
    spread: {}
  };

  componentWillMount() {
    this.setPrices();
    this.spreadTokens();
  }

  setPrices() {
    let currentCourse = parseInt(this.props.curr),
      min = currentCourse - 4000,
      max = currentCourse + 4000;

    for (let i = min; i <= max; i = i + 1000) {
      this.prices.push(i);
    }
  }

  spreadTokens() {
    let { tokens } = this.props,
      rangeSpread = this.createRange(),
      spread = _.clone(this.state.spread);

    tokens.forEach(token => {
      const range = _.range(token.betFrom, token.betTo, 100);

      console.log(range);
      range.forEach(item => {
        if (rangeSpread.includes(item)) {
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

  getInvisible() {
    return <div className="invidible_elements" />;
  }

  getNegative(i, j) {
    let price = 6000 + 1000 * i + 100 * j,
      cls;

    switch (j) {
      case 0:
        cls = 'elementNFirst';
        break;
      case 9:
        cls = 'elementNLast';
        break;
      default:
        cls = 'elementN';
    }

    if (this.state.spread[price]) {
      return (
        <div className="elementANegative">
          <NegToken
            tokens={this.state.spread[price].length}
            onMouseEnter={this.mouseEnter.bind(this, price)}
            onMouseLeave={this.mouseEnter.bind(this, null)}
          />
        </div>
      );
    } else {
      return <div className={cls} />;
    }
  }

  getPositive(i, j) {
    let price = 6000 + 1000 * i + 100 * j,
      cls;

    switch (j) {
      case 0:
        cls = 'elementNFirst';
        break;
      case 9:
        cls = 'elementNLast';
        break;
      default:
        cls = 'elementN';
    }

    if (this.state.spread[price]) {
      return (
        <div className="elementAPositive">
          <PosToken
            tokens={this.state.spread[price].length}
            onMouseEnter={this.mouseEnter.bind(this, price)}
            onMouseLeave={this.mouseEnter.bind(this, null)}
          />
        </div>
      );
    } else {
      return <div className={cls} />;
    }
  }

  mouseEnter(price, event) {
    let rect = event.target.getBoundingClientRect();
    this.setState({ price, rect });
  }

  get tooltip() {
    if (!this.state.price) return null;

    const { price, rect, spread } = this.state;
    const tokens = spread[price];
    const sum = tokens.reduce((s, item) => s.add(new BN(item.payment, 10)), new BN(0, 10));
    const inEth = Wallet.fromWei(sum.toString());

    return (
      <Tooltip style={{ left: rect.left + 40, top: 30 }}>
        <div>
          <span>Total bids: {inEth} ETH</span>
        </div>
      </Tooltip>
    );
  }

  get items() {
    let elements = [],
      times = new Array(10).fill(1);

    for (let i = 0; i < 8; i++) {
      if (i < 4) {
        elements.push(
          <div className="element_line">
            <div className="element_line_column">
              <div className="block_elements_line">{times.map((j, idx) => this.getInvisible(i, idx))}</div>
              <div className="block_elements_line">
                <div className="line_center" />
              </div>
              <div className="block_elements_line">{times.map((j, idx) => this.getNegative(i, idx))}</div>
            </div>
          </div>
        );
      } else {
        elements.push(
          <div className="element_line ">
            <div className="element_line_column ">
              <div className="block_elements_line">{times.map((j, idx) => this.getPositive(i, idx))}</div>
              <div className="block_elements_line ">
                <div className="line_center " />
              </div>
              <div className="block_elements_line">{times.map((j, idx) => this.getInvisible(i, idx))}</div>
            </div>
          </div>
        );
      }

      elements.push(
        <div className="image">
          <span className="price1">${this.prices[i + 1]}</span>

          <img src="./images/Path.png" className="rubin" />
        </div>
      );
    }

    return elements;
  }

  render() {
    return (
      <div className="container_fluid scale">
        <div className="container_line">
          <div className="content_line">
            <div className="element_line_side">
              <div className="element_line_column">
                <div className="block_elements_line">
                  <div className="line_center_side">
                    <div className="element_side" />
                    <div className="element_side" />
                    <div className="element_side" />
                  </div>
                </div>
              </div>
            </div>

            <div className="image">
              <span className="price1">${this.prices[0]}</span>

              <img src="./images/Path.png" className="rubin" />
            </div>

            {this.items}

            <div className="element_line_side ">
              <div className="element_line_column ">
                <div className="block_elements_line ">
                  <div className="line_center_side ">
                    <div className="element_side " />
                    <div className="element_side " />
                    <div className="element_side " />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.tooltip}
        </div>
      </div>
    );
  }
}

const NegToken = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => props.tokens * 0.2 + 'em'};
  background: red;
`;

const PosToken = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => props.tokens * 0.2 + 'em'};
  background: #48c72f;
  transform: translateY(-100%);
  top: 0.25em;
`;

const Tooltip = styled.div`
  width: 100px;
  height: 40px;
  position: absolute;
  z-index: 2;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 5px;
  padding: 5px 10px;

  color: white;
  overflow: hidden;

  font-size: 14px;

  left: 795px;
  top: -110px;
`;
