const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Compile the contract
  const contractName = "Checklist";
  const pathToContract = `./contracts/${contractName}.sol`;
  const source = fs.readFileSync(pathToContract).toString();
  const input = {
    language: "Solidity",
    sources: {
      [contractName]: {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode"],
        },
      },
    },
  };
  const output = JSON.parse(
    await solc.compile(JSON.stringify(input))
  )[`${contractName}.sol`][contractName];

  // Connect to the network and get a signer
  const networkName = "localhost";
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner();

  // Deploy the contract
  const factory = new ethers.ContractFactory(output.abi, output.evm.bytecode.object, signer);
  const contract = await factory.deploy();

  // Write the contract address to a file for the front-end to use
  const pathToAddress = "./src/contract-address.json";
  const contractAddress = { address: contract.address };
  fs.writeFileSync(pathToAddress, JSON.stringify(contractAddress));

  console.log("Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
