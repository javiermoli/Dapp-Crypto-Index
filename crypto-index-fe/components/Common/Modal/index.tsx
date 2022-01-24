import { FC } from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react-transition-group/node_modules/@types/react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

interface ModalComponentProps {
  handleClose: () => void;
  children: ReactNode;
  isOpen: boolean;
}

const ModalComponent: FC<ModalComponentProps> = ({
  handleClose,
  children,
  isOpen,
}) => {
  return (
    <Modal sx={{ textAlign: "center" }} open={isOpen} onClose={handleClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalComponent;
