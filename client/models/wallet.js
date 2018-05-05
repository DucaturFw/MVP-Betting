import Web3 from 'web3';
const abi = require('./abi.json');

let localWeb3,
  contractInstance,
  userAccount,
  accountInterval;

let stat,
  currRate,
  betting;

export default {
  init: function () {
    if (typeof web3 !== 'undefined') {
      localWeb3 = new Web3(web3.currentProvider);
    }

    contractInstance = new localWeb3.eth.Contract(abi, contractAddress);
    this.updateAccount();
    // accountInterval = setInterval(this.updateAccount.bind(this), 100);

    console.log("Contract methods: ", contractInstance.methods);

    this.getData();
  },

  updateAccount: function () {
    if (web3.eth.defaultAccount !== userAccount) {
      userAccount = web3.eth.defaultAccount;

      // this.getData();
    }
  },

  getData: function () {
    Promise.all([
      this.getStat(),
      this.getCurrRate()
    ]).then(() => {
      console.log('stat', stat);
      console.log('rate', currRate);
      // console.log(stat, parseInt(stat[0]));
      // TODO: find right key
      return this.getBettingByID(0);
    }).then(() => {
      console.log(betting);

      return this.getTokenByID(2);
    }).then(res => {
      console.log(res, userAccount);

      return this.getUserTokens(userAccount, 10);
    }).then(res => {
      console.log('user tokens', res);
    })
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
    return contractInstance.methods.function(id).call();
  },
}
