import { FC, MouseEvent, useState } from "react";
import { Button } from "@mui/material";
import React from "react";
import { NFTMetadata } from "../../../../types/NFT";
import ModalActions, { nftActions } from "./ModalActions";

interface CardFooter {
  nftData: NFTMetadata;
  setTokenColor: (nftId: number, tokenColor: string) => void;
  burnNft: (nftId: number, convertToStableCoin: boolean) => void;
}

const CardFooter: FC<CardFooter> = ({ nftData, setTokenColor, burnNft }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (e: MouseEvent) => {
    const { name } = e.target as HTMLButtonElement;
    setModalAction(name);
    setIsOpen(true);
  };

  return (
    <>
      <Button name={nftActions.Burn} onClick={openModal}>
        Burn NFT
      </Button>
      <Button name={nftActions.ChangeColor} onClick={openModal}>
        Change Color
      </Button>
      <Button name={nftActions.Listing} onClick={openModal}>
        List NFT
      </Button>
      <ModalActions
        setTokenColor={setTokenColor}
        burnNft={burnNft}
        nftData={nftData}
        action={modalAction}
        handleClose={closeModal}
        isOpen={isOpen}
      />
    </>
  );
};

export default CardFooter;
