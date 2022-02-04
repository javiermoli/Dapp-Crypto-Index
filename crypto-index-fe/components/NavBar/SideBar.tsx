import Link from "next/link";
import { FC, Fragment } from "react";
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
import { useRouter } from "next/router";
import { ROUTES, routesName } from "../../config/constants/routes";

interface SideBarProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  isOwner: boolean;
}

const SideBar: FC<SideBarProps> = ({ isOpen, toggleDrawer, isOwner }) => {
  const { pathname } = useRouter();

  const routesConfig = {
    [routesName.home]: { icon: <HomeIcon />, name: "Home" },
    [routesName.marketplace]: { icon: <StorefrontIcon />, name: "Marketplace" },
    [routesName.owner]: { icon: <ManageAccountsIcon />, name: "Owner" },
  };

  return (
    <Drawer onClose={toggleDrawer} open={isOpen}>
      <List>
        {ROUTES.map(
          (route, index) =>
            ((isOwner && route === routesName.owner) ||
              route !== routesName.owner) && (
              <Fragment key={route}>
                {index ? <Divider /> : null}
                <Link href={route} passHref>
                  <ListItem selected={route === pathname} button>
                    <ListItemIcon>{routesConfig[route].icon}</ListItemIcon>
                    <ListItemText>{routesConfig[route].name}</ListItemText>
                  </ListItem>
                </Link>
              </Fragment>
            )
        )}
      </List>
    </Drawer>
  );
};

export default SideBar;
