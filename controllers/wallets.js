const _ = require('lodash');
const { getAssetsForWallet } = require('../services/wallets');
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

const getWalletPositions = async (address) => {
  const [dydxPositions, makerPositions] = await Promise.all([
    getDydxPositions(address),
    getMakerPosition(address),
  ]);
  return [...dydxPositions, ...makerPositions];
}

const getWalletData = async (req, res) => {
  const { params: { address }} = req;
  const assets = await getAssetsForWallet(address);
  const markets = await getWalletMarkets(address);
  const assetGroupedMarkets = _.groupBy(markets, 'asset');
  // const assetTypeGroupedMarkets = Object.keys(assetGroupedMarkets).map(each => _.groupBy(assetGroupedMarkets[each], 'type'));
  // const nestedGroupedMarkets = _.groupBy(groupedMarkets, 'type')
  const positions = await getWalletPositions(address);
  res.json({ assets, markets: assetGroupedMarkets, positions });
};

module.exports = {
  getWalletData,
};
