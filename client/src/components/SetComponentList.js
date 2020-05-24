import React from "react";
import SetComponent from "./SetComponent";

export default function SetComponentList({ components }) {
  console.log(components);
  return (
    <ul>
      {components.map((component) => {
        console.log(component);
        return <SetComponent
          key={component}
          address={component.address}
          symbol={component.symbol}
          units={component.units}
          price={component.price}
        />;
      })}
    </ul>
  );
}
