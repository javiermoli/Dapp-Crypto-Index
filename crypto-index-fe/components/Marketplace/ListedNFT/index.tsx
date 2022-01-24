import { CRYPTO_INDEX_MARKETPLACE } from "../../../config/constants/contracts";
import { useContract } from "../../../hooks/useContract";
import useFetchListedNFT from "../../../hooks/useFetchListedNFT";
import { buyToken, removeListing } from "../../../utils/calls/nftMarketplace";
import { formatBigNumber } from "../../../utils/web3";
import List from "../../Common/NFTList/List";
import ListedNftCardFooter, { ListedNFTData } from "./ListedNftCardFooter";
import marketplaceAbi from "../../../config/abi/Marketplace.json";
import { useEffect, useState } from "react";
import { useFetchWithFeedback } from "../../../hooks/useFetchWithFeedback";

const MyNFTListM = () => {
  const [shouldUpdateData, setShouldUpdateData] = useState(0);
  const { listedNftsMarketplace, isLoading } =
    useFetchListedNFT(shouldUpdateData);
  const { contract } = useContract(CRYPTO_INDEX_MARKETPLACE, marketplaceAbi);
  const [buyTokenCallback, buyingUpdate] = useFetchWithFeedback({
    loading: "Buying token..",
    success: "The token has been bought!",
  });
  const [removeTokenCallback, removingTokenUpdate] = useFetchWithFeedback({
    loading: "Removing token..",
    success: "The token has been removed!",
  });

  useEffect(() => {
    (() => {
      setShouldUpdateData((prevValue) => (prevValue += 1));
    })();
  }, [buyingUpdate, removingTokenUpdate, setShouldUpdateData]);

  const handleRemoveToken = async (listedNftData: ListedNFTData) => {
    if (contract) {
      const { listing_id } = listedNftData;
      const tokenListingId = listing_id && formatBigNumber(listing_id);
      const removeTokenRequest = removeListing(contract, tokenListingId);

      removeTokenCallback(removeTokenRequest);
    }
  };

  const handleBuyToken = async (listedNftData: ListedNFTData) => {
    if (contract) {
      const { listing_id, price } = listedNftData;
      const tokenListingId = listing_id && formatBigNumber(listing_id);
      const options = {
        value: price,
      };
      const buyTokenRequest = buyToken(contract, tokenListingId, options);

      buyTokenCallback(buyTokenRequest);
    }
  };

  const renderCardFooter = (listedNftData: ListedNFTData) => (
    <ListedNftCardFooter
      removeToken={handleRemoveToken}
      buyToken={handleBuyToken}
      listedNftData={listedNftData}
    />
  );

  return (
    <List
      isLoading={isLoading}
      renderChildren={renderCardFooter}
      title="Listed NFTs"
      nfts={listedNftsMarketplace}
    />
  );
};

export default MyNFTListM;
