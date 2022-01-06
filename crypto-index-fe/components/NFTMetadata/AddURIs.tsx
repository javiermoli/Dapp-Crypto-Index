import { ChangeEvent, useState } from "react";
import { useContract } from "../../hooks/useContract";
import CryptoIndexAbi from "../../config/abi/IndexNFTNumerable.json";
import { CRYPTO_INDEX } from "../../config/constants/contracts";
import useOwner from "../../hooks/useOwner";

const colors = {
  black: "black",
  white: "white",
  green: "green",
  yellow: "yellow",
};

const initialUris = {
  black: "",
  white: "",
  green: "",
  yellow: "",
};

const AddURIs = () => {
  const { black, white, yellow, green } = colors;
  const [uris, setUris] = useState(initialUris);
  const { contract } = useContract(CRYPTO_INDEX, CryptoIndexAbi);
  const { isOwner } = useOwner();

  const addURI = async () => {
    if (contract?.setTokenURIs) {
      try {
        const parseUris = [
          uris["black"],
          uris["white"],
          uris["green"],
          uris["yellow"],
        ];
        const response = await contract.setTokenURIs(parseUris);
        const waiter = await response.wait();

        if (waiter.confirmations >= 2) console.log("URI CHANGE CONFIRMED!!");
      } catch (error) {
        console.log(error);
      }
    }
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
    <div>
      <div>
        <input
          name={black}
          value={uris.black}
          onChange={handleRadioButtonChange}
          type="text"
          placeholder="Black URI"
        />
        <label>Black NFT Metadata</label>
        <input
          name={white}
          value={uris.white}
          onChange={handleRadioButtonChange}
          type="text"
          placeholder="White URI"
        />
        <label>White NFT Metadata</label>
        <input
          name={green}
          value={uris.green}
          onChange={handleRadioButtonChange}
          type="text"
          placeholder="Green URI"
        />
        <label>Green NFT Metadata</label>
        <input
          name={yellow}
          value={uris.yellow}
          onChange={handleRadioButtonChange}
          type="text"
          placeholder="Yellow URI"
        />
        <label>Yellow NFT Metadata</label>
        <button disabled={!isOwner} onClick={addURI}>
          Add URI
        </button>
      </div>
    </div>
  );
};

export default AddURIs;
