import React from "react";
import { View, AsyncStorage, StyleSheet } from "react-native";

import LoginScreen from "./LoginScreen";
import DashboardScreen from "./DashboardScreen";

export default class InceptionScreen extends React.PureComponent {
  state = {
    isLoading: true,
    component: null
  };

  componentWillMount() {
    AsyncStorage.getItem("jwt", (error, value) => {
      if (value && value !== null && !error) {
        this.setComponentToRender("dashboard");
      } else {
        this.setComponentToRender("login");
      }
    });
  }

  setComponentToRender = component => {
    this.setState({ isLoading: false, component: component });
  };

  renderComponent = () => {
    const { isLoading, component } = this.state;
    if (component === "login")
      return (
        <LoginScreen onLogin={this.setComponentToRender} {...this.props} />
      );
    return (
      <DashboardScreen onLogout={this.setComponentToRender} {...this.props} />
    );
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return <View style={styles.container}>{this.renderComponent()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
