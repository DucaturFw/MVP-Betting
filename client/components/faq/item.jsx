import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import FA from 'react-fontawesome';

import Popup from './../elements/popup';

export default class Oracles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleState = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <Item>
        <Question>
          {this.props.question}
          <Icon name="chevron-down" onClick={this.handleState} />
          <Answer show={this.state.open} dangerouslySetInnerHTML={{ __html: this.props.answer }} />
        </Question>
      </Item>
    );
  }
}

const Item = styled.div`
  margin-bottom: 10px;
`;

const Question = styled.div`
  position: relative;
  background: #eee;
  padding: 20px;
  border-radius: 5px;
`;

const Icon = styled(FA)`
  position: absolute;
  top: 20px;
  right: 10px;
  color: #666;
  font-size: 18px;
  cursor: pointer;
`;

const Answer = styled.div`
  margin-top: 20px;
  display: ${props => (props.show ? 'block' : 'none')};
  color: #666;

  animation: showAll 0.25s cubic-bezier(0.06, 0.67, 0.37, 0.99) forwards;
`;
