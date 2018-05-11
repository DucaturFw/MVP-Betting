import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styled from 'styled-components';

export default class Popup extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  };

  constructor(opts) {
    super(opts);

    this.state = {
      justMounted: false
    };
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    window.addEventListener('click', this.onClose, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClose, false);
    this.node = null;
  }

  onClose = e => {
    if (this.node.contains(e.target)) {
      return;
    }

    if (!this.state.justMounted) {
      this.setState({ justMounted: true });
    } else {
      this.props.onClose(this.props.name);
    }
  };

  render() {
    return <Wrapper {...this.props}>{this.props.children}</Wrapper>;
  }
}

const Wrapper = styled.div`
  opacity: 0;
  transform: translateY(2.4rem);
  animation: showUp 0.25s cubic-bezier(0.06, 0.67, 0.37, 0.99) forwards;
`;
