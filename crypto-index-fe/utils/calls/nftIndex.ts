import { BigNumber, ethers } from "ethers";
import { formatBigNumber } from "../web3";
import { multiCall } from "./multiCall";
import { CRYPTO_INDEX } from "../../config/constants/contracts";
import CryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";

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
  signer: ethers.Signer,
  account: string
) => {
  const totalItems = indexes.map((index) => [account, index]);
  const nftByIndexSetting = {
    signer,
    totalItems: totalItems,
    contractAddress: CRYPTO_INDEX,
    contractFunctionName: "tokenOfOwnerByIndex",
    abi: CryptoIndexAbi,
  };
  const multiCallResponse = await multiCall(nftByIndexSetting);
  const ids =
    multiCallResponse[1] &&
    multiCallResponse[1].map((id: BigNumber) => formatBigNumber(id));

  return ids;
};

export const fetchNftByIndex = async (indexes: number[], signer: any) => {
  const nftByIndexSetting = {
    signer,
    totalItems: indexes,
    contractAddress: CRYPTO_INDEX,
    contractFunctionName: "tokenByIndex",
    abi: CryptoIndexAbi,
  };
  const multiCallResponse = await multiCall(nftByIndexSetting);
  const ids =
    multiCallResponse[1] &&
    multiCallResponse[1].map((id: BigNumber) => formatBigNumber(id));

  return ids;
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
