import { BigNumber } from "@ethersproject/bignumber";
import { Contract, ethers } from "ethers";
import { multiCall } from "./multiCall";
import { CRYPTO_INDEX_MARKETPLACE } from "../../config/constants/contracts";
import CryptoIndexMarketplaceAbi from "../../config/abi/Marketplace.json";
import { formatBigNumber } from "../web3";
import { fetchNftMetadata } from "./nftIndex";

export const fetchListingsIndexes = async (contract: ethers.Contract) => {
  if (contract) {
    const totalListingsBigNumber = await contract.getActiveListingsCount();
    const totalListings: number = formatBigNumber(totalListingsBigNumber);
    const indexes: number[] = Array.from(Array(totalListings).keys());

    return indexes;
  }
  return [];
};

export const fetchActiveListingIds = async (signer: any, indexes: number[]) => {
  const activeListingsSetting = {
    signer,
    totalItems: indexes,
    contractAddress: CRYPTO_INDEX_MARKETPLACE,
    contractFunctionName: "getActiveListings",
    abi: CryptoIndexMarketplaceAbi,
  };
  const multiCallResponse = await multiCall(activeListingsSetting);
  const ids =
    multiCallResponse[1] &&
    multiCallResponse[1].map((id: BigNumber) => formatBigNumber(id));

  return ids;
};

export const fetchListingsData = async (signer: any, ids: number[]) => {
  const listingsDataSettings = {
    signer,
    totalItems: ids,
    contractAddress: CRYPTO_INDEX_MARKETPLACE,
    contractFunctionName: "listings",
    abi: CryptoIndexMarketplaceAbi,
  };
  const tokensData = await multiCall(listingsDataSettings);

  return tokensData;
};

export const listToken = async (config: {
  contract: ethers.Contract;
  tokenId: number;
  price: number | string | BigNumber;
}) => {
  const { contract, tokenId, price } = config;
  const listing = await contract.addListing(tokenId, price);
  const waiter = await listing.wait();

  return waiter;
};

export const buyToken = async (config: {
  contract: ethers.Contract;
  tokenListingId: number;
  options: any;
}) => {
  const { contract, tokenListingId, options } = config;
  const buying = await contract.buy(tokenListingId, options);
  const waiter = await buying.wait();

  return waiter;
};

export const removeListing = async (config: {
  contract: ethers.Contract;
  tokenListingId: number;
}) => {
  const { contract, tokenListingId } = config;
  const removing = await contract.removeListing(tokenListingId);
  const waiter = await removing.wait();

  return waiter;
};

export const fetchMarketplaceNfts = async (
  signer: any,
  marketplaceContract?: Contract,
  cryptoIndexContract?: Contract
) => {
  const indexes = await fetchListingsIndexes(marketplaceContract!);
  const activeListingIds = await fetchActiveListingIds(signer, indexes);
  const marketPlaceNftsData = await fetchListingsData(signer, activeListingIds);

  const marketplaceIds = marketPlaceNftsData[1].map((nft) =>
    formatBigNumber(nft.token_id)
  );
  const nftsMetadata = await fetchNftMetadata(
    marketplaceIds,
    cryptoIndexContract!
  );
  // Merge the nft marketplace data with the nft metadata
  const nftsData = nftsMetadata.map((metadata) => ({
    ...metadata,
    ...marketPlaceNftsData[1].find(
      (marketNft) => formatBigNumber(marketNft.token_id) === metadata.id
    ),
  }));

  return nftsData;
};
