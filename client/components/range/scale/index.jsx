import React, { Component } from 'react';
import styled from 'styled-components';

import Lines from './lines';
import Labels from './labels';

export default function({ tokens, curr }) {
  return (
    <Wrap>
      <StyledLines curr={curr} tokens={tokens} />
      <Labels curr={curr} />
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  height: 120px;
  width: 1400px;
  margin: 0 auto;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const StyledLines = styled(Lines)`
  top: 80px;
`;
