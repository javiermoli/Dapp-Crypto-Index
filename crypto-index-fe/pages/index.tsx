import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Wallet from "../components/Wallet/Wallet";
import Mint from "../components/MintButton/MintButton";
import MyNFTList from "../components/MyNFTList";
import NftsList from "../components/NftsList";
import AddURIs from "../components/NFTMetadata/AddURIs";
import { Button, Drawer } from "@mui/material";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      {/* <Wallet />
      <Mint />
      <AddURIs />
      <MyNFTList />
      <NftsList /> */}
    </div>
  );
};

export default Home;
