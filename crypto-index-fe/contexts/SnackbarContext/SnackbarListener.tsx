import SnackbarComponent from "../../components/Common/Snackbar";
import useSnackbar from "../../hooks/useSnackbar";

const SnackbarListener = () => {
  const { snackBarData, closeSnackBar } = useSnackbar();

  return (
    <SnackbarComponent close={closeSnackBar} snackbarData={snackBarData} />
  );
};

export default SnackbarListener;
