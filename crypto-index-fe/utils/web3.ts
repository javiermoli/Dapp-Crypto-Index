import { formatUnits } from "@ethersproject/units";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { SUPPORTED_CHAINS } from "../config/constants/chains";
import { BigNumber } from "@ethersproject/bignumber";

export const getLibrary = (
  provider:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc
): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  return library;
};

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAINS,
});

export const formatBigNumber = (value: number | string | BigNumber) =>
  Number(formatUnits(value, "wei"));

export const getContract = (
  address: string,
  abi: ethers.ContractInterface,
  signer: any
) => new ethers.Contract(address, abi, signer);
