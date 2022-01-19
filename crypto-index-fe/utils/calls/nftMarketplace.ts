import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import { multiCall } from "./multiCall";
import { CRYPTO_INDEX_MARKETPLACE } from "../../config/constants/contracts";
import CryptoIndexMarketplaceAbi from "../../config/abi/Marketplace.json";
import { formatBigNumber } from "../web3";

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

export const listToken = async (
  contract: ethers.Contract,
  tokenId: number,
  price: number | string | BigNumber
) => {
  const listToken = await contract.addListing(tokenId, price);

  return listToken;
};

export const buyToken = async (
  contract: ethers.Contract,
  listingId: number,
  options: any
) => {
  const buyResponse = await contract.buy(listingId, options);

  return buyResponse;
};

export const removeListing = async (
  contract: ethers.Contract,
  listingId: number
) => {
  const removingResponse = await contract.removeListing(listingId);

  return removingResponse;
};
