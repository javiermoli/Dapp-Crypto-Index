import List from "../Common/NFTList/List";
import { useFetchNfts } from "../../hooks/useFetchNFTs";

const NftsList = () => {
  const { data, isLoading } = useFetchNfts();

  return (
    <div>{<List isLoading={isLoading} title="Total NFTs" nfts={data} />}</div>
  );
};

export default NftsList;
