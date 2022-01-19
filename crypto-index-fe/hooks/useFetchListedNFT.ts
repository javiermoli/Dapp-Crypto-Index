import { useEffect, useState } from "react";
import { useContract } from "./useContract";
import {
  CRYPTO_INDEX_MARKETPLACE,
  CRYPTO_INDEX,
} from "../config/constants/contracts";
import CryptoIndexMarketplaceAbi from "../config/abi/Marketplace.json";
import CryptoIndexAbi from "../config/abi/IndexNFTNumerable.json";
import {
  fetchActiveListingIds,
  fetchListingsData,
  fetchListingsIndexes,
} from "../utils/calls/nftMarketplace";
import { useWeb3React } from "@web3-react/core";
import { fetchNftMetadata } from "../utils/calls/nftIndex";
import { formatBigNumber } from "../utils/web3";

const useFetchListedNFT = (shouldUpdate?: number | string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [listedNftsMarketplace, setListedNftsMarketplace] = useState<any[]>([]);
  const { contract: marketplaceContract } = useContract(
    CRYPTO_INDEX_MARKETPLACE,
    CryptoIndexMarketplaceAbi
  );
  const { contract: cryptoIndexContract } = useContract(
    CRYPTO_INDEX,
    CryptoIndexAbi
  );
  const { library } = useWeb3React();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (library?.getSigner && marketplaceContract && cryptoIndexContract) {
        const signer = library?.getSigner();
        const indexes = await fetchListingsIndexes(marketplaceContract);
        const marketplaceIds = await fetchActiveListingIds(signer, indexes);
        const marketPlaceNftsData = await fetchListingsData(
          signer,
          marketplaceIds
        );
        if (marketPlaceNftsData && marketPlaceNftsData[1]) {
          const marketplaceIds = marketPlaceNftsData[1].map((nft) =>
            formatBigNumber(nft.token_id)
          );
          const nftsMetadata = await fetchNftMetadata(
            marketplaceIds,
            cryptoIndexContract
          );
          // Merge the nft marketplace data with the nft metadata
          const nftsData = nftsMetadata.map((metadata) => ({
            ...metadata,
            ...marketPlaceNftsData[1].find(
              (marketNft) => formatBigNumber(marketNft.token_id) === metadata.id
            ),
          }));

          setListedNftsMarketplace(nftsData);
        } else {
          setListedNftsMarketplace([]);
        }
      }
      setIsLoading(false);
    })();
  }, [library, marketplaceContract, cryptoIndexContract, shouldUpdate]);

  return { listedNftsMarketplace, isLoading };
};

export default useFetchListedNFT;
