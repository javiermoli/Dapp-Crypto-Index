import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Wallet from "../components/Wallet/Wallet";
import Mint from "../components/MintButton/MintButton";
import MyNFTList from "../components/MyNFTList";
import NftsList from "../components/NftsList";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Wallet />
      <Mint />
      <MyNFTList />
      <NftsList />
    </div>
  );
};

export default Home;
