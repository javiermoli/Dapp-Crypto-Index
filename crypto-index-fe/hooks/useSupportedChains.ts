import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useSnackbar from "./useSnackbar";
import { SUPPORTED_CHAINS } from "../config/constants/chains";

export const useSupportedChains = () => {
  const [currentChainIsSupported, setCurrentChainIsSupported] = useState(true);
  const { error, chainId } = useWeb3React();
  const { snackBarError } = useSnackbar();

  useEffect(() => {
    if (error && !SUPPORTED_CHAINS.includes(chainId || 0)) {
      snackBarError(
        `Current chain is not supported. Please, use Kovan testnet.`
      );
      setCurrentChainIsSupported(false);
    } else {
      setCurrentChainIsSupported(true);
    }
  }, [error, snackBarError, chainId]);

  return { currentChainIsSupported };
};
