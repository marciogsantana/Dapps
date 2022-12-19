require('babel-register');
require('babel-polyfill');
require('dotenv').config();

var HDWalletProvider = require("truffle-hdwallet-provider");

// var infura_apikey = "667ffde66bf14f57b41b669f9cb77353"; //"you need to register in Infura for an Access Token."
// var mnemonic =  "render ecology employ father remain glimpse seek prepare tumble aspect coffee media"; //"< twelve words you can find in metamask/settings/reveal seed words >"
// var address = "0x5F17446EA5B8967ad3fC7b649aE3F508fA2a6329";



var infura_apikey = process.env.INFURA_APIKEY;
var mnemonic = process.env.MNEMONIC;
var address = process.env.ADDRESS;


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },

    pucmg: {
      host: "localhost",
      port: 7545,
      network_id: "2020" // Match any network id
    },
    goerli: {
			networkCheckTimeout: 10000,
    	    provider: function() {
		      return new HDWalletProvider(mnemonic, "https://goerli.infura.io/v3/"+infura_apikey, 0, 5); // Habilita as 5 primeiras contas da wallet para uso
		    },
		    network_id: '5',
		    from: address
		}  
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "^0.8",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
