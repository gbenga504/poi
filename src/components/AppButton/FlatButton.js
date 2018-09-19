import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import { MediumText } from "../AppText";
import Button from "../Button";
import Colors from "../../assets/Colors";

const FlatButton = props => (
  <Button onPress={props.onPress}>
    <View onPress={props.onPress} style={{ ...styles.button, ...props.style }}>
      <MediumText style={{ ...styles.title, ...props.titleStyle }}>
        {props.title}
      </MediumText>
    </View>
  </Button>
);

const styles = {
  button: {
    padding: 15,
    borderRadius: 10,
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },
  title: {
    color: Colors.defaultThemeColor
  }
};

FlatButton.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  onPress: PropTypes.func
};

export default FlatButton;
