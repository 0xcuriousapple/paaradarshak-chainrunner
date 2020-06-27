var factoryPaardarshak = artifacts.require("./factorypaardarshak.sol");

module.exports = function (deployer) {
    deployer.deploy(factoryPaardarshak);
};
