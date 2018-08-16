import React from "react";
import { Text, Platform } from "react-native";

export default props => (
  <Text {...props} style={props.style ? { ...props.style, ...styles } : styles}>
    {props.children}
  </Text>
);

const styles = {
  // fontFamily: "Roboto-Medium"
};
