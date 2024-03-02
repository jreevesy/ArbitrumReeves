import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x63CdD3987B09917A140a8C4597029419f3Ff7Bc5",
        abi as any,
        signer
    );
}