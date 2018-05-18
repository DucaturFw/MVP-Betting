# MVP - Betting

## About

Problem - You want to create a bet that is trustless. The bet will be about the future price of BTC/ETH and will close on a certain Date in the future.

The solution - Create a DApp that allows users to easily setup bets and deploy them in the Ethereum MainNet. Sourcing the data about the prices of BTC/ETH as averages from the top exchanges. We can imply that this data is “decentralized” and can be trusted.
Technical Solution - “User1” wants to create a bet. He inserts data about 1)the closing date of the bet - “X date” 2) The Cryptocurrency which is bet upon 3) The bet itself - predict that the price of set crypto will be “more ” or “less“ then the “set price”. That information is then sent to the Fabric Smart Contract that then creates the unique Smart Contract of the Bet. “User2” accesses the unique Smart Contract and makes a bet inside it.

When the closing date of the bet comes “X date” - the smart contract requests information from the top10 exchanges. This information is received outside of blockchain and processed to the average price, we also delete statistical outliers. The smart contract then closes the bet - delivering the earned cryptocurrency directly to the winner.

## Getting Started

To start on local env

```javascript
npm i
npm run start
```

To build on server

```javascript
npm i
npm run build
```
