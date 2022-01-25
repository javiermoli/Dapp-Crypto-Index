import { useContract } from "../../hooks/useContract";
import cryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX } from "../../config/constants/contracts";
import List from "../Common/NFTList/List";
import useFetchNFTs from "../../hooks/useFetchNFTs";
import { NFTMetadata } from "../../types/NFT";
import CardFooter from "./NFTListItem/NftCardFooter/CardFooter";
import { burnNft, setTokenColor } from "../../utils/calls/nftIndex";
import { useEffect, useState } from "react";
import { useFetchWithFeedback } from "../../hooks/useFetchWithFeedback";

const MyNFTList = () => {
  const [shouldUpdateData, setShouldUpdateData] = useState(0);
  const [burnNftCallback, burningNft] = useFetchWithFeedback({
    loading: "Burning token...",
    success: "The token has been burned!",
  });
  const [setTokenColorCallback, addingTokenColor] = useFetchWithFeedback({
    loading: "Changing token color...",
    success: "The token color has been changed!",
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
    if (contract && nftId >= 0) {
      const burnRequest = burnNft(contract, nftId, convertToStableCoin);

      burnNftCallback(burnRequest);
    }
  };

  const handleSetTokenColor = async (nftId: number, tokenColor: string) => {
    if (contract && nftId >= 0 && tokenColor !== "") {
      const changeColorRequest = setTokenColor(contract, nftId, tokenColor);

      setTokenColorCallback(changeColorRequest);
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
