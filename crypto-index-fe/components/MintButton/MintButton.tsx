import { ChangeEvent, useState } from "react";
import { useContract } from "../../hooks/useContract";
import CryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX, DEFAULT_URI } from "../../config/constants/contracts";
import useOwner from "../../hooks/useOwner";

const Mint = () => {
  const [uri, setUri] = useState("");
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);
  const { isOwner } = useOwner();

  const mintNft = async () => {
    if (contract?.mint) {
      try {
        const response = await contract.mint();
        const waiter = response.wait();

        if (waiter.confirmations === 3) console.log("NFT MINTED!!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addURI = async () => {
    if (contract?.setTokenURI) {
      try {
        const response = await contract.setTokenURI(uri || DEFAULT_URI);
        const wait = await response.wait();

        if (wait.confirmations === 3) console.log("URI CHANGE CONFIRMED!!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUriOnChange = (e: ChangeEvent<{ value: string }>) =>
    setUri(e.target.value);

  return (
    <div>
      <button disabled={!isOwner} onClick={mintNft}>
        Mint NFT
      </button>
      <div>
        <input
          value={uri}
          onChange={handleUriOnChange}
          type="text"
          placeholder="URI"
        />
        <button disabled={!isOwner} onClick={addURI}>
          Add URI
        </button>
      </div>
      {!isOwner && (
        <div>Only owner of the contract can mint NFTs and set the URI</div>
      )}
    </div>
  );
};

export default Mint;
