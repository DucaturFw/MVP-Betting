import React, { Component } from 'react';
import styled from 'styled-components';

export default function ({ tokens, curr }) {
    return (
        <Container>
            <Item>

                <Title>1. Choose Condition of your Prediction</Title>
            </Item>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
`;

const Item = styled.div`
    width: 200px;
`;

const Title = styled.div`
    font-size: 16px;
    color: white;
`;
