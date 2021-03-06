import { BigNumber, ethers } from "ethers";
import { formatBigNumber, getContract } from "../web3";
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

export const approveToken = async (config: {
  tokenId: number;
  contract: ethers.Contract;
  operator: string;
}) => {
  const { tokenId, contract, operator } = config;
  const approvedResponse = await contract?.approve(operator, tokenId);
  const waiter = await approvedResponse.wait();

  return waiter;
};

export const isTokenApprove = async (getApproved: any, tokenId: number) => {
  const approval = await getApproved(tokenId);

  return approval;
};

export const burnNft = async (
  contract: ethers.Contract,
  tokenId: number,
  convertToStableCoin: boolean
) => {
  const burnResponse = await contract.burnNFT(tokenId, convertToStableCoin);
  const waiter = await burnResponse.wait();

  return waiter;
};

export const setTokenColor = async (config: {
  contract: ethers.Contract;
  nftId: number;
  tokenColor: string;
}) => {
  const { contract, nftId, tokenColor } = config;
  const tokenColorResponse = await contract.setTokenColor(nftId, tokenColor);
  const waiter = await tokenColorResponse.wait();

  return waiter;
};

export const mint = async (config: { contract: ethers.Contract }) => {
  const { contract } = config;
  const minting = await contract.mint();
  const waiter = await minting.wait();

  return waiter;
};

export const setNftURIs = async (config: {
  contract: ethers.Contract;
  uris: string[];
}) => {
  const { contract, uris } = config;
  const settingUris = await contract.setTokenURIs(uris);
  const waiter = await settingUris.wait();

  return waiter;
};

export const fetchNfts = async (signer: any) => {
  const contract = getContract(CRYPTO_INDEX, CryptoIndexAbi, signer);
  const totalTokens = await contract.totalSupply();
  const totalTokensFormatted = formatBigNumber(totalTokens);
  const tokensIndexArr = Array.from(Array(totalTokensFormatted).keys());
  const ids = await fetchNftByIndex(tokensIndexArr, signer);
  const metadata = await fetchNftMetadata(ids, contract);

  return metadata;
};

export const fetchMyNfts = async (signer: any, account: string) => {
  const contract = getContract(CRYPTO_INDEX, CryptoIndexAbi, signer);
  const totalTokens = await contract.balanceOf(account);
  const totalTokensFormatted = formatBigNumber(totalTokens);
  const tokensIndexArr = Array.from(Array(totalTokensFormatted).keys());
  const ids = await fetchNftOfOwnerByIndex(tokensIndexArr, signer, account);
  const metadata = await fetchNftMetadata(ids, contract);

  return metadata;
};
