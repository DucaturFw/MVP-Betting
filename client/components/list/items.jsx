import React, { Component } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const FORMAT = 'D MMMM YYYY';

export default function ({ bets }) {
  const items = bets.map((bet, idx) => {
    return (
      <RowTable key={idx}>
        <Col1>1 Bitcoin = ${bet.price}</Col1>
        <Col2>{format(bet.date, FORMAT)}</Col2>
        <Col3>{bet.bet} ETHv</Col3>
        <Col4>{bet.result}</Col4>
        <Col5>Status</Col5>
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
