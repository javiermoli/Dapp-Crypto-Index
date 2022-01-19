import { FC } from "react";
import ModalComponent from "../../../Common/Modal";
import Burn from "../NFTActions/Burn";
import ColorSelector from "../NFTActions/ColorSelector";
import { NFTMetadata } from "../../../../types/NFT";
import Listing from "../NFTActions/Listing";

interface ModalActionsProps {
  nftData: NFTMetadata;
  action: string;
  handleClose: () => void;
  isOpen: boolean;
  setTokenColor: (nftId: number, tokenColor: string) => void;
  burnNft: (nftId: number, convertToStableCoin: boolean) => void;
}

export const nftActions = {
  Burn: "Burn",
  ChangeColor: "ChangeColor",
  Listing: "Listing",
};

const ModalActions: FC<ModalActionsProps> = ({
  nftData,
  action,
  handleClose,
  isOpen,
  burnNft,
  setTokenColor,
}) => {
  const { id } = nftData;

  const componentActions: any = {
    [nftActions.Burn]: <Burn tokenId={id} burn={burnNft} />,
    [nftActions.ChangeColor]: (
      <ColorSelector setTokenColor={setTokenColor} tokenId={id} />
    ),
    [nftActions.Listing]: <Listing tokenId={id} />,
  };

  return (
    <ModalComponent handleClose={handleClose} isOpen={isOpen}>
      {componentActions[action] || null}
    </ModalComponent>
  );
};

export default ModalActions;
