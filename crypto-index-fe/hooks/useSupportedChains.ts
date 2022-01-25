import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import useSnackbar from "./useSnackbar";
import { unsupportedChainIdError } from "../config/constants/errorTypes";

export const useSupportedChains = () => {
  const [currentChainIsSupported, setCurrentChainIsSupported] = useState(true);
  const { error } = useWeb3React();
  const { snackBarError } = useSnackbar();

  useEffect(() => {
    if (error?.name === unsupportedChainIdError) {
      snackBarError(`Current chain is not supported`);
      setCurrentChainIsSupported(false);
    } else {
      setCurrentChainIsSupported(true);
    }
  }, [error, snackBarError]);

  return { currentChainIsSupported };
};
