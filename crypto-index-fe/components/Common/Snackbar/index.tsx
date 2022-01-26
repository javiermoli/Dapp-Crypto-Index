import { FC } from "react";
import { Alert, AlertColor, CircularProgress, Snackbar } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
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
  const type = snackbarData.type as AlertColor;
  const infoIcon = {
    [snackBarTypes.loading]: <CircularProgress size={20} color="inherit" />,
    [snackBarTypes.error]: <ErrorOutlineIcon color="inherit" />,
    [snackBarTypes.success]: <CheckCircleOutlineIcon color="inherit" />,
  };

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
      <Alert
        icon={infoIcon[type]}
        severity={type}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
