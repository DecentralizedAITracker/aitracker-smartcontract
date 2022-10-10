// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require('fs')
async function main() {
  
  const dapp_address = '0x8c9f733bEB7F73843ad3dcE2A7EB66beDD4A3476';
  const AITracker = await hre.ethers.getContractFactory("AITracker");
  const aitracker = await AITracker.deploy(dapp_address);
  await aitracker.deployed();
  const data = {
    address : aitracker.address,
    abi : JSON.parse(aitracker.interface.format('json'))
  }
  fs.writeFileSync('./AITrackerXMRUSDT_TEST.json',JSON.stringify(data))

  console.log(
    `Deployed with dapp address ${dapp_address} deployed to ${aitracker.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
