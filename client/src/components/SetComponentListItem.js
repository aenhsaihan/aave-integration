import React from "react";

const SetComponentListItem = ({component}) =>
  <li>
    <strong>{component.units} <a href={component.url} target="_blank">{component.symbol}</a></strong>
    &nbsp;with a price of <strong>{component.price} {component.symbol}/ETH</strong>
  </li>

export default SetComponentListItem;
