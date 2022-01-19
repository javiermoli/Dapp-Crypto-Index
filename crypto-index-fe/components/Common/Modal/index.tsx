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
  bgcolor: "#9e9e9e",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalComponent;
