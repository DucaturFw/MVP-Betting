import React, { Component } from 'react';
import styled from 'styled-components';

const START_POINT = 97;
const STEP = 14;
const RANGE = 150;

export default class Scale extends Component {
  get points() {
    const results = [];

    for (let i = 0; i <= 8; i++) {
      results.push(<Point key={i} src="./images/mvp  newpath  3.png" style={{ left: 70 + RANGE * i }} />);
    }

    return results;
  }

  get negativeDel() {
    const results = [];

    for (let j = 0; j <= 7; j++) {
      for (let i = 0; i <= 8; i++) {
        results.push(
          <Delimeter
            src="./images/mvp  newline 2  35.png"
            style={{ left: START_POINT + STEP * i + RANGE * j, top: j < 4 ? 10 : 0 }}
          />
        );
      }
    }

    return results;
  }

  render() {
    return (
      <Container className={this.props.className}>
        <PreLine src="./images/mvp  newline  1.png" />
        <Line src="./images/mvp  newline.png" />
        <PreLine src="./images/mvp  newline  1.png" />
        {this.points}
        {this.negativeDel}
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  display: flex;
`;

const PreLine = styled.img`
  height: 3px;
  width: 80px;
  position: relative;
  top: 9px;
`;

const Line = styled.img`
  position: relative;
  top: 9px;
  height: 3px;
`;

const Point = styled.img`
  position: absolute;
`;

const Delimeter = styled.img`
  position: absolute;
`;
