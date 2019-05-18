const Web3 = require('web3');
const BN = require('bignumber.js');
const { tokensInfo, erc20ABI } = require('../constants/tokens');

const parseReadableBalance = (balance, decimals) => new BN(balance).shiftedBy(-decimals).toString();

const web3 = new Web3('https://mainnet.infura.io/v3/57be0140b9434442988e107a2dd964f6');

/* This function is awful */
const getAssetsForWallet = async (address) => {
  // const lowercasedAddress = address.toLowerCase()
  const weiBalance = await web3.eth.getBalance(address);
  const contractInstances = tokensInfo.map(token => new web3.eth.Contract(erc20ABI, token.contractAddress));
  const rawTokenBalances = await Promise.all(contractInstances.map(async (instance) => {
    const balance = await instance.methods.balanceOf(address).call();
    const decimals = await instance.methods.decimals().call();
    return {
      balance: balance.toString(),
      decimals: decimals.toString(),
    };
  }));
  // Summing ETH and WETH to give one balance
  const summedBalance = new BN(weiBalance).plus(new BN(rawTokenBalances[0].balance)).toString()
  rawTokenBalances[0] = {
    balance: summedBalance,
    decimals: rawTokenBalances[0].decimals,
  };
  const parsedTokenBalances = rawTokenBalances.map(token => parseReadableBalance(token.balance, token.decimals));
  parsedTokenBalances.forEach((token, index) => { tokensInfo[index].balance = parsedTokenBalances[index]; });
  return tokensInfo;
};

module.exports = {
  getAssetsForWallet,
};
