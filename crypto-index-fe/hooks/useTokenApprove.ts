import {
  CRYPTO_INDEX,
  CRYPTO_INDEX_MARKETPLACE,
} from "../config/constants/contracts";
import { useContract } from "./useContract";
import CryptoIndexAbi from "../config/abi/IndexNFTNumerable.json";
import { useQuery } from "react-query";
import { isTokenApprove } from "../utils/calls/nftIndex";

export const IS_TOKEN_APPROVE_QUERY_KEY = "isTokenApprove";

export const useIsTokenApprove = (tokenId: number) => {
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);

  const { data } = useQuery(
    [IS_TOKEN_APPROVE_QUERY_KEY],
    () => isTokenApprove(contract?.getApproved, tokenId),
    { enabled: !!contract?.getApproved }
  );

  return data === CRYPTO_INDEX_MARKETPLACE;
};
