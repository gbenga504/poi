import React from "react";
import { AsyncStorage } from "react-native";

export default class InceptionScreen extends React.PureComponent {
  componentDidMount() {
    let {
      navigation: { navigate }
    } = this.props;

    AsyncStorage.getItem("@userType", (error, type) => {
      if (error || !type) {
        navigate("selectAccount");
      } else {
        navigate("dashboard", { type });
      }
    });
  }

  render() {
    return null;
  }
}
