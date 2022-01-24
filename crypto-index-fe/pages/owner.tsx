import type { NextPage } from "next";
import Mint from "../components/MintButton/MintButton";
import AddURIs from "../components/NFTMetadata/AddURIs";

const marketplace: NextPage = () => {
  return (
    <>
      <Mint />
      <AddURIs />
    </>
  );
};

export default marketplace;
