import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../utils/web3";
import { formatEther } from "@ethersproject/units";
import { BigNumberish } from "@ethersproject/bignumber";

const Wallet = () => {
  const [balance, setBalance] = useState<BigNumberish>("");
  const { activate, account, library, active, chainId } = useWeb3React();

  useEffect(() => {
    if (!active) {
      activate(injected);
    }
  }, [active, activate]);

  useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      library.getBalance(account).then((balance: BigNumberish) => {
        if (!stale) {
          setBalance(balance);
        }
      });

      return () => {
        setBalance("");
      };
    }
  }, [account, library, chainId]);

  return (
    <div>
      {!active && (
        <button onClick={() => activate(injected)}>Connect to metamask</button>
      )}
      <div>Account: {account}</div>
      <div>{balance && `Ether balance: ${formatEther(balance)}`}</div>
    </div>
  );
};

export default Wallet;
