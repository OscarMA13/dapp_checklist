require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    development: {
      url: "http://localhost:8545",
      chainId: 1337
    }
  }
};
