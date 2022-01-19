import { useState, ChangeEvent, FC } from "react";
import SelectReward from "./SelectReward";

interface BurnProps {
  burn: (tokenId: number, rewardsInDAI: boolean) => void;
  tokenId: number;
}

const Burn: FC<BurnProps> = ({ tokenId, burn }) => {
  const [rewardsInDAI, setRewardsInDAI] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setRewardsInDAI(checked);
  };

  const burnNFT = () => {
    if (tokenId >= 0) {
      burn(tokenId, rewardsInDAI);
    }
  };

  return (
    <SelectReward
      checked={rewardsInDAI}
      handleChange={handleChange}
      burnNFT={burnNFT}
    />
  );
};

export default Burn;
