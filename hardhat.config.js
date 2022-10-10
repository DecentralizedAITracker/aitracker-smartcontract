require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks : {
    localhost : {
      url : 'http://127.0.0.1:8545/',
      accounts : ['0x'+process.env.PRIVATE_KEY]
    },
    bellecour : {
      url : 'https://bellecour.iex.ec/',
      accounts : ['0x'+process.env.PRIVATE_KEY]
    },
    goerli : {
      url : process.env.INFURA_KEY,
      accounts : ['0x'+process.env.PRIVATE_KEY]
    }
  }
};
