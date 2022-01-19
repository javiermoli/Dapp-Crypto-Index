import { useContract } from "../../hooks/useContract";
import cryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX } from "../../config/constants/contracts";
import List from "../Common/NFTList/List";
import useFetchNFTs from "../../hooks/useFetchNFTs";
import { NFTMetadata } from "../../types/NFT";
import CardFooter from "./NFTListItem/NftCardFooter/CardFooter";
import { useContractInteraction } from "../../hooks/useContractInteraction";
import { burnNft, setTokenColor } from "../../utils/calls/nftIndex";
import { useEffect, useState } from "react";

const MyNFTList = () => {
  const [shouldUpdateData, setShouldUpdateData] = useState(0);
  const [burnNftCallback, burningNft] = useContractInteraction({
    loading: "Burning token...",
    success: "The token has been burned!",
  });
  const [setTokenColorCallback, addingTokenColor] = useContractInteraction({
    loading: "Adding token color...",
    success: "The token color has been set!",
  });
  const { contract } = useContract(CRYPTO_INDEX, cryptoIndexAbi);
  const { NFTs, isLoading } = useFetchNFTs(
    contract?.balanceOf,
    true,
    shouldUpdateData
  );

  useEffect(() => {
    (() => {
      setShouldUpdateData((prevValue) => (prevValue += 1));
    })();
  }, [burningNft, addingTokenColor, setShouldUpdateData]);

  const handleBurnNft = async (nftId: number, convertToStableCoin: boolean) => {
    if (contract?.burnNFT && nftId >= 0) {
      burnNftCallback(burnNft, contract, nftId, convertToStableCoin);
    }
  };

  const handleSetTokenColor = async (nftId: number, tokenColor: string) => {
    if (contract?.burnNFT && nftId && tokenColor) {
      setTokenColorCallback(setTokenColor, contract, nftId, tokenColor);
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
      nfts={NFTs}
      renderChildren={renderCardFooter}
    />
  );
};

export default MyNFTList;
