import React, { FC, ReactNode } from "react";
import NavBar from "../Common/NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
);

export default Layout;
