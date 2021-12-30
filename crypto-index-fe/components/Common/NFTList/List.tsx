import { FC } from "react";
import { NFTMetadata } from "../../../types/NFT";
import Item from "./Item";

interface ListProps {
  nfts: NFTMetadata[];
  burnNFT?: (id: number) => {};
  title?: string;
}

const List: FC<ListProps> = ({ nfts = [], burnNFT, title }) => {
  return (
    <>
      <h3>{title}</h3>
      {nfts.map((nft, index) => (
        <Item key={index} burnNFT={burnNFT} nft={nft} />
      ))}
    </>
  );
};

export default List;
