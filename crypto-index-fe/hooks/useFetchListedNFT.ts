import { useContract } from "./useContract";
import {
  CRYPTO_INDEX_MARKETPLACE,
  CRYPTO_INDEX,
} from "../config/constants/contracts";
import CryptoIndexMarketplaceAbi from "../config/abi/Marketplace.json";
import CryptoIndexAbi from "../config/abi/IndexNFTNumerable.json";
import { fetchMarketplaceNfts } from "../utils/calls/nftMarketplace";
import { useWeb3React } from "@web3-react/core";
import { useQuery } from "react-query";

export const MARKETPLACE_NFTS_QUERY_KEY = "marketplaceNfts";

const useFetchListedNFT = () => {
  const { contract: marketplaceContract } = useContract(
    CRYPTO_INDEX_MARKETPLACE,
    CryptoIndexMarketplaceAbi
  );
  const { contract: cryptoIndexContract } = useContract(
    CRYPTO_INDEX,
    CryptoIndexAbi
  );
  const { library } = useWeb3React();
  const signer = library?.getSigner();
  const response = useQuery(
    [MARKETPLACE_NFTS_QUERY_KEY],
    () =>
      fetchMarketplaceNfts(signer, marketplaceContract, cryptoIndexContract),
    {
      enabled: !!signer && !!marketplaceContract && !!cryptoIndexContract,
      initialData: null,
    }
  );

  return response;
};

export default useFetchListedNFT;
