const CTokensOracle = artifacts.require("CTokensOracle");
const PriceOracleProxy = artifacts.require("PriceOracleProxy");
const TokenSetsDecomposer = artifacts.require("TokenSetsDecomposer");

const tokenSetsCoreAddress = "0xf55186CC537E7067EA616F2aaE007b4427a120C8";
const lpAddressesProviderAddress =
  "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8";

module.exports = function (deployer) {
  deployer.deploy(CTokensOracle, lpAddressesProviderAddress).then(() =>
    deployer.deploy(PriceOracleProxy, lpAddressesProviderAddress, CTokensOracle.address).then(() =>
      deployer.deploy(TokenSetsDecomposer, tokenSetsCoreAddress, PriceOracleProxy.address)
    )
  );
};
