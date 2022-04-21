import { useContract } from "../../hooks/useContract";
import CryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX } from "../../config/constants/contracts";
import useOwner from "../../hooks/useOwner";
import { Box, Button, Typography } from "@mui/material";
import { useMutations } from "../../hooks/useMutations";
import useSnackbar from "../../hooks/useSnackbar";
import { mint } from "../../utils/calls/nftIndex";

const Mint = () => {
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);
  const { isOwner } = useOwner();
  const mintRequest = useMutations(mint);
  const { snackBarLoading } = useSnackbar();

  const mintNft = async () => {
    snackBarLoading("Minting NFT...");
    mintRequest({ contract });
  };

  return (
    <>
      {isOwner && (
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
      )}
    </>
  );
};

export default Mint;
