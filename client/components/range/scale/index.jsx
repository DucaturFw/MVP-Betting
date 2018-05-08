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
`;

const StyledLines = styled(Lines)`
  top: 80px;
`;
