// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Router.sol";

contract IndexNFT is ERC721, ERC721Enumerable, Ownable {
    uint256 internal constant INDEX_VALUE = 50000000000000000 wei;
    uint256 internal constant COMP_Index_value = 0.05 ether;
    uint256 internal constant SNX_Index_value = 0.05 ether;
    address internal constant UNISWAP_ROUTER_ADDRESS =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    uint256 token_id_count;
    uint256 minted_tokens;
    string token_uri;

    Router router = Router(UNISWAP_ROUTER_ADDRESS);
    ERC20 COMP_token = ERC20(0x61460874a7196d6a22D1eE4922473664b3E95270);
    ERC20 SNX_token = ERC20(0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F);
    ERC20 DAI_token = ERC20(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa);

    constructor() ERC721("Crypto Index", "CI") {}

    function burnNFT(uint256 tokenId, bool convertToStableCoin) public {
        require(ownerOf(tokenId) == msg.sender, "Sender must be owner");
        require(
            COMP_token.balanceOf(address(this)) >= INDEX_VALUE * minted_tokens,
            "Insufficient COMP"
        );
        require(
            SNX_token.balanceOf(address(this)) >= INDEX_VALUE * minted_tokens,
            "Insufficient SNX"
        );
        if (convertToStableCoin) {
            swapSNXToDAI();
            swapCOMPToDAI();
        } else {
            COMP_token.transfer(ownerOf(tokenId), COMP_Index_value);
            SNX_token.transfer(ownerOf(tokenId), SNX_Index_value);
        }
        _burn(tokenId);
        minted_tokens -= 1;
    }

    function mint() public onlyOwner {
        require(
            COMP_token.balanceOf(address(this)) >=
                INDEX_VALUE * (minted_tokens + 1),
            "Insufficient COMP"
        );
        require(
            SNX_token.balanceOf(address(this)) >=
                INDEX_VALUE * (minted_tokens + 1),
            "Insufficient SNX"
        );
        _mint(msg.sender, token_id_count);
        token_id_count += 1;
        minted_tokens += 1;
    }

    function swapSNXToDAI() private {
        address[] memory path = new address[](3);
        path[0] = address(SNX_token);
        path[1] = router.WETH();
        path[2] = address(DAI_token);

        SNX_token.approve(address(router), INDEX_VALUE);

        router.swapExactTokensForTokens(
            INDEX_VALUE,
            0,
            path,
            msg.sender,
            block.timestamp + 20
        );
    }

    function swapCOMPToDAI() private {
        address[] memory path = new address[](3);
        path[0] = address(COMP_token);
        path[1] = router.WETH();
        path[2] = address(DAI_token);

        COMP_token.approve(address(router), INDEX_VALUE);

        router.swapExactTokensForTokens(
            INDEX_VALUE,
            0,
            path,
            msg.sender,
            block.timestamp
        );
    }

    function tokenURI(uint256 token_id)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(token_id),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return token_uri;
    }

    function setTokenURI(string memory new_uri) public onlyOwner {
        token_uri = new_uri;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
