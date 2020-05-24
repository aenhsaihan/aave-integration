import React from "react";
import SetComponentListItem from "./SetComponentListItem";

const SetComponentList = ({components}) =>
  <ul>
    {components.map(component =>
      <SetComponentListItem key={component.address} component={component} />
    )}
  </ul>

export default SetComponentList;
