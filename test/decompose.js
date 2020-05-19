const Decomposer = artifacts.require("Decomposer");
const truffleAssert = require('truffle-assertions');
let decomposeInstance;
const CUSDC = "0x39AA39c021dfbaE8faC545936693aC917d5E7563";
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";

contract("Decomposer", (accounts) => {
  before(async() => {
    decomposeInstance = await Decomposer.deployed();
  });

  it("should get components of ETHRSIAPY contract", async () => {
    const {components, units, prices, setPrice} = await decomposeInstance.decomposeAndPriceSet.call("0x136faE4333EA36A24bb751E2d505D6ca4Fd9f00b");

    console.log(prices);
    console.log(setPrice);

    assert.equal(components.length, 1, "There must be only 1 component in this Set");
    assert.include([CUSDC, WETH], components[0]);
    assert(units[0].gt(0));
  });

  it("should get components of BTCETH7525 contract", async () => {
    const {components, units} = await decomposeInstance.decomposeAndPriceSet.call("0xA35Fc5019C4dc509394Bd4d74591a0bF8852c195");

    assert.equal(components.length, 2, "There must be 2 components in this Set");
    assert.include(components, WETH, "wETH should be a component.");
    assert.include(components, WBTC, "wBTC should be a component.");
    assert(units[0].gt(0));
    assert(units[1].gt(0));
  });

  it("should reject when address to decompose is not a Set", async () => {
    await truffleAssert.fails(
      decomposeInstance.decomposeAndPriceSet.call("0xf3862af14cbb4d9b781e41a3d4d74e7c2cdb73e2"),
      truffleAssert.ErrorType.REVERT,
      "Address to decompose should be a valid TokenSet Address"
    );
  });
});
