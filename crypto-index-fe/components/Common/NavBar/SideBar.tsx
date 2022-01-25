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

const SideBar: FC<SideBarProps> = ({ isOpen, toggleDrawer, isOwner }) => (
  <Drawer onClose={toggleDrawer} open={isOpen}>
    <List>
      <Link href="/" passHref>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
      </Link>
      <Divider />
      <Link href="/marketplace" passHref>
        <ListItem button>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText>Marketplace</ListItemText>
        </ListItem>
      </Link>
      {isOwner && (
        <>
          <Divider />
          <Link href="/owner" passHref>
            <ListItem button>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText>Owner</ListItemText>
            </ListItem>
          </Link>
        </>
      )}
    </List>
  </Drawer>
);

export default SideBar;
