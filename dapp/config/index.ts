import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0xE4f4c58A941E679eF6D5E4740D40cC5A46745a6c",
        abi as any,
        signer
    );
}