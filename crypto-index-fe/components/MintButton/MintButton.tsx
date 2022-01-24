import { useContract } from "../../hooks/useContract";
import CryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX } from "../../config/constants/contracts";
import useOwner from "../../hooks/useOwner";
import { Box, Button, Typography } from "@mui/material";
import { useFetchWithFeedback } from "../../hooks/useFetchWithFeedback";

const Mint = () => {
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);
  const { isOwner } = useOwner();
  const [mintCallback] = useFetchWithFeedback({
    loading: "Minting token..",
    success: "The token has been minted!",
  });

  const mintNft = async () => {
    if (contract?.mint) {
      const mintRequest = contract.mint();
      mintCallback(mintRequest);
    }
  };

  return (
    isOwner && (
      <Box sx={{ margin: "20px 0" }}>
        <Typography variant="h6" component="h2">
          Mint new NFT!
        </Typography>
        <Button
          sx={{ margin: "10px 0 10px 0" }}
          variant="contained"
          disabled={!isOwner}
          onClick={mintNft}
        >
          Mint NFT
        </Button>
      </Box>
    )
  );
};

export default Mint;
