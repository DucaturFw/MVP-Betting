import React, { Component } from 'react';
import BN from 'bn.js';
import _ from 'lodash';

import Wallet from './../../models/wallet';

export default function({ tokens, curr }) {
  let ranges = tokens.map(token => _.range(token.betFrom, token.betTo, 100));
  let flatRanges = _.flatten(ranges);

  const bears = flatRanges.filter(price => price < curr).length;
  const bulls = flatRanges.filter(price => price >= curr).length;
  const sum = tokens.reduce((s, item) => s.add(new BN(item.payment, 10)), new BN(0, 10));
  const inEth = Wallet.fromWei(sum);

  return (
    <div>
      <div className="group2">
        <div className="group6">
          <div className="win-copy">WIN</div>
          <div className="a153-btc-copy">{inEth} ETH</div>
          <div className="w-in">WIN</div>
          <div className="a153-btc">{inEth} ETH</div>
        </div>
      </div>
      <div className="b-ears">BEARS</div>
      <div className="a900">{bears}</div>
      <div className="b-ulls">BULLS</div>
      <div className="a7645">{bulls}</div>
    </div>
  );
}
