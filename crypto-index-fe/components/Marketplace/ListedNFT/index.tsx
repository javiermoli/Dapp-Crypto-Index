import CryptoIndexMarketplaceAbi from "../../../config/abi/Marketplace.json";
import { useContract } from "../../../hooks/useContract";
import List from "../../Common/NFTList/List";
import useFetchNFTs from "../../../hooks/useFetchNFTs";
import { CRYPTO_INDEX_MARKETPLACE } from "../../../config/constants/contracts";

const MyNFTList = () => {
  const { contract } = useContract(
    CRYPTO_INDEX_MARKETPLACE,
    CryptoIndexMarketplaceAbi
  );
  const { NFTs } = useFetchNFTs(contract?.balanceOf, true);

  //   useEffect(() => {
  //     contract
  //       ?.approve("0x8b0d39446578de54ab59b95c744d44440fa632e5", 0)
  //       .then((address: any) => console.log("address", address));
  //   }, [contract]);

  //   const burnNft = async (nftId: number, convertToStableCoin: boolean) => {
  //     if (contract?.burnNFT && nftId) {
  //       const response = await contract.burnNFT(nftId, convertToStableCoin);
  //       const waiter = await response.wait();
  //       if (waiter.confirmations >= 2) console.log("BURNED!!");
  //     }
  //   };

  return (
    <div>
      <List title="My NFTs" nfts={NFTs} />
    </div>
  );
};

export default MyNFTList;
