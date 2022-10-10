const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("AITracker", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployAITracker() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const dapp_address = '0xCD167e052bbCfeeD505D9a9d5cB54feCeE995b7D';
    const AITracker = await ethers.getContractFactory("AITracker");
    const aitracker = await AITracker.deploy(dapp_address);

    return { aitracker, dapp_address, owner };
  }

  describe("Deployment", function () {
    it("Should set the right dapp address", async function () {
      const { aitracker, dapp_address } = await loadFixture(deployAITracker);

      expect(await aitracker.dapp_address()).to.equal(dapp_address);
    });

    it("Should set the right owner", async function () {
      const { aitracker, owner } = await loadFixture(deployAITracker);

      expect(await aitracker.owner()).to.equal(owner.address);
    });

  });

  describe("Stats", function () {
  
    describe("updateStats", function () {
      it("Should update stats", async function () {
        const { aitracker, dapp_address } = await loadFixture(
          deployAITracker
        );
        expect(await aitracker.updateStats(true,dapp_address))
          .to.emit(aitracker, "Stats")
          .withArgs(dapp_address, 1,1,0); // We accept any value as `when` arg
      });
    });
    describe("fetchStats",function(){
      it("Should fetch the right values",async function(){
        const { aitracker, dapp_address } = await loadFixture(
          deployAITracker
        );
        expect(await aitracker.fetchStats()).to.deep.equal([dapp_address,0,0,0])
      })
    })
    describe("fetch stats after update true",function(){
      it("Should fetch the right values",async function(){
        const { aitracker, dapp_address } = await loadFixture(
          deployAITracker
        );
        await aitracker.updateStats(true,dapp_address)
        expect(await aitracker.fetchStats()).to.deep.equal([dapp_address,1,1,0])
      })
    })
    describe("fetch stats after update false",function(){
      it("Should fetch the right values",async function(){
        const { aitracker, dapp_address } = await loadFixture(
          deployAITracker
        );
        await aitracker.updateStats(false,dapp_address)
        expect(await aitracker.fetchStats()).to.deep.equal([dapp_address,1,0,1])
      })
    })
  });
});
