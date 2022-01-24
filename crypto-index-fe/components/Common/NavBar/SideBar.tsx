import Link from "next/link";
import React, { FC } from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

interface SideBarProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  isOwner: boolean;
}

const SideBar: FC<SideBarProps> = ({ isOpen, toggleDrawer, isOwner }) => {
  return (
    <Drawer onClose={toggleDrawer} open={isOpen}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Link href="/" passHref>
            <ListItemText>Home</ListItemText>
          </Link>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <Link href="/marketplace" passHref>
            <ListItemText>Marketplace</ListItemText>
          </Link>
        </ListItem>
        {isOwner && (
          <>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <Link href="/owner" passHref>
                <ListItemText>Owner</ListItemText>
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default SideBar;
