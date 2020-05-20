const Decomposer = artifacts.require("Decomposer");

module.exports = function (deployer) {
  deployer.deploy(Decomposer, "0xf55186CC537E7067EA616F2aaE007b4427a120C8");
};
