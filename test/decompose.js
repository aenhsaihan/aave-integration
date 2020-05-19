const Decompose = artifacts.require("Decompose");

contract("Decompose", (accounts) => {
  it("should get components of ETHRSIAPY contract", async () => {
    const decomposeInstance = await Decompose.deployed();
    const components = await decomposeInstance.getCollateralAddresses.call();
    const [component] = components;
    assert.equal(component, "0x1a0c61BD7D60486c7b38cAE6b3bD2d715a34c7aC");
  });

  // it("should set intermediate address", async () => {
  //   const decomposeInstance = await Decompose.deployed();
  //   await decomposeInstance.setIntermediateAddress();

  //   const intermediateAddress = await decomposeInstance.setAddress.call();
  //   const [component] = await decomposeInstance.getComponents.call();
  //   assert.equal(intermediateAddress, component);
  // });

  it("should set intermediate contract", async () => {
    const decomposeInstance = await Decompose.deployed();

    const [component,] = await decomposeInstance.getSetToken.call();
    assert.equal(component, "0x39AA39c021dfbaE8faC545936693aC917d5E7563");
  });

  it("should set collateral address", async () => {
    const decomposeInstance = await Decompose.deployed();

    const collateralAddress = await decomposeInstance.collateralAddressses.call();
    const [
      component,
    ] = await decomposeInstance.getSetToken.call();
    assert.equal(collateralAddress, component);
  });
});
