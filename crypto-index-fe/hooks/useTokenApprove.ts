import { useEffect, useState } from "react";
import {
  CRYPTO_INDEX,
  CRYPTO_INDEX_MARKETPLACE,
} from "../config/constants/contracts";
import { useContract } from "./useContract";
import CryptoIndexAbi from "../config/abi/IndexNFTNumerable.json";

export const useTokenApprove = (tokenId: number, shouldUpdate: number) => {
  const { contract: indexContract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);
  const [isApprove, setIsApprove] = useState(true);

  useEffect(() => {
    (async () => {
      if (indexContract) {
        setIsApprove(true);
        const approval = await indexContract.getApproved(tokenId);
        if (approval !== CRYPTO_INDEX_MARKETPLACE) {
          setIsApprove(false);
        }
      }
    })();

    return () => {
      setIsApprove(false);
    };
  }, [indexContract, tokenId, shouldUpdate]);

  return { isApprove };
};
