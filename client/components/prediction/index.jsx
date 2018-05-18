import React, { Component } from 'react';
import styled from 'styled-components';

export default function({ onPredictClick }) {
  return (
    <div>
      <Btn className="button btn-prediction" onClick={onPredictClick}>
        MAKE PREDICTION
      </Btn>
    </div>
  );
}

const Btn = styled.div`
  box-sizing: border-box;
  background-image: url('./images/mvp  newbtnoutline.png');

  font-family: 'Montserrat-Regular', Helvetica, Arial, serif;
  font-size: 24px;
  color: white;

  text-align: center;
  padding-top: 23px;

  cursor: pointer;
`;
