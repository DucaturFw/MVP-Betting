import Web3 from 'web3';
const abi = require('./abi.json');

const SUCCESS_STATUS = 'success';
const LOGIN_STATUS = 'login';
const MISS_STATUS = 'miss';

let localWeb3,
  contractInstance,
  userAccount,
  accountInterval,
  status,
  cb;

let stat,
  currRate,
  total,
  tokens,
  betting;

export default {
  init: function () {
    return new Promise((res, rej) => {
      if (typeof web3 !== 'undefined') {
        localWeb3 = new Web3(web3.currentProvider);
        status = LOGIN_STATUS;
      } else {
        localWeb3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'));
        status = MISS_STATUS;
      }

      contractInstance = new localWeb3.eth.Contract(abi, contractAddress);
      // console.log("Contract methods: ", contractInstance.methods);

      accountInterval = setInterval(this.updateAccount.bind(this), 100);
      res(this.updateAccount());
    });
  },

  fire(event) {
    console.log('have event', event);
    setTimeout(() => {
      console.log('get data');
      this.getData().then(res => {
        console.log(res);
        cb(res);
      })
    }, 10000);
  },

  subscription(_cb) {
    cb = _cb;
  },

  updateAccount: function () {
    if (status != MISS_STATUS && web3.eth.defaultAccount !== userAccount) {
      userAccount = web3.eth.defaultAccount;
      status = SUCCESS_STATUS;

      return this.getData();
    } else {
      return this.getData();
    }
  },

  getData: function () {
    return Promise.all([
      this.getStat(),
      this.getCurrRate(),
      this.totalSupply()
    ])
      .then(() => this.getBettingByID(stat.listPlaying))
      .then(() => {
        let promises = [];

        for (let i = betting.startTokenId; i < total; i++)
          promises.push(this.getTokenByID(i))

        return Promise.all(promises);
      })
      .then(res => {
        tokens = res.map((token, idx) => ({
          ...token,
          id: idx
        }))

        return tokens;
      })
      .then(() => ({
        tokens,
        currRate,
        betting,
      }));
  },

  getStat: function () {
    return contractInstance.methods.getStat().call().then(result => {
      stat = result;
    })
  },

  getCurrRate: function () {
    return contractInstance.methods.curRate().call().then(result => {
      currRate = result;
    })
  },

  totalSupply: function () {
    return contractInstance.methods.totalSupply().call().then(result => {
      total = result;
    })
  },

  getBettingByID: function (id) {
    return contractInstance.methods.getBettingByID(id).call().then(result => {
      betting = result;
      return betting;
    })
  },

  getTokenByID: function (id) {
    return contractInstance.methods.getTokenByID(id).call();
  },

  getUserTokens: function (user, id) {
    return contractInstance.methods.getUserTokens(user, id).call();
  },

  redeemToken: function (id) {
    return new Promise((res, rej) => {
      contractInstance.methods.redeemToken(id)
        .send({
          from: userAccount,
        })
        .on("receipt", receipt => res(receipt))
        .on("error", error => rej(error));
    })
  },

  getRange: function () {
    return {
      more: currRate * 1.05,
      less: currRate * 0.95
    }
  },

  getTokens: function () {
    return tokens;
  },

  getUserAccount: function () {
    return userAccount;
  },

  fromWei: function (amount) {
    return localWeb3.utils.fromWei(amount);
  },

  getStatus: function () {
    return status;
  },

  createBet: function ({ bet, price, amount }) {
    return new Promise((res, rej) => {
      contractInstance.methods.buyToken(stat.listPlaying, price, bet)
        .send({
          from: userAccount,
          value: localWeb3.utils.toWei(amount.toString(), 'ether')
        })
        .on("receipt", receipt => res(receipt))
        .on("error", error => rej(error));
    })
  }
}
