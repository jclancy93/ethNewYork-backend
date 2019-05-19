const _ = require('lodash');
const { getAssetsForWallet } = require('../services/wallets');
const { getPriceForAsset } = require('../services/markets');
const { getDydxMarkets, getDydxPositions } = require('../services/protocols/dydx');
const { getMakerMarkets, getMakerPosition } = require('../services/protocols/maker');
const { getCompoundMarkets } = require('../services/protocols/compound');

const getWalletMarkets = async (address) => {
  const [dydxMarkets, makerMarkets, compoundMarkets] = await Promise.all([
    getDydxMarkets(address),
    getMakerMarkets(address),
    getCompoundMarkets(address),
  ]);
  return [...dydxMarkets, ...makerMarkets, ...compoundMarkets];
};

const mergeMarketsWithAsset = async (assets, markets) => {
  const assetsWithBestRate = assets.map(async (asset) => {
    const assetPrice = await getPriceForAsset(asset.symbol);
    const borrowMarkets = markets[asset.symbol].filter(market => market.type === 'borrow');
    const loanMarkets = markets[asset.symbol].filter(market => market.type === 'loan');
    const bestBorrowRate = _.sortBy(borrowMarkets, ['rate'])[0];
    const bestLendRate = _.sortBy(loanMarkets, ['rate'])[0];
    return {
      ...asset,
      borrowRate: bestBorrowRate.rate,
      borrowProtocol: bestBorrowRate.protocol,
      lendRate: bestLendRate.rate,
      lendProtocol: bestLendRate.protocol,
      price: assetPrice,
    };
  });
  return Promise.all(assetsWithBestRate);
};

const getWalletPositions = async (address) => {
  const [dydxPositions, makerPositions] = await Promise.all([
    getDydxPositions(address),
    getMakerPosition(address),
  ]);
  return [...dydxPositions, ...makerPositions];
}

const getWalletData = async (req, res) => {
  const { params: { address } } = req;
  const assets = await getAssetsForWallet(address);
  const markets = await getWalletMarkets(address);
  const assetGroupedMarkets = _.groupBy(markets, 'asset');
  const positions = await getWalletPositions(address);
  const assetsWithRates = await mergeMarketsWithAsset(assets, assetGroupedMarkets);
  res.json({ assets: assetsWithRates, positions });
};

module.exports = {
  getWalletData,
};
