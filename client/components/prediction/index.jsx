import React, { Component } from 'react';
import styled from 'styled-components';

export default function({ onPredictClick }) {
  return (
    <div>
      <div className="group2">
        <div className="group6">
          <div className="win-copy">WIN</div>
          <div className="a153-btc-copy">153 BTC</div>
          <div className="w-in">WIN</div>
          <div className="a153-btc">153 BTC</div>
        </div>
      </div>
      <Btn className="button btn-prediction" onClick={onPredictClick}>
        MAKE PREDICTION
      </Btn>
    </div>
  );
}

const Btn = styled.div`
  box-sizing: border-box;
  background-image: url('./images/mvp  newbtnoutline.png');

  font-family: 'San Francisco', Helvetica, Arial, serif;
  font-size: 24px;
  color: white;

  text-align: center;
  padding-top: 23px;

  cursor: pointer;
`;
