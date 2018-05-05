import React, { Component } from 'react';
import BN from 'bn.js';

import Wallet from './../../models/wallet';
import { BET_LESS, BET_MORE } from './../../models/consts';

export default function({ tokens }) {
  const bears = tokens.filter(token => token.betType == BET_LESS).length;
  const bulls = tokens.filter(token => token.betType == BET_MORE).length;
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
