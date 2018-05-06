import React, { Component } from 'react';
import styled from 'styled-components';

export default function ({ status }) {
  if (status === "success") {
    return null;
  }
  return (
    <Wrap>
      To make bet please install <a href="https://metamask.io" target="_blank">MetaMask</a>
    </Wrap>
  );
}

const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 50px;

  text-align: center;
  padding-top: 20px;
  font-size: 18px;

  background: red;
`
