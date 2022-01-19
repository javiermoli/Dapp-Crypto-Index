import { FC, useState, ChangeEvent, useEffect } from "react";
import {
  CRYPTO_INDEX,
  CRYPTO_INDEX_MARKETPLACE,
} from "../../../../../config/constants/contracts";
import { useContract } from "../../../../../hooks/useContract";
import { useContractInteraction } from "../../../../../hooks/useContractInteraction";
import { useTokenApprove } from "../../../../../hooks/useTokenApprove";
import ListingToken from "./ListingToken";
import marketplaceAbi from "../../../../../config/abi/Marketplace.json";
import indexAbi from "../../../../../config/abi/IndexNFTNumerable.json";
import { approveToken } from "../../../../../utils/calls/nftIndex";
import { BigNumber, FixedNumber } from "ethers";
import { listToken } from "../../../../../utils/calls/nftMarketplace";
import { useRouter } from "next/router";

interface ListingProps {
  tokenId: number;
}

const Listing: FC<ListingProps> = ({ tokenId }) => {
  const router = useRouter();
  const [listCallback, listingToken] = useContractInteraction({
    loading: "Listing token int he marketplace...",
    success: "The token has been listed!",
  });
  const [approveCallback, approvingToken] = useContractInteraction({
    loading: "Approving...",
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
    if (marketplaceContract) {
      const priceFixedNumber = FixedNumber.from(price.toString(), 18);
      const priceBigNumber = BigNumber.from(priceFixedNumber);
      listCallback(listToken, marketplaceContract, tokenId, priceBigNumber);
    }
  };

  const approve = async () => {
    if (indexContract) {
      approveCallback(
        approveToken,
        tokenId,
        indexContract,
        CRYPTO_INDEX_MARKETPLACE
      );
    }
  };

  return (
    <ListingToken
      handleChange={handleChange}
      price={price}
      handleClick={handleClick}
      isApprove={isApprove}
    />
  );
};

export default Listing;
