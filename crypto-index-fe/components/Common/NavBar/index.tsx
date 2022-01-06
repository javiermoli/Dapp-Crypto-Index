import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { useRouter } from "next/router";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = () => setIsOpen((value) => !value);

  useEffect(() => {
    router.events.on("routeChangeStart", toggleDrawer);

    return () => {
      router.events.off("routeChangeStart", toggleDrawer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header toggleDrawer={toggleDrawer} />
      <SideBar toggleDrawer={toggleDrawer} isOpen={isOpen} />
    </div>
  );
};

export default NavBar;
