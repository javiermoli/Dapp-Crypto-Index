// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

contract Router {
  function swapExactTokensForTokens(
    uint amountIn,
    uint amountOutMin,
    address[] calldata path,
    address to,
    uint deadline
 ) external returns (uint[] memory amounts) {}

 function WETH() external pure returns (address) {}
}