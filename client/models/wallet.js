import Web3 from 'web3';
const abi = require('./abi.json');

let localWeb3,
  contractInstance,
  userAccount,
  accountInterval;

let stat,
  currRate,
  total,
  tokens,
  betting;

export default {
  init: function () {
    if (typeof web3 !== 'undefined') {
      localWeb3 = new Web3(web3.currentProvider);
    }

    contractInstance = new localWeb3.eth.Contract(abi, contractAddress);
    // console.log("Contract methods: ", contractInstance.methods);
    
    // accountInterval = setInterval(this.updateAccount.bind(this), 100);
    return this.updateAccount();
  },

  updateAccount: function () {
    if (web3.eth.defaultAccount !== userAccount) {
      userAccount = web3.eth.defaultAccount;

      return this.getData();
    }
    
    return Promise.resolve();
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
    .then(res => tokens = res)
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
    return contractInstance.methods.redeemToken(id).call();
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

  fromWei: function(amount) {
    return localWeb3.utils.fromWei(amount);
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
