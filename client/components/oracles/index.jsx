import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { format } from 'date-fns';

import Popup from './../elements/popup';

import Wallet from './../../models/wallet';

const FORMAT = 'D MMMM YYYY';

export default class Oracles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  componentDidMount() {
    Wallet.getPrices().then(data => {
      // console.log('prices', data);
      this.setState({ list: data });
    });
  }

  get items() {
    return this.state.list.map((item, key) => {
      const idx = parseInt(item.event['6']);
      return (
        <div className="row main" key={key}>
          <Cell className="col">{format(item.block.timestamp * 1000, FORMAT)}</Cell>
          <Cell className="col" mark={idx === 0}>
            {item.event['1']}
          </Cell>
          <Cell className="col" mark={idx === 1}>
            {item.event['2']}
          </Cell>
          <Cell className="col" mark={idx === 2}>
            {item.event['3']}
          </Cell>
          <Cell className="col" mark={idx === 3}>
            {item.event['4']}
          </Cell>
          <Cell className="col" mark={idx === 4}>
            {item.event['5']}
          </Cell>
          <Cell className="col">{item.event['7']}</Cell>
        </div>
      );
    });
  }

  render() {
    return (
      <Wrapper onClose={this.props.onClose} name="oracles" className="oracles-list toggleable">
        <h1>Oracle List</h1>
        <div className="row main">
          <div className="col">Date</div>
          <div className="col">Stock A</div>
          <div className="col">Stock B</div>
          <div className="col">Stock C</div>
          <div className="col">Stock D</div>
          <div className="col">Stock E</div>
          <div className="col">Median</div>
        </div>
        {this.items}
      </Wrapper>
    );
  }
}

const Wrapper = styled(Popup)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
`;

const Cell = styled.div`
  border-bottom: 1px solid #eee;

  text-decoration: ${props => (props.mark ? 'line-through' : 'none')};
`;
