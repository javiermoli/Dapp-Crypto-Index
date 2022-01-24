import { useCallback, useState } from "react";
import useSnackbar from "./useSnackbar";

export interface Response {
  wait: () => Promise<{ confirmations: number }>;
  confirmations: number;
}

export const useFetchWithFeedback = (feedbackMessages: {
  success?: string;
  loading?: string;
  error?: string;
}) => {
  const [counter, setCounter] = useState(0);
  const { snackBarError, snackBarLoading, snackBarSuccess } = useSnackbar();
  const { success, loading, error } = feedbackMessages;

  const callback = useCallback(
    async (action: Promise<any>) => {
      try {
        const response = await action;
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
