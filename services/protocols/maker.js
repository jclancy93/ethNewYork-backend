const axios = require('axios');

/*
 * PUBLIC
 */

const getMakerPosition = async (address) => {
  try {
    const { data } = await axios.get(`https://mkr.tools/api/v1/lad/${address}`);
    const positions = data.map(each => (
      {
        protocol: 'maker',
        type: 'borrow',
        amount: each.ire.toString(),
        collateral: each.eth.toString(),
        ratio: each.ratio.toString(),
        interest: '0.195',
        liquidationPrice: each.liq_price.toString(),
      }
    ));
    return positions;
  } catch (err) {
    throw new Error('Something went wrong while trying to parse Maker position');
  }
};

const getMakerMarkets = () => (
  // HARDCODED FOR NOW TO AVOID PULLING FROM CHAIN
  [{
    asset: 'DAI',
    name: 'Dai',
    rate: '0.195',
    minCollateral: '1.5',
    protocol: 'maker',
    type: 'borrow',
  }]
);

module.exports = {
  getMakerPosition,
  getMakerMarkets,
};
