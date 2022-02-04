import type { NextPage } from "next";
import Mint from "../components/MintButton/MintButton";
import AddURIs from "../components/NFTMetadata/AddURIs";
import OwnerRoute from "../components/PrivateRoutes/OwnerRoute";

const marketplace: NextPage = () => {
  return (
    <OwnerRoute>
      <Mint />
      <AddURIs />
    </OwnerRoute>
  );
};

export default marketplace;
