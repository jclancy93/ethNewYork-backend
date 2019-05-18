const { assert } = require('chai');
const walletService = require('../../services/wallets');

context('Wallet Integration', () => {
  describe('getAssetsForWallet', () => {
    let walletAssets;

    before(async () => {
      const address = '0x37Fa7c6B28fc5545d9523D6dbb329Be7e1B9e7A0';
      walletAssets = await walletService.getAssetsForWallet(address);
    });

    it('Should return dydx position for a given address', () => {
      assert.isDefined(walletAssets);
    });

    it('Should return expected balances for a given address', async () => {
      const usdcBalance = walletAssets[5].balance;
      assert.isDefined(walletAssets[0].balance);
      assert.strictEqual(usdcBalance, '0');
    });
  });
});
