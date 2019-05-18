const { assert } = require('chai');
const dydxService = require('../../services/protocols/dydx');
const makerService = require('../../services/protocols/maker');
const compoundService = require('../../services/protocols/compound');


context('Dydx Integration', () => {
  describe('getDydxPositions', () => {
    let dydxPositions;

    before(async () => {
      const address = '0x37Fa7c6B28fc5545d9523D6dbb329Be7e1B9e7A0';
      dydxPositions = await dydxService.getDydxPositions(address);
    });

    it('Should return dydx position for a given address', () => {
      assert.isDefined(dydxPositions);
    });

    it('Should return expected balances for a given address', async () => {
      assert.isDefined(dydxPositions[0].amount);
    });
  });

  describe('getDydxMarkets', () => {
    let dydxMarkets;

    before(async () => {
      dydxMarkets = await dydxService.getDydxMarkets();
    });

    it('Should return dydx markets', () => {
      assert.isDefined(dydxMarkets);
    });

    it('Should return all valid markets', () => {
      assert.isDefined(dydxMarkets[0]);
    });

    it('Should return correct information for markets', () => {
      assert.isDefined(dydxMarkets[0].borrowRate);
      assert.isDefined(dydxMarkets[0].lendRate);
    });
  });
});

context('Maker Integration', () => {
  describe('getMakerPositions', () => {
    let makerPositions;

    before(async () => {
      const address = '0x37Fa7c6B28fc5545d9523D6dbb329Be7e1B9e7A0';
      makerPositions = await makerService.getMakerPosition(address);
    });

    it('Should return dydx position for a given address', () => {
      assert.isDefined(makerPositions);
    });

    it('Should return expected balances for a given address', async () => {
      assert.isDefined(makerPositions[0].amount);
    });
  });

  describe('getMakerMarkets', () => {
    let makerMarkets;

    before(async () => {
      makerMarkets = makerService.getMakerMarkets();
    });

    it('Should return dydx markets', () => {
      assert.isDefined(makerMarkets);
    });

    it('Should return all valid markets', () => {
      assert.isDefined(makerMarkets[0]);
    });

    it('Should return correct information for markets', () => {
      assert.isDefined(makerMarkets[0].borrowRate);
    });
  });
});

context('Compound Integration', () => {
  // describe('getCompoundPositions', () => {
  //   let makerPositions;

  //   before(async () => {
  //     const address = '0x37Fa7c6B28fc5545d9523D6dbb329Be7e1B9e7A0';
  //     makerPositions = await makerService.getMakerPosition(address);
  //   });

  //   it('Should return dydx position for a given address', () => {
  //     assert.isDefined(makerPositions);
  //   });

  //   it('Should return expected balances for a given address', async () => {
  //     assert.isDefined(makerPositions[0].amount);
  //   });
  // });

  describe('getCompoundMarkets', () => {
    let compoundMarkets;

    before(async () => {
      compoundMarkets = await compoundService.getCompoundMarkets();
    });

    it('Should return compound markets', () => {
      assert.isDefined(compoundMarkets);
    });

    it('Should return all valid markets', () => {
      assert.isDefined(compoundMarkets[0]);
    });

    it('Should return correct information for markets', () => {
      assert.isDefined(compoundMarkets[0].borrowRate);
    });
  });
});
