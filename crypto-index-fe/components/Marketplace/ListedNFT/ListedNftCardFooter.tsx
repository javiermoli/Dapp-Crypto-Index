import { FC } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { useWeb3React } from "@web3-react/core";
import { NFTMetadata } from "../../../types/NFT";
import ActionButton from "./ActionButton";

export interface ListedNFTData extends NFTMetadata {
  owner: string;
  is_active: boolean;
  token_id: BigNumber;
  price: BigNumber;
  listing_id: BigNumber;
}

interface ListedNftCardFooterProps {
  listedNftData: ListedNFTData;
  removeToken: (listedNftData: ListedNFTData) => void;
  buyToken: (listedNftData: ListedNFTData) => void;
}

const ListedNftCardFooter: FC<ListedNftCardFooterProps> = ({
  listedNftData,
  removeToken,
  buyToken,
}) => {
  const { owner } = listedNftData;
  const { account } = useWeb3React();
  const isOwner = account === owner;

  const removeTokenFromMarketplace = () => {
    removeToken(listedNftData);
  };

  const buy = () => {
    buyToken(listedNftData);
  };

  return (
    <>
      {isOwner ? (
        <ActionButton
          buttonLabel="Remove listing"
          onClick={removeTokenFromMarketplace}
          listedNftData={listedNftData}
        />
      ) : (
        <ActionButton
          buttonLabel="Buy"
          onClick={buy}
          listedNftData={listedNftData}
        />
      )}
    </>
  );
};

export default ListedNftCardFooter;
