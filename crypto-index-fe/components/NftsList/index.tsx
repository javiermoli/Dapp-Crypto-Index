import { useContract } from "../../hooks/useContract";
import CryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX } from "../../config/constants/contracts";
import List from "../Common/NFTList/List";
import useFetchNFTs from "../../hooks/useFetchNFTs";

const NftsList = () => {
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);
  const { NFTs, isLoading } = useFetchNFTs(contract?.totalSupply, false);

  return (
    <div>{<List isLoading={isLoading} title="Total NFTs" nfts={NFTs} />}</div>
  );
};

export default NftsList;
