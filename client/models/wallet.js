import Web3 from 'web3';
const abi = require('./abi.json');

let localWeb3,
  contractInstance;

let stat,
  currRate,
  betting;

export default {
  init: function () {
    if (typeof web3 !== 'undefined') {
      localWeb3 = new Web3(web3.currentProvider);
    }

    contractInstance = new localWeb3.eth.Contract(abi, contractAddress);
    console.log(contractInstance.methods);

    Promise.all([
      this.getStat(),
      this.getCurrRate()
    ]).then(() => {
      // console.log(stat, parseInt(stat[0]));
      // TODO: find right key
      return this.getBettingByID(0);
    }).then(() => {
      console.log(betting);

      return this.getTokenByID(2);
    }).then(res => {
      console.log(res);

      return this.getUserTokens(1);
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

  getUserTokens: function (id) {
    return contractInstance.methods.getUserTokens(localWeb3.eth.defaultAccount, id).call();
  },

  redeemToken: function (id) {
    return contractInstance.methods.function(id).call();
  },
}
