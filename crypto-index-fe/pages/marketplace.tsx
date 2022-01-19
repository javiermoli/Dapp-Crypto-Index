import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import MyNFTListM from "../components/Marketplace/ListedNFT";

const marketplace: NextPage = () => {
  return (
    <div className={styles.container}>
      <MyNFTListM />
    </div>
  );
};

export default marketplace;
