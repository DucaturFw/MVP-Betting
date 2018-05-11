import Web3 from 'web3';
const abi = require('./abi.json');

const SUCCESS_STATUS = 'success';
const LOGIN_STATUS = 'login';
const MISS_STATUS = 'miss';
const GOOD_NETWORK_STATUS = 'good_newtwork';
const BAD_NETWORK_STATUS = 'bad_newtwork';

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
    return this.getNetwork().then(() => {
      contractInstance = new localWeb3.eth.Contract(abi, contractAddress);
      // console.log("Contract methods: ", contractInstance.methods);

      // accountInterval = setInterval(this.updateAccount.bind(this), 100);
      return this.updateAccount();
    })
  },

  getNetwork() {
    return new Promise((res, rej) => {
      if (typeof web3 !== 'undefined') {
        this.resolveNetwork()
          .then(() => {
            localWeb3 = new Web3(web3.currentProvider);
            status = LOGIN_STATUS;
    
            res();
          })
          .catch(() => {
            localWeb3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'));
            status = BAD_NETWORK_STATUS;
    
            res();
          });
      } else {
        localWeb3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'));
        status = MISS_STATUS;

        res();
      }
    });
  },

  resolveNetwork() {
    return new Promise((res, rej) => {
      web3.version.getNetwork((err, netId) => {
        if (netId == 3) {
          status = GOOD_NETWORK_STATUS;
          res();
        } else {
          status = BAD_NETWORK_STATUS;
          rej();
        }
      })
    });
  },

  fire(event) {
    // console.log('have event', event);
    setTimeout(() => {
      // console.log('get data');
      this.getData().then(res => {
        // console.log(res);
        cb(res);
      })
    }, 10000);
  },

  subscription(_cb) {
    cb = _cb;
  },

  updateAccount: function () {
    console.log('status', status);
    if (status == LOGIN_STATUS && web3.eth.defaultAccount !== userAccount) {
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
