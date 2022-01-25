import React, { FC, ReactNode } from "react";
import SnackbarListener from "../../contexts/SnackbarContext/SnackbarListener";
import NavBar from "../Common/NavBar";
import Wallet from "../Wallet/Wallet";
import styles from "../../styles/Home.module.css";
import { Box } from "@mui/material";
import { useSupportedChains } from "../../hooks/useSupportedChains";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  useSupportedChains();
  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
    >
      <NavBar headerChildren={<Wallet />} />
      <div className={styles.container}>{children}</div>
      <SnackbarListener />
    </Box>
  );
};

export default Layout;
