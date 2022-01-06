import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";
import { NFTMetadata } from "../../../types/NFT";

interface ItemProps {
  nft: NFTMetadata;
  burnNFT?: (id: number, receiveTokens: boolean) => {};
  setTokenColor?: (id: number, tokenColor: string) => {};
}

const radioButtonsValue = {
  dai: "Dai",
  tokens: "Tokens",
};

const Item: FC<ItemProps> = ({ nft, burnNFT, setTokenColor }) => {
  const { id, image, name, description } = nft;
  const { dai, tokens } = radioButtonsValue;
  const [burnRewardsType, setBurnRewardsType] = useState(
    radioButtonsValue.tokens
  );
  const [selectedColor, setSelectedColor] = useState("");

  const handleRadioButtonChange = (e: ChangeEvent<{ value: string }>) => {
    setBurnRewardsType(e.target.value);
  };

  const handleSelectChange = (e: ChangeEvent<{ value: string }>) => {
    const { value } = e.target;
    if (value) {
      setSelectedColor(value);
    }
  };

  return (
    <div>
      <div>{name}</div>
      <Image
        unoptimized
        loader={() => image}
        src={image}
        alt="NFT"
        width="250"
        height="250"
      />
      <div>{description}</div>
      {burnNFT && (
        <>
          <input
            value={tokens}
            checked={burnRewardsType === tokens}
            onChange={handleRadioButtonChange}
            type="radio"
          />
          <label>Get NFT tokens</label>
          <input
            value={dai}
            checked={burnRewardsType === dai}
            onChange={handleRadioButtonChange}
            type="radio"
          />
          <label>Get DAI</label>
          <button onClick={() => burnNFT(id, burnRewardsType === dai)}>
            Burn NFT
          </button>
        </>
      )}
      {setTokenColor && (
        <div>
          <select value={selectedColor} onChange={handleSelectChange}>
            <option value="">--Please choose a color--</option>
            <option value={0}>Black</option>
            <option value={1}>White</option>
            <option value={2}>Green</option>
            <option value={3}>Yellow</option>
          </select>
          <button
            onClick={() => setTokenColor(id, selectedColor)}
            type="submit"
            value="Submit"
          >
            Select color
          </button>
        </div>
      )}
    </div>
  );
};

export default Item;
