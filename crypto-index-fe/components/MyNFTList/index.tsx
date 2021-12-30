import { useContract } from "../../hooks/useContract";
import CryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX } from "../../config/constants/contracts";
import List from "../Common/NFTList/List";
import useFetchNFTs from "../../hooks/useFetchNFTs";

const MyNFTList = () => {
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);
  const { NFTs } = useFetchNFTs(contract?.balanceOf, true);

  const burnNft = async (nftId: number) => {
    if (contract?.burnNFT) {
      const promise = contract.burnNFT(nftId, false);

      promise
        .then((result: any) => {
          console.log(result);
          console.log("BURN!!");
        })
        .catch((error: object) => {
          console.log(error);
        });
    }
  };

  return <div>{<List title="My NFTs" nfts={NFTs} burnNFT={burnNft} />}</div>;
};

export default MyNFTList;
