import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useContract } from "../hooks/useContract";
import CryptoIndexAbi from "../config/abi/IndexNFTNumerable.json";
import { formatUnits } from "@ethersproject/units";
import { CRYPTO_INDEX } from "../config/constants/contracts";
import { NFTMetadata } from "../types/NFT";
import { BigNumber } from "@ethersproject/bignumber";

const useFetchNFTs = (
  callback: (account?: string) => BigNumber,
  useAccount: boolean
) => {
  const { account } = useWeb3React();
  const [NFTs, setNFTs] = useState<NFTMetadata[]>([]);
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);

  useEffect(() => {
    (async () => {
      try {
        if (contract && account) {
          const totalTokens = useAccount
            ? await callback(account)
            : await callback();
          const totalTokensFormatted = Number(formatUnits(totalTokens, "wei"));

          for (let index = 0; index < totalTokensFormatted; index++) {
            const NFTId = await contract?.tokenByIndex(index);
            const id = Number(formatUnits(NFTId, "wei"));
            const tokenURI = await contract?.tokenURI(id);
            const getMetadata = await fetch(tokenURI);
            const tokenMetadata = await getMetadata.json();
            const newNFT = {
              id,
              ...tokenMetadata,
            };

            setNFTs((currentValue) => [...currentValue, newNFT]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [contract, account, callback, useAccount]);

  return { NFTs };
};

export default useFetchNFTs;
