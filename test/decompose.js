const Decomposer = artifacts.require("Decomposer");

contract("Decomposer", (accounts) => {
  it("should get components of ETHRSIAPY contract", async () => {
    const decomposeInstance = await Decomposer.deployed();
    const {components, units} = await decomposeInstance.decomposeSet.call("0x136faE4333EA36A24bb751E2d505D6ca4Fd9f00b");

    assert.deepEqual(components, ["0x39AA39c021dfbaE8faC545936693aC917d5E7563"]);
    assert.isAbove(units[0].toNumber(), 0);
  });

  // it("should set intermediate address", async () => {
  //   const decomposeInstance = await Decompose.deployed();
  //   await decomposeInstance.setIntermediateAddress();

  //   const intermediateAddress = await decomposeInstance.setAddress.call();
  //   const [component] = await decomposeInstance.getComponents.call();
  //   assert.equal(intermediateAddress, component);
  // });

  // it("should set intermediate contract", async () => {
  //   const decomposeInstance = await Decompose.deployed();

  //   const [component,] = await decomposeInstance.getSetToken.call();
  //   assert.equal(component, "0x39AA39c021dfbaE8faC545936693aC917d5E7563");
  // });

  // it("should set collateral address", async () => {
  //   const decomposeInstance = await Decompose.deployed();

  //   const collateralAddress = await decomposeInstance.collateralAddressses.call();
  //   const [
  //     component,
  //   ] = await decomposeInstance.getSetToken.call();
  //   assert.equal(collateralAddress, component);
  // });
});
