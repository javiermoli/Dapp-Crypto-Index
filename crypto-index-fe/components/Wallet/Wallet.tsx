import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../utils/web3";
import { formatEther } from "@ethersproject/units";
import { BigNumberish } from "@ethersproject/bignumber";

const Wallet = () => {
  const [balance, setBalance] = useState<BigNumberish>("");
  const { activate, account, library, active } = useWeb3React();

  useEffect(() => {
    if (!active) {
      activate(injected);
    }
  }, [active, activate]);

  useEffect(() => {
    (async () => {
      if (account && library) {
        const balance: BigNumberish = await library.getBalance(account);
        setBalance(balance);
        return () => setBalance("");
      }
    })();
  }, [account, library]);

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
