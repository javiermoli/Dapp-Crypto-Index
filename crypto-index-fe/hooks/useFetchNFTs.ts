import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useContract } from "../hooks/useContract";
import CryptoIndexAbi from "../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX } from "../config/constants/contracts";
import { BigNumber } from "@ethersproject/bignumber";
import {
  fetchNftByIndex,
  fetchNftMetadata,
  fetchNftOfOwnerByIndex,
} from "../utils/calls/nftIndex";
import { NFTMetadata } from "../types/NFT";
import { formatBigNumber } from "../utils/web3";

const useFetchNFTs = (
  callback: (account?: string) => Promise<BigNumber>,
  fetchMyNFTs: boolean,
  shouldUpdate?: number
) => {
  const [isLoading, setIsLoading] = useState(false);
  const { account } = useWeb3React();
  const [tokensIds, setTokensIds] = useState<NFTMetadata[]>([]);
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        if (contract && account) {
          const totalTokens = fetchMyNFTs
            ? await callback(account)
            : await callback();
          const totalTokensFormatted = formatBigNumber(totalTokens);
          const tokensIndexArr = Array.from(Array(totalTokensFormatted).keys());
          const ids = fetchMyNFTs
            ? await fetchNftOfOwnerByIndex(tokensIndexArr, contract, account)
            : await fetchNftByIndex(tokensIndexArr, contract);
          const metadata = await fetchNftMetadata(ids, contract);

          setTokensIds(metadata);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    })();
  }, [contract, account, callback, fetchMyNFTs, shouldUpdate]);

  return { NFTs: tokensIds, isLoading };
};

export default useFetchNFTs;
