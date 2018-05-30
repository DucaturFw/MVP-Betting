import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import Wallet from './../../models/wallet';
import { BET_LESS, BET_MORE } from './../../models/consts';

const FORMAT = 'D MMMM YYYY';

export default function({ bets }) {
  const items = bets.map((bet, idx) => {
    console.log('bet', bet);
    return (
      <div className="row rowe" key={idx}>
        <div className="col  colum high">
          1 Bitcoin = ${bet.betFrom} - ${bet.betTo}
        </div>
        <div className="col  colum high">{format(bet.dateBuy * 1e3, FORMAT)}</div>
        <div className="col  colum ">{Wallet.fromWei(bet.price)} ETH</div>
        <div className="col  colum ">{bet.result}</div>
        <div className="col  colum with">
          <Btn onClick={Wallet.redeemToken.bind(Wallet, bet.id)}>withdraw</Btn>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="row rowe main">
        <div className="col colum">Your Bid</div>
        <div className="col colum">Date</div>
        <div className="col colum">Bet</div>
        <div className="col colum">Result</div>
        <div className="col colum">Status</div>
      </div>
      {items}
    </div>
  );
}

const Row = styled.div`
  font-family: 'Montserrat-Regular', Helvetica, Arial, serif;
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

const Btn = styled.span`
  color: #ffffff;
  font-family: 'Montserrat Medium';
  font-size: 0.8em;
  font-weight: 500;
  cursor: pointer;

  border-radius: 4px;
  background-image: linear-gradient(180deg, #b4ec51 0%, #429321 100%);
  padding: 0.194em 0.25em 0.139em 0.25em;
  text-align: center;
`;
