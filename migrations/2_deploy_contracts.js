const Decomposer = artifacts.require("Decomposer");

module.exports = function (deployer) {
  deployer.deploy(Decomposer, "0xf55186CC537E7067EA616F2aaE007b4427a120C8", "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8");
};
