"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  const [walletKey, setWalletKey] = useState("");
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [stakingAmount, setStakingAmount] = useState<number>();

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletKey(accounts[0]);
  };

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

  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
    } else {
      setMintingAmount(0);
    }
  };

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

  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
    } else {
      setStakingAmount(0);
    }
  };

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
      window.alert("Withdraw Done");
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Withdrawal failed: ${decodedError?.args}`);
    }
  };

  function renderForm(labelText: string, value: number | undefined, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onClick: () => void) {
    return (
      <div style={formContainerStyle}>
        <form>
          {/* <label>{labelText}</label><br /> Remove this line */}
        </form>

        <input
          type="text"
          value={value !== undefined ? value : ""}
          onChange={(e) => onChange(e)}
          style={{ color: "black" }}
          placeholder={` ${labelText}`}
        />
        
        <button
          onClick={onClick}
          className="p-3 bg-violet-900 text-black transition duration-300 hover:ring-4 hover:ring-violet-700"
          style={{ borderRadius: '0', marginTop: '10px' }}
        >
          {labelText}
        </button>
      </div>
    );
  }

  const mainStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as 'column', // Explicitly define the type as 'column'
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: `url('https://wallpapercave.com/wp/wp8865987.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const containerStyle: React.CSSProperties = {
    border: '2px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    padding: '80px',
    margin: '20px',
    textAlign: 'center' as 'center', // Explicitly define the type as 'center'
    background: 'transparent',
  };

  const formContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
  };

  return (
    <main style={mainStyle}>
      <div style={containerStyle}>
        <form>
          <label> Contract Id: 0x63CdD3987B09917A140a8C4597029419f3Ff7Bc5</label><br />
        </form>

        <button
          onClick={connectWallet}
          className="p-3 bg-violet-900 text-black transition duration-300 hover:ring-4 hover:ring-violet-700"
          style={{ borderRadius: '0', marginRight: '10px' }}
        >
          {walletKey !== "" ? walletKey : " Connect wallet"}
        </button>

        {renderForm("Mint Amount", mintingAmount, mintAmountChange, mintCoin)}

        {renderForm("Stake Amount", stakingAmount, stakeAmountChange, stakeCoin)}

        <div>
          <div>
            <button
              onClick={withdrawCoin}
              className="p-3 bg-violet-900 text-black transition duration-300 hover:ring-4 hover:ring-violet-700"
              style={{ borderRadius: '0', marginTop: '10px' }}
            > 
              {"Withdraw"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
