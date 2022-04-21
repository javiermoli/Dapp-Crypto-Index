import { FC, useState, ChangeEvent } from "react";
import {
  CRYPTO_INDEX,
  CRYPTO_INDEX_MARKETPLACE,
} from "../../../../../config/constants/contracts";
import { useContract } from "../../../../../hooks/useContract";
import {
  IS_TOKEN_APPROVE_QUERY_KEY,
  useIsTokenApprove,
} from "../../../../../hooks/useTokenApprove";
import ListingToken from "./ListingToken";
import marketplaceAbi from "../../../../../config/abi/Marketplace.json";
import indexAbi from "../../../../../config/abi/IndexNFTNumerable.json";
import { approveToken } from "../../../../../utils/calls/nftIndex";
import { BigNumber, FixedNumber } from "ethers";
import { listToken } from "../../../../../utils/calls/nftMarketplace";
import { Typography } from "@mui/material";
import { useMutations } from "../../../../../hooks/useMutations";
import useSnackbar from "../../../../../hooks/useSnackbar";
import { MY_NFTS_QUERY_KEY } from "../../../../../hooks/useFetchNftMyNfts";

interface ListingProps {
  tokenId: number;
}

const Listing: FC<ListingProps> = ({ tokenId }) => {
  const { contract: marketplaceContract } = useContract(
    CRYPTO_INDEX_MARKETPLACE,
    marketplaceAbi
  );
  const { contract: indexContract } = useContract(CRYPTO_INDEX, indexAbi);
  const [price, setPrice] = useState<string>("");
  const listTokenInTheMarketplace = useMutations(listToken, [
    MY_NFTS_QUERY_KEY,
  ]);
  const approveContract = useMutations(approveToken, [
    IS_TOKEN_APPROVE_QUERY_KEY,
  ]);
  const isApprove = useIsTokenApprove(tokenId);
  const { snackBarLoading } = useSnackbar();

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
      snackBarLoading("Listing...");
      listTokenInTheMarketplace({
        contract: marketplaceContract,
        tokenId,
        price: priceBigNumber,
      });
    }
  };

  const approve = async () => {
    if (indexContract) {
      snackBarLoading("Approving...");
      approveContract({
        tokenId,
        contract: indexContract,
        operator: CRYPTO_INDEX_MARKETPLACE,
      });
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
