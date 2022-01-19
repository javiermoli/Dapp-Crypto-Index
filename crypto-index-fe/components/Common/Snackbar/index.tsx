import { FC } from "react";
import { Alert, AlertColor, CircularProgress, Snackbar } from "@mui/material";
import { SnackBarProvider } from "../../../contexts/SnackbarContext/Provider";
import { snackBarTypes } from "../../../config/constants/snackBar";

interface SnackbarComponentProps {
  snackbarData: SnackBarProvider;
  close: () => void;
}

const SnackbarComponent: FC<SnackbarComponentProps> = ({
  snackbarData,
  close,
}) => {
  const { message, open } = snackbarData;
  const type = (snackbarData.type as AlertColor) || "success";
  const infoIcon = type === snackBarTypes.loading && (
    <CircularProgress size={20} color="inherit" />
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    close();
  };

  return (
    <Snackbar
      onClose={handleClose}
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={type === snackBarTypes.loading ? null : 6000}
    >
      <Alert icon={infoIcon} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
