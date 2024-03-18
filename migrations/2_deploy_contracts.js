var safemath = artifacts.require('./safemath.sol');
var zombiefactory = artifacts.require('./zombiefactory.sol');
var zombiefeeding = artifacts.require('./zombiefeeding.sol');
var zombiehelper = artifacts.require('./zombiehelper.sol');
var zombieattack = artifacts.require('./zombieattack.sol');
var zombieownership = artifacts.require('./zombieownership.sol');
var kittyCore = artifacts.require('./KittyCore.sol');

var writeContractAddressesToFile = require('../writeContractAddressToFile.js');

module.exports = async function (deployer) {
  await deployer.deploy(safemath);
  const safemathInstance = await safemath.deployed();
  await deployer.deploy(zombiefactory);
  const zombiefactoryInstance = await zombiefactory.deployed();
  await deployer.deploy(zombiefeeding);
  const zombiefeedingInstance = await zombiefeeding.deployed();
  await deployer.deploy(zombiehelper);
  const zombiehelperInstance = await zombiehelper.deployed();
  await deployer.deploy(zombieattack);
  const zombieattackInstance = await zombieattack.deployed();
  await deployer.deploy(zombieownership);
  const zombieownershipInstance = await zombieownership.deployed();
  await deployer.deploy(kittyCore);
  const kittycoreInstance = await zombieownership.deployed();

  const contractAddresses = {
    safemath: safemathInstance.address,
    zombiefactory: zombiefactoryInstance.address,
    zombiefeeding: zombiefeedingInstance.address,
    zombiehelper: zombiehelperInstance.address,
    zombieattack: zombieattackInstance.address,
    zombieownership: zombieownershipInstance.address,
    kittyCore: kittycoreInstance.address,
  };
  writeContractAddressesToFile(contractAddresses);
};
