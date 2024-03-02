import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("Jreevesy", ["0xAd35C656543bB1ece01Ef7bc6796D73Db3c4fe5b"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});