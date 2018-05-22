import React, { Component } from 'react';

import Scale from './scale';
import Twitter from './twitter';

export default function({ tokens, curr }) {
  return (
    <div className="beting-line">
      <Scale tokens={tokens} curr={curr} />
      {/* <Twitter /> */}
    </div>
  );
}
