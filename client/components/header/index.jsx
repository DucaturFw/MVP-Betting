import React, { Component } from 'react';
import styled from 'styled-components';

import Wallet from './../../models/wallet';

export default class Header extends Component {
  constructor(opts) {
    super(opts);

    this.state = {
      showMenu: false
    };

    this.handleBids = this.openBids.bind(this, 'bids');
    this.handleTerms = this.handleClick.bind(this, 'terms');
    this.handleOracles = this.handleClick.bind(this, 'oracles');
    this.handleFAQ = this.handleClick.bind(this, 'faq');
  }

  hasAccount() {
    return Wallet.hasAccount();
  }

  openBids(name) {
    if (this.hasAccount()) {
      this.handleClick(name);
    }
  }

  handleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  handleClick = e => {
    this.handleMenu();
    this.props.onMenuClick(e);
  };

  render() {
    return (
      <div className="header">
        <div className="the-most-accurate-pr">The most accurate prediction always wins!</div>
        <div className="nav">
          <div className="ducatur-logo">
            <img className="logo" src="./images/NAV.png" />
          </div>
        </div>
        <img onClick={this.handleMenu} className="menu-icon" src="./images/mvp  newmenu icon.png" />
        {this.state.showMenu && (
          <Menu>
            <Item onClick={this.handleBids} disabled={!this.hasAccount()}>
              Bids list
            </Item>
            <Item onClick={this.handleOracles}>Oracle list</Item>
            <Item onClick={this.handleTerms}>Terms of use</Item>
            <Item onClick={this.handleFAQ}>FAQ</Item>
          </Menu>
        )}
      </div>
    );
  }
}

const Menu = styled.div`
  position: absolute;

  width: 200px;
  padding: 10px;

  background: white;

  right: 0;
  top: 60px;
  z-index: 1;

  background-image: linear-gradient(-90deg, #3023ae 0%, #c86dd7 100%);
  border-radius: 6px;

  animation: showMenu 0.25s cubic-bezier(0.06, 0.67, 0.37, 0.99) forwards;
`;

const Item = styled.div`
  padding: 15px 10px;
  color: ${props => (props.disabled ? '#999' : 'white')};

  font-family: 'Montserrat-Regular', Helvetica, Arial, serif;

  &:hover {
    opacity: 0.56;
    background: #3023ae;
    border-radius: 6px;
    cursor: pointer;
  }
`;
