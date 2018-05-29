import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Popup from './../elements/popup';
import Item from './item';

export default class Oracles extends Component {
  render() {
    return (
      <Wrapper onClose={this.props.onClose} name="faq" className="faq toggleable">
        <h1>faq</h1>
        <div className="li">
          <h2>Question One</h2>
        </div>
        <div className="li-sel">
          <h2>Question Two</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna aliquam erat volutpat.
            <br /> Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
            aliquip ex ea commodo consequat.
            <br /> Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
            dolore eu feugiat nulla facilisis at vero eros et
            <br />accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te
            feugait nulla facilisi.
          </p>
        </div>
        <div className="li">
          <h2>Question Three</h2>
        </div>
        <div className="li">
          <h2>Question Four</h2>
        </div>
        <div className="li">
          <h2>Question Five</h2>
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Popup)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
