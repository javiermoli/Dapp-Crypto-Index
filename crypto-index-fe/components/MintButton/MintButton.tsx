import { useContract } from "../../hooks/useContract";
import CryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX } from "../../config/constants/contracts";
import useOwner from "../../hooks/useOwner";

const Mint = () => {
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);
  const { isOwner } = useOwner();

  const mintNft = async () => {
    if (contract?.mint) {
      try {
        const response = await contract.mint();
        const waiter = response.wait();

        if (waiter.confirmations >= 2) console.log("NFT MINTED!!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <button disabled={!isOwner} onClick={mintNft}>
        Mint NFT
      </button>
      {!isOwner && (
        <div>Only owner of the contract can mint NFTs and set the URI</div>
      )}
    </div>
  );
};

export default Mint;
