import React from "react";
import SetComponent from "./SetComponent";

export default function SetComponentList({ components }) {
  return components.map((component) => {
    return <SetComponent key={component} component={component} />;
  });
}
