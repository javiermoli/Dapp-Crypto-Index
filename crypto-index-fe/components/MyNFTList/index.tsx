import { useContract } from "../../hooks/useContract";
import cryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX } from "../../config/constants/contracts";
import List from "../Common/NFTList/List";
import { NFTMetadata } from "../../types/NFT";
import CardFooter from "./NFTListItem/NftCardFooter/CardFooter";
import { burnNft, setTokenColor } from "../../utils/calls/nftIndex";
import useFetchNftMyNfts, {
  MY_NFTS_QUERY_KEY,
} from "../../hooks/useFetchNftMyNfts";
import { useMutations } from "../../hooks/useMutations";
import { NFTS_QUERY_KEY } from "../../hooks/useFetchNFTs";
import useSnackbar from "../../hooks/useSnackbar";

const MyNFTList = () => {
  const { snackBarLoading } = useSnackbar();
  const changeColor = useMutations(setTokenColor, [
    MY_NFTS_QUERY_KEY,
    NFTS_QUERY_KEY,
  ]);
  const burn = useMutations(burnNft);
  const { contract } = useContract(CRYPTO_INDEX, cryptoIndexAbi);
  const { data, isLoading } = useFetchNftMyNfts();

  const handleBurnNft = async (nftId: number, convertToStableCoin: boolean) => {
    if (contract && nftId >= 0) {
      snackBarLoading("Burning NFT...");
      burn({ contract, nftId, convertToStableCoin });
    }
  };

  const handleSetTokenColor = async (nftId: number, tokenColor: string) => {
    if (contract && nftId >= 0 && tokenColor !== "") {
      snackBarLoading("Setting token color...");
      changeColor({ contract, nftId, tokenColor });
    }
  };

  const renderCardFooter = (nftData: NFTMetadata) => (
    <CardFooter
      setTokenColor={handleSetTokenColor}
      burnNft={handleBurnNft}
      nftData={nftData}
    />
  );

  return (
    <List
      isLoading={isLoading}
      title="My NFTs"
      nfts={data}
      renderChildren={renderCardFooter}
    />
  );
};

export default MyNFTList;
