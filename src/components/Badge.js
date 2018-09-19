import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { RegularText } from "./AppText";
import Colors from "../assets/Colors";
import Fonts from "../assets/Fonts";

const Badge = props => (
  <View style={styles.badge}>
    <RegularText style={styles.name}>{this.props.name}</RegularText>
  </View>
);

Badge.propTypes = {
  name: PropTypes.string.isRequired
};

const styles = {
  badge: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    height: 30,
    borderRadius: 20,
    backgroundColor: Colors.favColor,
    marginRight: 10,
    marginTop: 10,
    marginLeft: 3
  },
  name: {
    fontSize: Fonts.listContentSize,
    color: "#fff"
  }
};
