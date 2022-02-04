import { Interface, JsonFragment } from "@ethersproject/abi";
import MultiCall from "@indexed-finance/multicall";

interface multiCallParams {
  signer: any;
  totalItems: any[];
  contractAddress: string | number;
  contractFunctionName: string;
  abi: JsonFragment[] | Interface;
}

export const multiCall = async (config: multiCallParams) => {
  const { signer, totalItems, contractAddress, contractFunctionName, abi } =
    config;
  const multi = new MultiCall(signer);
  const inputs: any[] = totalItems.map((param) => ({
    target: contractAddress,
    function: contractFunctionName,
    args: Array.isArray(param) ? param : [param],
  }));

  const data = await multi.multiCall(abi, inputs);

  return data;
};
