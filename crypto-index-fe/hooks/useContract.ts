import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { getContract } from "../utils/web3";

export const useContract = (address: string, abi: ethers.ContractInterface) => {
  const { library } = useWeb3React();
  const [contract, setContract] = useState<ethers.Contract | undefined>();

  useEffect(() => {
    const signer = library?.getSigner();
    if (signer) {
      const ethersContract = getContract(address, abi, signer);
      setContract(ethersContract);
    }

    return () => {
      setContract(undefined);
    };
  }, [address, abi, library]);

  return { contract };
};
