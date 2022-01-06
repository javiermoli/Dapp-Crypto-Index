import { FC } from "react";
import { NFTMetadata } from "../../../types/NFT";
import Item from "./Item";

interface ListProps {
  nfts: NFTMetadata[];
  burnNFT?: (id: number, convertToStableCoin: boolean) => {};
  title?: string;
  setTokenColor?: (id: number, tokenColor: string) => {};
}

const List: FC<ListProps> = ({ nfts = [], burnNFT, title, setTokenColor }) => (
  <>
    <h3>{title}</h3>
    {nfts.map((nft, index) => (
      <Item
        key={index}
        burnNFT={burnNFT}
        nft={nft}
        setTokenColor={setTokenColor}
      />
    ))}
  </>
);

export default List;
