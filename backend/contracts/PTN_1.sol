// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;


import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PTN is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("PhotoToNFT", "PHTT") {}

    function mint(string memory tokenURI)
        public
    {
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender , newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
    }
}