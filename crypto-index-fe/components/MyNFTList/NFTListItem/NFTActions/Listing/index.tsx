import { FC, useState, ChangeEvent, useEffect } from "react";
import {
  CRYPTO_INDEX,
  CRYPTO_INDEX_MARKETPLACE,
} from "../../../../../config/constants/contracts";
import { useContract } from "../../../../../hooks/useContract";
import { useTokenApprove } from "../../../../../hooks/useTokenApprove";
import ListingToken from "./ListingToken";
import marketplaceAbi from "../../../../../config/abi/Marketplace.json";
import indexAbi from "../../../../../config/abi/IndexNFTNumerable.json";
import { approveToken } from "../../../../../utils/calls/nftIndex";
import { BigNumber, FixedNumber } from "ethers";
import { listToken } from "../../../../../utils/calls/nftMarketplace";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { useFetchWithFeedback } from "../../../../../hooks/useFetchWithFeedback";

interface ListingProps {
  tokenId: number;
}

const Listing: FC<ListingProps> = ({ tokenId }) => {
  const router = useRouter();
  const [listCallback, listingToken] = useFetchWithFeedback({
    loading: "Listing token...",
    success: "The token has been listed in the marketplace!",
  });
  const [approveCallback, approvingToken] = useFetchWithFeedback({
    loading: "Approving contract...",
    success: "The contract has been approved!",
  });
  const { contract: marketplaceContract } = useContract(
    CRYPTO_INDEX_MARKETPLACE,
    marketplaceAbi
  );
  const { contract: indexContract } = useContract(CRYPTO_INDEX, indexAbi);
  const { isApprove } = useTokenApprove(tokenId, approvingToken);
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    (() => {
      if (listingToken) {
        router.push("/marketplace");
      }
    })();
  }, [listingToken, router]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPrice(value);
  };

  const handleClick = () => {
    if (isApprove) {
      list();
    } else {
      approve();
    }
  };

  const list = async () => {
    if (marketplaceContract && price) {
      const priceFixedNumber = FixedNumber.from(price.toString(), 18);
      const priceBigNumber = BigNumber.from(priceFixedNumber);
      const listTokenRequest = listToken(
        marketplaceContract,
        tokenId,
        priceBigNumber
      );

      listCallback(listTokenRequest);
    }
  };

  const approve = async () => {
    if (indexContract) {
      const approveRequest = approveToken(
        tokenId,
        indexContract,
        CRYPTO_INDEX_MARKETPLACE
      );

      approveCallback(approveRequest);
    }
  };

  return (
    <>
      <Typography sx={{ marginBottom: "10px" }} variant="h6" component="h2">
        Add the NFT to the Marketplace
      </Typography>
      <ListingToken
        handleChange={handleChange}
        price={price}
        handleClick={handleClick}
        isApprove={isApprove}
      />
    </>
  );
};

export default Listing;
