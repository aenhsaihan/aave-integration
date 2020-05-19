const Decomposer = artifacts.require("Decomposer");
const truffleAssert = require('truffle-assertions');
let decomposeInstance;
const CUSDC = "0x39AA39c021dfbaE8faC545936693aC917d5E7563";
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

contract("Decomposer", (accounts) => {
  before(async() => {
    decomposeInstance = await Decomposer.deployed();
  });
  
  it("should get components of ETHRSIAPY contract", async () => {
    const {components, units} = await decomposeInstance.decomposeSet.call("0x136faE4333EA36A24bb751E2d505D6ca4Fd9f00b");

    assert.include([CUSDC, WETH], components[0]);
    assert.isAbove(units[0].toNumber(), 0);
  });

  it("should reject when address to decompose is not a Set", async () => {
    await truffleAssert.fails(
      decomposeInstance.decomposeSet.call("0xf3862af14cbb4d9b781e41a3d4d74e7c2cdb73e2"),
      truffleAssert.ErrorType.REVERT,
      "Address to decompose should be a valid TokenSet Address"
    );
  });
});
