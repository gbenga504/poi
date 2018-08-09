import React from "react";
import { View, AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { Container } from "native-base";

import LayoutContainer from "../containers/LayoutContainer";
import AppHeader from "../components/AppHeader";
import AppFab from "../components/AppFab";
import InteractiveList from "../components/InteractiveList";

export default class DashboardScreen extends React.PureComponent {
  static propTypes = {
    onLogout: PropTypes.func.isRequired
  };

  logout = () => {
    AsyncStorage.removeItem("jwt", error => {
      if (!error) {
        this.props.onLogout("login");
      } else {
        alert("Could not log user out, try again");
      }
    });
  };

  generateActionButtons = () => [
    { name: "Delete", onPress: () => alert("deleted") }
  ];

  render() {
    const PROJECTS = [
      { name: "Ajaone", description: "8 locations" },
      { name: "Hiskul", description: "5 locations" }
    ];
    let {
      navigation: { navigate }
    } = this.props;

    return (
      <View style={styles.container}>
        <Container>
          <AppHeader />
          <LayoutContainer style={styles.bodyContainer}>
            <InteractiveList
              dataArray={PROJECTS}
              onPress={() => navigate("viewLocation")}
              renderNullItem="No Projects Added Yet"
              actionButtons={this.generateActionButtons()}
            />
          </LayoutContainer>
          <AppFab
            onPress={() => this.props.navigation.navigate("projectCreate")}
          />
        </Container>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bodyContainer: {
    paddingVertical: 0
  }
};
