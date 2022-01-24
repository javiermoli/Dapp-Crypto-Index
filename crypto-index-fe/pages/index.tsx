import type { NextPage } from "next";
import MyNFTList from "../components/MyNFTList";
import NftsList from "../components/NftsList";

const Home: NextPage = () => {
  return (
    <>
      <MyNFTList />
      <NftsList />
    </>
  );
};

export default Home;
