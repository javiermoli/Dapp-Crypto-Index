import { ethers } from "ethers";
import { formatBigNumber } from "../web3";

export const fetchNftMetadata = async (
  ids: number[],
  contract: ethers.Contract
) => {
  const metadataPromises = ids.map(async (id) => {
    const tokenURI = await contract?.tokenURI(id);
    const getMetadata = await fetch(tokenURI);
    const tokenMetadata = await getMetadata.json();
    const newNFT = {
      id,
      ...tokenMetadata,
    };

    return newNFT;
  });

  return Promise.all(metadataPromises);
};

export const fetchNftOfOwnerByIndex = async (
  indexes: number[],
  contract: ethers.Contract,
  account: string
) => {
  const ids = indexes.map(async (index) => {
    const responseId = await contract?.tokenOfOwnerByIndex(account, index);
    const id = formatBigNumber(responseId);

    return id;
  });

  return Promise.all(ids);
};

export const fetchNftByIndex = async (
  indexes: number[],
  contract: ethers.Contract
) => {
  const ids = indexes.map(async (index) => {
    const responseId = await contract?.tokenByIndex(index);
    const id = formatBigNumber(responseId);

    return id;
  });

  return Promise.all(ids);
};

export const getApproved = async (
  tokenId: number,
  contract: ethers.Contract
) => {
  const approveAccount = await contract?.getApproved(tokenId);

  return approveAccount;
};

export const approveToken = async (
  tokenId: number,
  contract: ethers.Contract,
  operator: string
) => {
  const approvedResponse = await contract?.approve(operator, tokenId);

  return approvedResponse;
};

export const burnNft = async (
  contract: ethers.Contract,
  tokenId: number,
  convertToStableCoin: boolean
) => {
  const approvedResponse = await contract.burnNFT(tokenId, convertToStableCoin);

  return approvedResponse;
};

export const setTokenColor = async (
  contract: ethers.Contract,
  tokenId: number,
  color: string
) => {
  const approvedResponse = await contract.setTokenColor(tokenId, color);

  return approvedResponse;
};
