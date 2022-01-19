import { useContext } from "react";
import { SnackBarContext } from "../contexts/SnackbarContext/Provider";

const useSnackbar = () => {
  const snackbar = useContext(SnackBarContext);

  if (!snackbar) {
    throw new Error("Snackbar is undefined!");
  }

  return snackbar;
};

export default useSnackbar;
