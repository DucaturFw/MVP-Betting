import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import Wallet from './../../models/wallet';
import { BET_LESS, BET_MORE } from './../../models/consts';

const FORMAT = 'D MMMM YYYY';

export default function({ bets }) {
  const items = bets.map((bet, idx) => {
    console.log(bet);
    return (
      <RowTable key={idx}>
        <Col1>1 Bitcoin = ${bet.bet}</Col1>
        <Col2>{format(bet.dateBuy * 1e3, FORMAT)}</Col2>
        <Col3>{Wallet.fromWei(bet.price)} ETH</Col3>
        <Col4>{bet.result}</Col4>
        <Col5>
          <Btn onClick={Wallet.redeemToken.bind(Wallet, bet.id)}>withdraw</Btn>
        </Col5>
      </RowTable>
    );
  });

  return (
    <div>
      <RowHeader>
        <Col1>YouBid</Col1>
        <Col2>Date</Col2>
        <Col3>Bet</Col3>
        <Col4>Result</Col4>
        <Col5>Status</Col5>
      </RowHeader>
      {items}
    </div>
  );
}

const Row = styled.div`
  font-family: 'AppleSystemUIFont', Helvetica, Arial, serif;
  line-height: 18px;
  display: flex;
  text-align: left;
  padding: 10px 0;

  color: rgba(49, 53, 65, 1);
`;
const RowTable = Row.extend`
  border-bottom: 1px solid #eee;
  font-size: 16px;
`;
const RowHeader = Row.extend`
  font-size: 18px;
`;

const Col1 = styled.div`
  width: 250px;
`;
const Col2 = styled.div`
  width: 200px;
`;
const Col3 = styled.div`
  width: 150px;
`;
const Col4 = styled.div`
  width: 200px;
`;
const Col5 = styled.div`
  width: 200px;
`;

const Btn = styled.div`
  box-sizing: border-box;
  width: 92px;
  height: 26px;

  text-align: center;
  color: white;
  font-size: 14px;
  padding-top: 4px;

  cursor: pointer;

  background: url('./images/btn_w.png');
`;
