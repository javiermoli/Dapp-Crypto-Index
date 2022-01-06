import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { SUPPORTED_CHAINS } from "../config/constants/chains";

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
