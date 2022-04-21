import { useWeb3React } from "@web3-react/core";
import { fetchMyNfts } from "../utils/calls/nftIndex";
import { useQuery } from "react-query";

export const MY_NFTS_QUERY_KEY = "myNftsList";

const useFetchNftMyNfts = () => {
  const { library, account } = useWeb3React();
  const signer = library?.getSigner();

  const response = useQuery(
    [MY_NFTS_QUERY_KEY],
    () => fetchMyNfts(signer, account!),
    {
      enabled: !!signer && !!account,
      initialData: null,
    }
  );

  return response;
};

export default useFetchNftMyNfts;
