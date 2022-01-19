import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Mint from "../components/MintButton/MintButton";
import MyNFTList from "../components/MyNFTList";
import NftsList from "../components/NftsList";
import AddURIs from "../components/NFTMetadata/AddURIs";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Mint />
      <AddURIs />
      <MyNFTList />
      <NftsList />
    </div>
  );
};

export default Home;
