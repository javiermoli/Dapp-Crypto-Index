import React, { FC, ReactNode } from "react";
import SnackbarListener from "../../contexts/SnackbarContext/SnackbarListener";
import NavBar from "../Common/NavBar";
import Wallet from "../Wallet/Wallet";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <NavBar headerChildren={<Wallet />} />
    {children}
    <SnackbarListener />
  </>
);

export default Layout;
