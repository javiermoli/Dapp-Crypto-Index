import { useEffect, useState } from "react";
import { useContract } from "../hooks/useContract";
import MultiCall from "@indexed-finance/multicall";
import { useWeb3React } from "@web3-react/core";
import { Interface, JsonFragment } from "@ethersproject/abi";

const useMultiCall = (
  totalItems: any[],
  contractFunction: string,
  abi: JsonFragment[] | Interface,
  contractAddress: string
) => {
  const { library, account } = useWeb3React();
  const { contract } = useContract(contractAddress, abi);
  const [result, setResult] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      const signer = library?.getSigner();

      if (
        signer &&
        contract &&
        contractFunction &&
        totalItems.length &&
        abi &&
        contractAddress
      ) {
        const multi = new MultiCall(signer);
        const inputs: any[] = totalItems.map((param) => ({
          target: contractAddress,
          function: contractFunction,
          args: [param],
        }));

        const data = await multi.multiCall(abi, inputs);

        if (data.length) {
          setResult(data);
        }
      }
    })();
  }, [
    library,
    contract,
    account,
    totalItems,
    contractFunction,
    abi,
    contractAddress,
  ]);

  return { result };
};

export default useMultiCall;
