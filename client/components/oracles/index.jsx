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
      this.setState({ list: data });
    });
  }

  get items() {
    return this.state.list.map((item, key) => {
      const idx = parseInt(item.event['6']);
      return (
        <Row key={key}>
          <Cell>{format(item.block.timestamp * 1000, FORMAT)}</Cell>
          <Cell mark={idx === 0}>{item.event['1']}</Cell>
          <Cell mark={idx === 1}>{item.event['2']}</Cell>
          <Cell mark={idx === 2}>{item.event['3']}</Cell>
          <Cell mark={idx === 3}>{item.event['4']}</Cell>
          <Cell mark={idx === 4}>{item.event['5']}</Cell>
          <Cell>{item.event['7']}</Cell>
        </Row>
      );
    });
  }

  render() {
    return (
      <Wrapper onClose={this.props.onClose} name="oracles">
        <Title>Oracle list</Title>
        <Container>
          <Table>
            <thead>
              <Row>
                <HeadCell>Date</HeadCell>
                <HeadCell>Stock A</HeadCell>
                <HeadCell>Stock B</HeadCell>
                <HeadCell>Stock C</HeadCell>
                <HeadCell>Stock D</HeadCell>
                <HeadCell>Stock E</HeadCell>
                <HeadCell>Median</HeadCell>
              </Row>
            </thead>
            <tbody>{this.items}</tbody>
          </Table>
        </Container>
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
  font-family: 'Montserrat-Regular', Helvetica, Arial, serif;
  font-size: 36px;
  color: rgba(12, 38, 74, 1);
  text-align: center;
`;

const Container = styled.div`
  padding: 30px;
  overflow-y: auto;
  font-family: 'Montserrat-Regular', Helvetica, Arial, serif;
`;

const Table = styled.table`
  width: 100%;
`;

const Row = styled.tr`
  padding: 5px;
`;

const HeadCell = styled.td`
  padding: 10px;
`;

const Cell = styled(HeadCell)`
  border-bottom: 1px solid #eee;

  text-decoration: ${props => (props.mark ? 'line-through' : 'none')};
`;
