import React, { Component } from 'react';
import BN from 'bn.js';
import _ from 'lodash';

import Wallet from './../../models/wallet';

export default function({ tokens, curr, onPredictClick }) {
  let ranges = tokens.map(token => _.range(token.betFrom, token.betTo, 100));
  let flatRanges = _.flatten(ranges);

  const bears = flatRanges.filter(price => price < curr).length;
  const bulls = flatRanges.filter(price => price >= curr).length;
  const sum = tokens.reduce((s, item) => s.add(new BN(item.payment, 10)), new BN(0, 10));
  const inEth = Wallet.fromWei(sum.toString());

  // console.log(onPredictClick);

  return (
    <div>
      <div className="win">
        <p>
          win&nbsp;
          <span>{inEth}</span> eth
        </p>
      </div>
      <div className="row title-result mb">
        <div className="col-6 col-md-4 bull ">
          <img src="./images/bull.png" alt="" />
          <p className="name">bulls</p>
          <div className="square">{bulls}</div>
        </div>
        <div className="col-sm-4 vs">
          <div className="row">
            <div className="col">
              <p className="name">bulls</p>
              <div className="square">{bulls}</div>
            </div>
            <div className="col-sm-1" />
            <div className="col">
              <p className="name">bears</p>
              <div className="square">{bears}</div>
            </div>
          </div>
          <div onClick={onPredictClick} className="bottom-bet">
            <div>Make prediction</div>
          </div>
        </div>
        <div className="col-6 col-md-4 bear">
          <img src="./images/bear.png" alt="" />
          <p className="name">bears</p>
          <div className="square">{bears}</div>
        </div>
        <div className="bottom-bet" onClick={onPredictClick}>
          <div>Make prediction</div>
        </div>
      </div>
    </div>
  );
}
