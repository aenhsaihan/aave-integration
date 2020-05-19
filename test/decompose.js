const Decompose = artifacts.require("Decompose");

contract("Decompose", (accounts) => {
  it("should get components of ethrsi6040 contract", async () => {
    const decomposeInstance = await Decompose.deployed();
    const components = await decomposeInstance.getComponents.call();
    const [component] = components;
    assert.equal(component, "0xD3d759aA6b91096e1626ee39c65A9EfF73D6Fb03");
  });

  it("should set intermediate address", async () => {
    const decomposeInstance = await Decompose.deployed();
    await decomposeInstance.setIntermediateAddress();

    const intermediateAddress = await decomposeInstance.setAddress.call();
    const [component] = await decomposeInstance.getComponents.call();
    assert.equal(intermediateAddress, component);
  });

  it("should set intermediate contract", async () => {
    const decomposeInstance = await Decompose.deployed();

    await decomposeInstance.setIntermediateContract();
    const [
      component,
    ] = await decomposeInstance.getIntermediateComponents.call();
    assert.equal(component, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");
  });

  it("should set collateral address", async () => {
    const decomposeInstance = await Decompose.deployed();

    await decomposeInstance.setCollateralAddress();

    const collateralAddress = await decomposeInstance.collateralAddress.call();
    const [
      component,
    ] = await decomposeInstance.getIntermediateComponents.call();
    assert.equal(collateralAddress, component);
  });

  it("should get asset price of underlying collateral", async () => {
    const decomposeInstance = await Decompose.deployed();

    const collateralAddress = await decomposeInstance.collateralAddress.call();
    const assetPrice = await decomposeInstance.getAssetPrice(collateralAddress);
    expect(assetPrice.toNumber()).to.be.a("number");
  });
});
