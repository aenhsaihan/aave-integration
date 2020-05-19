const Decompose = artifacts.require("Decompose");

module.exports = function (deployer) {
  deployer.deploy(Decompose, "0x93E01899c10532d76C0E864537a1D26433dBbDdB");
};
