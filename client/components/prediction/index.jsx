import React, { Component } from 'react';
import styled from 'styled-components';

export default function({ onPredictClick }) {
  return (
    <div className="button btn-prediction">
      <Btn className="bordered" onClick={onPredictClick}>
        MAKE PREDICTION
      </Btn>
    </div>
  );
}

const Btn = styled.div`
  box-sizing: border-box;
  background-image: url('./images/mvp  newbtnoutline.png');
`;
