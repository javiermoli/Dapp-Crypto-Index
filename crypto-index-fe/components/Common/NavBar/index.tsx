import React, { useState, useEffect, ReactNode, FC } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useRouter } from "next/router";

interface NavBarProps {
  headerChildren?: ReactNode;
}

const NavBar: FC<NavBarProps> = ({ headerChildren }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const openDrawer = () => setIsOpen(true);

  const closeDrawer = () => setIsOpen(false);

  useEffect(() => {
    (() => {
      router.events.on("routeChangeStart", closeDrawer);
    })();

    return () => {
      router.events.off("routeChangeStart", closeDrawer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header toggleDrawer={openDrawer}>{headerChildren}</Header>
      <SideBar toggleDrawer={closeDrawer} isOpen={isOpen} />
    </>
  );
};

export default NavBar;
