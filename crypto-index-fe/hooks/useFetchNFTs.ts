import { useWeb3React } from "@web3-react/core";
import { fetchNfts } from "../utils/calls/nftIndex";
import { useQuery } from "react-query";

export const NFTS_QUERY_KEY = "nftsList";

export const useFetchNfts = () => {
  const { library } = useWeb3React();
  const signer = library?.getSigner();

  const response = useQuery([NFTS_QUERY_KEY], () => fetchNfts(signer), {
    enabled: !!signer,
    initialData: null,
  });

  return response;
};
