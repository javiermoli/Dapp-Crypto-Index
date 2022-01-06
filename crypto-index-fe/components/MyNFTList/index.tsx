import { useContract } from "../../hooks/useContract";
import CryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX } from "../../config/constants/contracts";
import List from "../Common/NFTList/List";
import useFetchNFTs from "../../hooks/useFetchNFTs";

const MyNFTList = () => {
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);
  const { NFTs } = useFetchNFTs(contract?.balanceOf, true);

  // useEffect(() => {
  //   contract
  //     ?.approve("0x8b0d39446578de54ab59b95c744d44440fa632e5", 0)
  //     .then((address: any) => console.log("address", address));
  // }, [contract]);

  const burnNft = async (nftId: number, convertToStableCoin: boolean) => {
    if (contract?.burnNFT && nftId) {
      const response = await contract.burnNFT(nftId, convertToStableCoin);
      const waiter = await response.wait();
      if (waiter.confirmations >= 2) console.log("BURNED!!");
    }
  };

  const setTokenColor = async (nftId: number, tokenColor: string) => {
    if (contract?.burnNFT && nftId && tokenColor) {
      const response = await contract.setTokenColor(nftId, tokenColor);
      const waiter = await response.wait();
      if (waiter.confirmations >= 2) console.log("NFT color set!!");
    }
  };

  return (
    <div>
      {
        <List
          title="My NFTs"
          nfts={NFTs}
          burnNFT={burnNft}
          setTokenColor={setTokenColor}
        />
      }
    </div>
  );
};

export default MyNFTList;
