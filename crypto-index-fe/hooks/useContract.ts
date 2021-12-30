import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const useContract = (address: string, abi: ethers.ContractInterface) => {
  const { library } = useWeb3React();
  const [contract, setContract] = useState<ethers.Contract | undefined>();

  useEffect(() => {
    const signer = library?.getSigner();
    if (signer) {
      const ethersContract = new ethers.Contract(address, abi, signer);
      setContract(ethersContract);
    }
  }, [address, abi, library]);

  return { contract };
};
