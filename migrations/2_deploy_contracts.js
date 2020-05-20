const Decomposer = artifacts.require("Decomposer");

const tokenSetsCoreAddress = "0xf55186CC537E7067EA616F2aaE007b4427a120C8";
const lendingPoolAddressesProviderAddress =
  "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8";

module.exports = function (deployer) {
  deployer.deploy(
    Decomposer,
    tokenSetsCoreAddress,
    lendingPoolAddressesProviderAddress
  );
};
