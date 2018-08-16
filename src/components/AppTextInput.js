import React from "react";
import PropTypes from "prop-types";
import { TextInput, View } from "react-native";

import ICON from "./Icon";
import Colors from "../assets/Colors";
import Fonts from "../assets/Fonts";

/**
 * @Component AppTextInput renders the custon text input of the application
 */
export default class AppTextInput extends React.PureComponent {
  static propTypes = {
    ...TextInput.propTypes,
    id: PropTypes.string,
    style: PropTypes.object
  };

  /**
   * @param {string} value
   * @function updates the field with a new value
   */
  updateField = value => {
    if (this.props.id) {
      this.props.onChangeText(this.props.id, value);
      return;
    }
    this.props.onChangeText(value);
  };

  render() {
    let { style } = this.props,
      refinedStyle = style
        ? { ...styles.textInput, ...style }
        : styles.textInput;
    return (
      <TextInput
        {...this.props}
        underlineColorAndroid="transparent"
        style={refinedStyle}
      />
    );
  }
}

const styles = {
  textInput: {
    flex: 1,
    paddingVertical: 0,
    paddingLeft: 0,
    // fontFamily: "Roboto-Regular",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.defaultThemeColor,
    color: Colors.listContentColor,
    fontSize: Fonts.listContentSize,
    paddingBottom: 5
  }
};
