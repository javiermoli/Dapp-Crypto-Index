import { ChangeEvent, useState } from "react";
import { useContract } from "../../hooks/useContract";
import CryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX } from "../../config/constants/contracts";
import useOwner from "../../hooks/useOwner";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutations } from "../../hooks/useMutations";
import { setNftURIs } from "../../utils/calls/nftIndex";
import useSnackbar from "../../hooks/useSnackbar";

const initialUris = {
  black: "",
  white: "",
  green: "",
  yellow: "",
};

const textStyle = {
  marginRight: "15px",
};

const AddURIs = () => {
  const [uris, setUris] = useState(initialUris);
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);
  const { isOwner } = useOwner();
  const setUrisRequest = useMutations(setNftURIs);
  const { snackBarLoading } = useSnackbar();

  const addURI = async () => {
    const urisToSet = Object.values(uris);

    snackBarLoading("Setting URIs...");
    setUrisRequest({ uris: urisToSet, contract });
  };

  const handleRadioButtonChange = (
    e: ChangeEvent<{ value: string; name: string }>
  ) => {
    const { name, value } = e.target;

    setUris({
      ...uris,
      [name]: value,
    });
  };

  return (
    <>
      {isOwner && (
        <Box
          sx={{
            marginTop: "20px",
          }}
        >
          <Typography variant="h6" component="h2">
            Add NFTs metadata
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "10px 0 10px 0",
            }}
          >
            <TextField
              sx={textStyle}
              name="black"
              value={uris.black}
              onChange={handleRadioButtonChange}
              type="text"
              placeholder="Black URI"
              helperText="Black NFT Metadata"
            />
            <TextField
              sx={textStyle}
              name="white"
              value={uris.white}
              onChange={handleRadioButtonChange}
              type="text"
              placeholder="White URI"
              helperText="White NFT Metadata"
            />
            <TextField
              sx={textStyle}
              name="green"
              value={uris.green}
              onChange={handleRadioButtonChange}
              type="text"
              placeholder="Green URI"
              helperText="Green NFT Metadata"
            />
            <TextField
              sx={textStyle}
              name="yellow"
              value={uris.yellow}
              onChange={handleRadioButtonChange}
              type="text"
              placeholder="Yellow URI"
              helperText="Yellow NFT Metadata"
            />
          </Box>
          <Button variant="contained" disabled={!isOwner} onClick={addURI}>
            Add URIs
          </Button>
        </Box>
      )}
    </>
  );
};

export default AddURIs;
