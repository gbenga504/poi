import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import ICON from "../Icon";
import Button from "../Button";
import Colors from "../../assets/Colors";

/**
 * This is the footer of the application
 */
export default class Footer extends React.PureComponent {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    loginActive: PropTypes.bool.isRequired
  };

  render() {
    return (
      <Button onPress={this.props.onLogin}>
        <View
          style={{
            ...styles.button,
            backgroundColor: this.props.loginActive ? "white" : "#004d40"
          }}
        >
          <ICON
            name="chevron-right"
            type="material-icon"
            style={styles.buttonIcon}
          />
        </View>
      </Button>
    );
  }
}

const styles = {
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 60,
    width: 60,
    borderRadius: 30,
    alignSelf: "flex-end"
  },
  buttonIcon: {
    color: Colors.defaultThemeColor,
    fontSize: 25
  }
};
