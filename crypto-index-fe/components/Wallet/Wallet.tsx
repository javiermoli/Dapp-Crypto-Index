import { useEffect, useState } from "react";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { injected } from "../../utils/web3";
import { formatEther } from "@ethersproject/units";
import { BigNumberish } from "@ethersproject/bignumber";
import Blockies from "react-blockies";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { exactRound } from "../../utils/currency";
import useSnackbar from "../../hooks/useSnackbar";

const Wallet = () => {
  const [balance, setBalance] = useState<BigNumberish>("");
  const { activate, account, library, active } = useWeb3React();
  const { snackBarError } = useSnackbar();

  useEffect(() => {
    if (!active) {
      activate(injected, async (error) => {
        if (error instanceof UnsupportedChainIdError) {
          snackBarError(
            `Current chain is not supported. Please, use Kovan testnet.`
          );
        }
      });
    }
  }, [active, activate, snackBarError]);

  useEffect(() => {
    (async () => {
      if (account && library) {
        const balance: BigNumberish = await library.getBalance(account);
        setBalance(balance);
        return () => setBalance("");
      }
    })();
  }, [account, library]);

  const getAddressWithEllipsis = () => {
    const address = account as any;
    if (address) {
      const addressFirstBlock = address.substr(0, 6);
      const addressLastBlock = address.substr(-4);

      return `${addressFirstBlock}...${addressLastBlock}`;
    }
    return account;
  };

  const displayAddress = getAddressWithEllipsis();
  const formattedEther = balance ? exactRound(formatEther(balance), 2) : "";

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {!active ? (
          <Button
            sx={{
              backgroundColor: "#1769aa",
              color: "white",
            }}
            onClick={() => activate(injected)}
          >
            Connect to metamask
          </Button>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 10px",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ marginRight: "5px" }}
              >
                {displayAddress}
              </Typography>
              <Blockies seed={account as any} size={8} scale={2} />
            </Box>
            <Typography variant="h6" component="div" sx={{ margin: "0 10px" }}>
              {balance && `${formattedEther} ETH`}
            </Typography>
          </>
        )}
      </Box>
    </>
  );
};

export default Wallet;
