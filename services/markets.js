const axios = require('axios');
const { pricingApiKey } = require('../config/environment');

const getPriceForAsset = async (asset) => {
  const { data } = await axios.get(`https://api.nomics.com/v1/markets/prices?key=${pricingApiKey}&currency=${asset}`);
  const assetPrice = data[0].price;
  return assetPrice;
};

module.exports = {
  getPriceForAsset,
};
