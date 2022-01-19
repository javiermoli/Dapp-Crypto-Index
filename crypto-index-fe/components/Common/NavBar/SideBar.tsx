import Link from "next/link";
import React, { FC } from "react";
import { Button, Drawer } from "@mui/material";

interface SideBarProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const SideBar: FC<SideBarProps> = ({ isOpen, toggleDrawer }) => {
  return (
    <Drawer onClose={toggleDrawer} open={isOpen}>
      <Link href="/" passHref>
        <Button>Home</Button>
      </Link>
      <Link href="/marketplace" passHref>
        <Button>Marketplace</Button>
      </Link>
    </Drawer>
  );
};

export default SideBar;
