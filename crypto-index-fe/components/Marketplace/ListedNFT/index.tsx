import { CRYPTO_INDEX_MARKETPLACE } from "../../../config/constants/contracts";
import { useContract } from "../../../hooks/useContract";
import useFetchListedNFT, {
  MARKETPLACE_NFTS_QUERY_KEY,
} from "../../../hooks/useFetchListedNFT";
import { buyToken, removeListing } from "../../../utils/calls/nftMarketplace";
import { formatBigNumber } from "../../../utils/web3";
import List from "../../Common/NFTList/List";
import ListedNftCardFooter, { ListedNFTData } from "./ListedNftCardFooter";
import marketplaceAbi from "../../../config/abi/Marketplace.json";
import { useMutations } from "../../../hooks/useMutations";
import useSnackbar from "../../../hooks/useSnackbar";

const MyNFTListM = () => {
  const { data, isLoading } = useFetchListedNFT();
  const { contract } = useContract(CRYPTO_INDEX_MARKETPLACE, marketplaceAbi);
  const removeTokenFromTheMarketplace = useMutations(removeListing, [
    MARKETPLACE_NFTS_QUERY_KEY,
  ]);
  const buyTokenFromMarketplace = useMutations(buyToken, [
    MARKETPLACE_NFTS_QUERY_KEY,
  ]);
  const { snackBarLoading } = useSnackbar();

  const handleRemoveToken = async (listedNftData: ListedNFTData) => {
    if (contract) {
      const { listing_id } = listedNftData;
      const tokenListingId = listing_id && formatBigNumber(listing_id);

      snackBarLoading("Removing from marketplace...");
      removeTokenFromTheMarketplace({ contract, tokenListingId });
    }
  };

  const handleBuyToken = async (listedNftData: ListedNFTData) => {
    if (contract) {
      const { listing_id, price } = listedNftData;
      const tokenListingId = listing_id && formatBigNumber(listing_id);
      const options = {
        value: price,
      };

      snackBarLoading("Buying NFT...");
      buyTokenFromMarketplace({ contract, tokenListingId, options });
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
      nfts={data}
    />
  );
};

export default MyNFTListM;
