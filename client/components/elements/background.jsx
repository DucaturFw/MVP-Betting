import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styled from 'styled-components';

export default function({ className, children }) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;

  top: 0;

  align-items: center;
  display: flex;
  justify-content: center;

  animation: showBack 0.25s cubic-bezier(0.06, 0.67, 0.37, 0.99) forwards;
`;
