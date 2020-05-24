import React from "react";

export default function SetComponent({ address, symbol, units, price }) {
  const etherscanAddress = `http://etherscan.io/token/${address}`;
  console.log(etherscanAddress);
  return (
    <li>
      {units} <a href={etherscanAddress}>{symbol}</a> = {price} ETH
    </li>
  );
}
