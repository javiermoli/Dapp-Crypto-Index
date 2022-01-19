import { useCallback, useState } from "react";
import useSnackbar from "./useSnackbar";

export interface BlockchainResponse {
  wait: () => Promise<{ confirmations: number }>;
  confirmations: number;
}

export const useContractInteraction = (feedbackMessages: {
  success?: string;
  loading?: string;
  error?: string;
}) => {
  const [counter, setCounter] = useState(0);
  const { snackBarError, snackBarLoading, snackBarSuccess } = useSnackbar();
  const { success, loading, error } = feedbackMessages;

  const callback = useCallback(
    async (
      method: (...params: any[]) => Promise<BlockchainResponse>,
      ...params: any[]
    ) => {
      try {
        const response = await method(...params);
        if (loading) snackBarLoading(loading);

        const waiter = await response.wait();
        if (waiter.confirmations > 0 && success) {
          snackBarSuccess(success);
          setCounter((prevValue: number) => (prevValue += 1));
        }
      } catch (err) {
        if (error) snackBarError(error);
      }
    },
    [error, loading, snackBarError, snackBarLoading, snackBarSuccess, success]
  );

  return [callback, counter] as const;
};
