import { createContext, useState, FC, useCallback } from "react";
import { snackBarTypes } from "../../config/constants/snackBar";

export interface SnackBarProvider {
  message: string;
  type: string;
  open?: boolean;
}

export interface SnackBarContextProvider {
  snackBarData: SnackBarProvider;
  snackBarError: (message: string) => void;
  snackBarSuccess: (message: string) => void;
  snackBarLoading: (message: string) => void;
  closeSnackBar: () => void;
}

export const SnackBarContext = createContext<SnackBarContextProvider>(
  {} as SnackBarContextProvider
);

const defaultSnackProvider = { message: "", type: "", open: false };

export const SnackbarProvider: FC = ({ children }) => {
  const [snackBarData, setSnackBarData] =
    useState<SnackBarProvider>(defaultSnackProvider);

  const snackBar = ({ message, type }: SnackBarProvider) => {
    setSnackBarData({
      message,
      type,
      open: true,
    });
  };

  const snackBarError = useCallback((message: string) => {
    snackBar({ message, type: snackBarTypes.error });
  }, []);

  const snackBarSuccess = useCallback((message: string) => {
    snackBar({ message, type: snackBarTypes.success });
  }, []);

  const snackBarLoading = useCallback((message: string) => {
    snackBar({ message, type: snackBarTypes.loading });
  }, []);

  const closeSnackBar = () => {
    setSnackBarData(defaultSnackProvider);
  };

  return (
    <SnackBarContext.Provider
      value={{
        snackBarData,
        snackBarError,
        snackBarSuccess,
        snackBarLoading,
        closeSnackBar,
      }}
    >
      {children}
    </SnackBarContext.Provider>
  );
};
