// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

struct Listing {
    address owner;
    bool is_active;
    uint256 token_id;
    uint256 price;
    uint256 listing_id;
}

contract Marketplace is ReentrancyGuard {
    using SafeMath for uint256;

    address internal constant NFT_INDEX_CONTRACT =
        0xBD9cd50fc0183B2512385A73429e3B5e9fC39C87;
    uint256 public listing_count = 0;
    mapping(uint256 => Listing) public listings;
    ERC721 token_contract = ERC721(NFT_INDEX_CONTRACT);

    function addListing(uint256 token_id, uint256 price) public nonReentrant {
        listings[listing_count] = Listing(
            msg.sender,
            true,
            token_id,
            price,
            listing_count
        );
        listing_count = listing_count.add(1);
        token_contract.transferFrom(msg.sender, address(this), token_id);
    }

    function removeListing(uint256 listing_id) public nonReentrant {
        require(listings[listing_id].owner == msg.sender, "Must be owner");
        require(listings[listing_id].is_active, "Must be active");
        listings[listing_id].is_active = false;
        token_contract.transferFrom(
            address(this),
            msg.sender,
            listings[listing_id].token_id
        );
    }

    function buy(uint256 listing_id) public payable nonReentrant {
        require(listings[listing_id].is_active, "Must be active");
        require(listings[listing_id].price == msg.value, "Must pay the price");
        listings[listing_id].is_active = false;
        token_contract.transferFrom(
            address(this),
            msg.sender,
            listings[listing_id].token_id
        );
        (bool sent, bytes memory data) = address(listings[listing_id].owner)
            .call{value: msg.value}("");
        data;
        require(sent, "Failed to send Ether");
    }

    function getActiveListings(uint256 index) public view returns (uint256) {
        uint256 j;
        for (uint256 i = 0; i < listing_count; i++) {
            if (listings[i].is_active) {
                if (index == j) {
                    return i;
                }
                j += 1;
            }
        }
        return 0;
    }

    function getListingsByOwner(address owner, uint256 index)
        public
        view
        returns (uint256)
    {
        uint256 j;
        for (uint256 i = 0; i < listing_count; i++) {
            if (listings[i].is_active && listings[i].owner == owner) {
                if (index == j) {
                    return i;
                }
                j += 1;
            }
        }
        return 0;
    }

    function getListingsByOwnerCount(address owner)
        public
        view
        returns (uint256)
    {
        uint256 result;
        for (uint256 i = 0; i < listing_count; i++) {
            if (listings[i].is_active && listings[i].owner == owner) {
                result += 1;
            }
        }
        return result;
    }

    function getActiveListingsCount() public view returns (uint256) {
        uint256 result;
        for (uint256 i = 0; i < listing_count; i++) {
            if (listings[i].is_active) {
                result += 1;
            }
        }
        return result;
    }
}
