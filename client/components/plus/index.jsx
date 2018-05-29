import React, { Component } from 'react';
import styled from 'styled-components';

export default function({}) {
  return (
    <footer>
      <h2 className="gide">Steps Guide</h2>
      <div className="row title-result">
        <div className="col-lg-2 col-md-4 col-4 marg">
          <img src="./images/guide/choose.png" alt="" />
          <p className="desc">
            1. Choose Condition
            <br /> of your Prediction
          </p>
        </div>
        <div className="col-md-4 col-4 col-lg-2 marg">
          <img src="./images/guide/prediction.png" alt="" />
          <p className="desc">
            2. Write Prediction
            <br /> and Bid Price
          </p>
        </div>
        <div className="col-md-4 col-4 col-lg-2 marg">
          <img src="./images/guide/btc-cash.png" alt="" />
          <p className="desc">
            3. Pay by MetaMask
            <br /> your Bid Price
          </p>
        </div>
        <div className="col-md-4 col-4 col-lg-2 marg">
          <img src="./images/guide/successful.png" alt="" />
          <p className="desc">
            4. You Successful
            <br /> Place the Bid
          </p>
        </div>
        <div className="col-md-4 col-4 col-lg-2 marg">
          <img src="./images/guide/wait.png" alt="" />
          <p className="desc">
            5. Wait for
            <br /> Prediction Date
          </p>
        </div>
        <div className="col-md-4 col-4 col-lg-2 marg">
          <img src="./images/guide/btc-cash.png" alt="" />
          <p className="desc">
            6. Withdraw your
            <br /> Reward if you Win
          </p>
        </div>
        <div className="your-prediction">
          You always can see your current predictions in
          <span className="bids-list">Bids List</span>
          <div className="logo2">
            <img src="./images/logo.svg" alt="logo" />
          </div>
        </div>
      </div>
    </footer>
  );
}
