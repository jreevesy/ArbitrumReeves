"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  // State for wallet connection
  const [walletKey, setWalletKey] = useState("");

  // State for minting
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  // State for staking
  const [stakingAmount, setStakingAmount] = useState<number>();

  // Connection to the wallet
  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletKey(accounts[0]);
  };

  // Minting function
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  // Mint amount change handler
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
    } else {
      setMintingAmount(0);
    }
  };

  // Staking function
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Staking failed: ${decodedError?.args}`);
    }
  };

  // Staking amount change handler
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
    } else {
      setStakingAmount(0);
    }
  };

  // Withdraw function
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);

      // Show alert when withdrawal is successful
      window.alert("Withdraw Done");
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Withdrawal failed: ${decodedError?.args}`);
    }
  };

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundImage: `url('https://wallpapercave.com/wp/wp8865987.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div style={{
        border: '2px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        padding: '80px',
        margin: '20px',
        textAlign: 'center',
        background: 'transparent'
      }}>
        <form>
          <label> Contract Id: 0x63CdD3987B09917A140a8C4597029419f3Ff7Bc5</label><br></br>
        </form>
        <button
          onClick={() => { connectWallet(); }}
          className="p-3 bg-violet-900 text-black rounded transition duration-300 hover:ring-4 hover:ring-violet-700"
        >
          {walletKey !== "" ? walletKey : " Connect wallet"}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <br></br>
          <form>
            <label> Mint Amount</label><br></br>
          </form>
          <input
            type="text"
            value={mintingAmount}
            onChange={(e) => mintAmountChange(e)}
            style={{ color: "black" }}
            placeholder="Amount of Mint Tokens"
          />
          <button
            onClick={() => mintCoin()}
            className="p-3 bg-violet-900 text-black rounded transition duration-300 hover:ring-4 hover:ring-violet-700"
            style={{ marginTop: '10px' }}
          >
            {"Mint"}
          </button>
        </div>
        <br></br>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <form>
            <label> Stake Amount</label><br></br>
          </form>
          <input
            type="text"
            value={stakingAmount}
            onChange={(e) => stakeAmountChange(e)}
            style={{ color: "Black" }}
            placeholder="Amount of Stake Tokens"
          />
          <button
            onClick={stakeCoin}
            className="p-3 bg-violet-900 text-black rounded transition duration-300 hover:ring-4 hover:ring-violet-700"
            style={{ marginTop: '10px' }}
          >
            {"Stake"}
          </button>
        </div>

        <br></br>

        <div>
          <div>
            <button
              onClick={withdrawCoin}
              className="p-3 bg-violet-900 text-black rounded transition duration-300 hover:ring-4 hover:ring-violet-700"
            >
              {"Withdraw"}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
