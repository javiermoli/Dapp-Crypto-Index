import { CRYPTO_INDEX_MARKETPLACE } from "../../../config/constants/contracts";
import { useContract } from "../../../hooks/useContract";
import useFetchListedNFT from "../../../hooks/useFetchListedNFT";
import { buyToken, removeListing } from "../../../utils/calls/nftMarketplace";
import { formatBigNumber } from "../../../utils/web3";
import List from "../../Common/NFTList/List";
import ListedNftCardFooter, { ListedNFTData } from "./ListedNftCardFooter";
import marketplaceAbi from "../../../config/abi/Marketplace.json";
import { useContractInteraction } from "../../../hooks/useContractInteraction";
import { useEffect, useState } from "react";

const MyNFTListM = () => {
  const [shouldUpdateData, setShouldUpdateData] = useState(0);
  const { listedNftsMarketplace, isLoading } =
    useFetchListedNFT(shouldUpdateData);
  const { contract } = useContract(CRYPTO_INDEX_MARKETPLACE, marketplaceAbi);
  const [buyTokenCallback, buyingUpdate] = useContractInteraction({
    loading: "Buying token..",
    success: "The token has been bought!",
  });
  const [removeTokenCallback, removingTokenUpdate] = useContractInteraction({
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

      removeTokenCallback(removeListing, contract, tokenListingId);
    }
  };

  const handleBuyToken = async (listedNftData: ListedNFTData) => {
    if (contract) {
      const { listing_id, price } = listedNftData;
      const tokenListingId = listing_id && formatBigNumber(listing_id);
      const options = {
        value: price,
      };

      buyTokenCallback(buyToken, contract, tokenListingId, options);
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
