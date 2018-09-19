import React from "react";
import PropTypes from "prop-types";
import { View, TouchableNativeFeedback } from "react-native";

import { MediumText, BoldText } from "../AppText";
import AppTextInput from "../AppTextInput";
import Colors from "../../assets/Colors";
import Fonts from "../../assets/Fonts";
import Button from "../Button";

/**
 * This holds the login form of the application
 */
export default class Form extends React.PureComponent {
  state = {
    isPasswordVisible: true,
    passwordToggleText: "Show"
  };

  static propTypes = {
    onUpdateUsername: PropTypes.func.isRequired,
    onUpdatePassword: PropTypes.func.isRequired,
    userNamePlaceholder: PropTypes.string
  };

  /**
   * @function togglePasswordVisibility toggles the visibility of the password input
   */
  togglePasswordVisibility = () => {
    if (this.state.isPasswordVisible)
      this.setState({ isPasswordVisible: false, passwordToggleText: "Hide" });
    else this.setState({ isPasswordVisible: true, passwordToggleText: "Show" });
  };

  render() {
    return (
      <View>
        <BoldText style={styles.title}>Log In</BoldText>
        <MediumText style={styles.inputTitle}>
          {this.props.userNamePlaceholder || "USER NAME"}
        </MediumText>
        <AppTextInput
          onChangeText={this.props.onUpdateUsername}
          style={styles.textInput}
        />
        <View style={styles.passwordContainer}>
          <MediumText style={styles.inputTitle}> PASSWORD </MediumText>
          <Button
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress={this.togglePasswordVisibility}
          >
            <View>
              <MediumText style={styles.inputTitle}>
                {this.state.passwordToggleText}
              </MediumText>
            </View>
          </Button>
        </View>
        <AppTextInput
          secureTextEntry={this.state.isPasswordVisible}
          onChangeText={this.props.onUpdatePassword}
          style={styles.textInput}
        />
      </View>
    );
  }
}

const styles = {
  title: {
    fontSize: 30,
    marginTop: 15,
    marginBottom: 30,
    color: "#fff"
  },
  inputTitle: {
    fontSize: Fonts.listHeaderSize,
    color: "#fff",
    marginTop: 20
  },
  textInput: {
    marginTop: 8,
    color: "#fff",
    borderBottomColor: "#fff",
    paddingBottom: 5
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: -5
  }
};
