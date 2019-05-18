const request = require('request-promise');
const { tokensInfo } = require('../../constants/tokens');

const compoundAssets = tokensInfo.filter(each => each.compoundSupported === true);

/*
 * PRIVATE
 */

const parseCompoundMarkets = async (marketsArray) => {
  const marketObjects = marketsArray.map(JSON.parse);
  const parsedCompoundMarkets = marketObjects.map((market) => {
    const tokenInfo = tokensInfo.find(token => token.contractAddress === market.asset);
    return [{
      asset: tokenInfo.symbol,
      name: tokenInfo.name,
      rate: market.supply_rate.toString(),
      protocol: 'compound',
      type: 'lend',
    },
    {
      asset: tokenInfo.symbol,
      name: tokenInfo.name,
      rate: market.borrow_rate.toString(),
      protocol: 'compound',
      type: 'borrow',
    }];
  });
  const mergedMarkets = [].concat(...parsedCompoundMarkets);
  return mergedMarkets;
};

/*
 * PUBLIC
 */

const getCompoundMarkets = async () => {
  try {
    const compoundRequests = compoundAssets.map(each => (
      {
        url: 'https://api.compound.finance/api/market_stats/v1/get_latest_market_stats',
        form: { asset: each.contractAddress },
      }
    ));
    const rawCompoundMarkets = await Promise.all(compoundRequests.map(each => request.post(each)));
    const parsedCompoundMarkets = parseCompoundMarkets(rawCompoundMarkets);
    return parsedCompoundMarkets;
  } catch (err) {
    throw new Error(err);
  }
};

// NO GOOD WAY TO GET COMPOUND POSITIONS BY ADDRESS

// const getCompoundPositions = async (address) => {

// };

module.exports = {
  getCompoundMarkets,
  // getCompoundPositions,
};
