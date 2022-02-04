import React, { FC, ReactNode } from "react";
import SnackbarListener from "../../contexts/SnackbarContext/SnackbarListener";
import NavBar from "../NavBar";
import Wallet from "../Wallet/Wallet";
import styles from "../../styles/Home.module.css";
import { Box } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <Box sx={{ height: "100%" }}>
    <NavBar headerChildren={<Wallet />} />
    <div className={styles.container}>{children}</div>
    <SnackbarListener />
  </Box>
);

export default Layout;
