import React, { Component } from 'react';
import styled from 'styled-components';

export default function({}) {
  return (
    <Container>
      <Item>
        <img src="./images/step1.png" />
        <Title>1. Choose Condition of your Prediction</Title>
      </Item>
      <Item>
        <img src="./images/step2.png" />
        <Title>2. Write Prediction and Bid Price</Title>
      </Item>
      <Item>
        <img src="./images/step3.png" />
        <Title>3. Pay by MetaMask your Bid Price</Title>
      </Item>
      <Item>
        <img src="./images/step4.png" />
        <Title>4. You successful Place the Bid</Title>
      </Item>
      <Item>
        <img src="./images/step5.png" />
        <Title>5. Wait for prediction Date</Title>
      </Item>
      <Item>
        <img src="./images/step6.png" />
        <Title>6. Withdraw your Reward if you Win</Title>
      </Item>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 850px;
  width: 100%;
  font-family: 'San Francisco', Helvetica, Arial, serif;
`;

const Item = styled.div`
  width: 160px;
  text-align: center;
`;

const Title = styled.div`
  margin-top: 15px;
  font-size: 16px;
  color: white;
`;
