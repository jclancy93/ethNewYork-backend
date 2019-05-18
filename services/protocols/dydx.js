const axios = require('axios');
const BN = require('bignumber.js');

/*
 * PRIVATE
 */


const parseReadableBalance = (balance, decimals) => new BN(balance).shiftedBy(-decimals).toString();

const parseDydxPositions = async (dydxPosition, markets) => {
  const [account] = dydxPosition.accounts;
  const positiveAccountBalances = [];

  // Iterate through object and find positive account balances
  Object.keys(account.balances).forEach((key) => {
    let asset;
    if (key === '0') asset = 'ETH'
    else if (key === '1') asset = 'DAI'
    else asset = 'USDC'
    account.balances[key].asset = asset;
    if (account.balances[key].wei > '0') positiveAccountBalances.push(account.balances[key]);
  });

  const loanPositions = positiveAccountBalances.map((each) => {
    const marketForAssets = markets.find(market => market.asset === each.asset);
    return {
      protocol: 'dydx',
      asset: each.asset,
      amount: parseReadableBalance(each.wei.split('.')[0], 18),
      type: 'loan',
      interest: marketForAssets.lendRate,
    };
  });

  return loanPositions;
};

/*
 * PUBLIC
 */

const getDydxMarkets = async () => {
  try {
    const { data: { markets } } = await axios.get('https://api.dydx.exchange/v1/markets');
    const parsedMarkets = markets.map(each => (
      [{
        asset: each.symbol,
        name: each.name,
        rate: each.totalBorrowAPY,
        protocol: 'dydx',
        type: 'borrow',
      },
      {
        asset: each.symbol,
        name: each.name,
        rate: each.totalSupplyAPY,
        protocol: 'dydx',
        type: 'lend',
      }]
    ));
    // return [...parsedMarkets];
    const mergedMarkets = [].concat(...parsedMarkets);
    return mergedMarkets;
  } catch (err) {
    throw new Error('Error attempting to get Dydx markets');
  }
};

const getDydxPositions = async (address) => {
  try {
    const { data } = await axios.get(`https://api.dydx.exchange/v1/accounts/${address}`);
    const markets = await getDydxMarkets();
    const positions = parseDydxPositions(data, markets);
    return positions;
  } catch (err) {
    throw new Error('Error attempting to get Dydx positions');
  }
};

module.exports = {
  getDydxPositions,
  getDydxMarkets,
};
