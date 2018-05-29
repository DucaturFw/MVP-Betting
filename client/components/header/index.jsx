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
      <header>
        <div className="logo">
          <img src="./images/logo.svg" alt="logo" />
        </div>
        <div className="title-name">The most accurate prediction always wins!</div>
        <div onClick={this.handleMenu} className="menu-logo">
          <img src="./images/menu-icon.png" className="mobile_menu_click" alt="menu" />
        </div>
        <Menu className="list-menu" showMenu={this.state.showMenu}>
          <ul className="nav-menu">
            <li className="nav-select bids-list" onClick={this.handleBids} disabled={!this.hasAccount()}>
              <a href="#">Bids List</a>
            </li>
            <li className="nav-select oracles-list" onClick={this.handleOracles}>
              <a href="#">Oracles List</a>
            </li>
            <li className="nav-select faq" onClick={this.handleFAQ}>
              <a href="#">FAQ</a>
            </li>
            <li className="nav-select terms" onClick={this.handleTerms}>
              <a href="#">Our terms</a>
            </li>
          </ul>
        </Menu>
      </header>
    );
  }
}

const Menu = styled.ul`
  display: ${props => (props.showMenu ? 'block' : 'none')};
`;
