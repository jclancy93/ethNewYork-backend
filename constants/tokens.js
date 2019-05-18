const tokensInfo = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    compoundSupported: true,
    makerSupported: false,
    dydxSuppored: true,
    dharmaSupported: true,
    contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  },
  {
    name: 'Dai',
    symbol: 'DAI',
    decimals: 18,
    compoundSupported: true,
    makerSupported: true,
    dydxSuppored: true,
    dharmaSupported: true,
    contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
  },
  {
    name: '0x',
    symbol: 'ZRX',
    decimals: 18,
    compoundSupported: true,
    makerSupported: false,
    dydxSuppored: false,
    dharmaSupported: false,
    contractAddress: '0xe41d2489571d322189246dafa5ebde1f4699f498',
  },
  {
    name: 'Augur',
    symbol: 'REP',
    decimals: 18,
    compoundSupported: true,
    makerSupported: false,
    dydxSuppored: false,
    dharmaSupported: false,
    contractAddress: '0x1985365e9f78359a9b6ad760e32412f4a445e862',
  },
  {
    name: 'Basic Attention Token',
    symbol: 'BAT',
    decimals: 18,
    compoundSupported: true,
    makerSupported: false,
    dydxSuppored: false,
    dharmaSupported: false,
    contractAddress: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    compoundSupported: false,
    makerSupported: false,
    dydxSuppored: true,
    dharmaSupported: false,
    contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
];

const erc20ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    type: 'function',
  },
];

module.exports = {
  tokensInfo,
  erc20ABI,
};
