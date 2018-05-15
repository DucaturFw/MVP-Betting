import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Popup from './../elements/popup';

export default class Oracles extends Component {
  render() {
    return (
      <Wrapper onClose={this.props.onClose} name="faq">
        <Title>FAQ</Title>
        <Container />
      </Wrapper>
    );
  }
}

const Wrapper = styled(Popup)`
  background-color: rgba(255, 255, 255, 1);
  height: 584px;
  width: 955px;
  border-radius: 17px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  height: auto;
  width: 240px;
  margin: 50px auto 0;
  font-family: 'San Francisco', Helvetica, Arial, serif;
  font-size: 36px;
  color: rgba(12, 38, 74, 1);
  text-align: center;
`;

const Container = styled.div`
  padding: 30px;
  overflow-y: auto;
  font-family: 'AppleSystemUIFont', Helvetica, Arial, serif;
`;
