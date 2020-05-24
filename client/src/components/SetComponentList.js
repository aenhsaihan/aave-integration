import React from "react";
import SetComponent from "./SetComponent";

export default function SetComponentList({ components }) {
  //   return <div>{components.length}</div>;

  return components.map((component) => {
    return <SetComponent key={component} component={component} />;
  });
}
