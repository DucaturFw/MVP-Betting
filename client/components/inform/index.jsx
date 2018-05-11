import React, { Component } from 'react';
import styled from 'styled-components';

export default function({ status }) {
  if (status === 'success') {
    return null;
  }

  let text;
  switch (status) {
    case 'login': {
      text = 'To make bet please authorize in';
      break;
    }

    case 'bad_newtwork': {
      text = 'To make bet please switch into Ropsen Network';
      break;
    }

    case 'miss': {
      text = 'To make bet please install';
      break;
    }
  }

  return (
    <Wrap>
      {text}{' '}
      <a href="https://metamask.io" target="_blank">
        MetaMask
      </a>
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
`;
