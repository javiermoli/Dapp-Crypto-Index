import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useContract } from "./useContract";
import { CRYPTO_INDEX } from "../config/constants/contracts";
import CryptoIndexAbi from "../config/abi/IndexNFTNumerable.json";

const useOwner = () => {
  const { account } = useWeb3React();
  const [owner, setOwner] = useState("");
  const [isOwner, setIsOwner] = useState<boolean>();
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);

  useEffect(() => {
    (async () => {
      try {
        const owner = await contract?.owner();
        if (account && owner) {
          setOwner(owner);
          if (owner === account) {
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [account, contract]);

  return { owner, isOwner };
};

export default useOwner;
