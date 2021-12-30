import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";
import { NFTMetadata } from "../../../types/NFT";

interface ItemProps {
  nft: NFTMetadata;
  burnNFT?: (id: number, receiveTokens: boolean) => {};
}

const Item: FC<ItemProps> = ({ nft, burnNFT }) => {
  const [burnRewardsType, setBurnRewardsType] = useState("tokens");

  const handleRadioButtonChange = (event: ChangeEvent<{ value: string }>) => {
    setBurnRewardsType(event.target.value);
  };

  return (
    <div>
      <div>{nft.name}</div>
      <Image
        unoptimized
        loader={() => nft.image}
        src={nft.image}
        alt="NFT"
        width="250"
        height="250"
      />
      <div>{nft.description}</div>
      {burnNFT && (
        <>
          <input
            value="tokens"
            checked={burnRewardsType === "tokens"}
            onChange={handleRadioButtonChange}
            type="radio"
          />
          <label>Get NFT tokens</label>
          <input
            value="toDai"
            checked={burnRewardsType === "toDai"}
            onChange={handleRadioButtonChange}
            type="radio"
          />
          <label>Get DAI</label>
          <button onClick={() => burnNFT(nft.id, burnRewardsType === "toDai")}>
            Burn NFT
          </button>
        </>
      )}
    </div>
  );
};

export default Item;
