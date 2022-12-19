/*const Marketplace = artifacts.require("Marketplace");

module.exports = function(deployer) {
  deployer.deploy(Marketplace);

  };
*/
/*
// Para publicação na Goerli
const PucCoinAddress = "0x4bf749ec68270027C5910220CEAB30Cc284c7BA2";
const PucMarketplace = artifacts.require("PucMarketplace");

module.exports = function (deployer) {
  deployer.deploy(PucMarketplace, PucCoinAddress);
};

*/

// Para publicação no ganache com Puccoin ja publicado
const PucCoinAddress = "0x4bf749ec68270027C5910220CEAB30Cc284c7BA2";
const PucMarketplace = artifacts.require("PucMarketplace");

module.exports = function (deployer) {
  deployer.deploy(PucMarketplace, PucCoinAddress);
};



/*
publicar na rede ganache
const PucCoin = artifacts.require("PucCoin");
const PucMarketplace = artifacts.require("PucMarketplace");

module.exports = async function (deployer) {
  await deployer.deploy(PucCoin);
  await PucCoin.deployed();

  await deployer.deploy(PucMarketplace, PucCoin.address);
};

*/
