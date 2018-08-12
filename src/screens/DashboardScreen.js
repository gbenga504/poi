import React from "react";
import { View, AsyncStorage } from "react-native";
import { Container } from "native-base";

import LayoutContainer from "../containers/LayoutContainer";
import AppHeader from "../components/AppHeader";
import AppFab from "../components/AppFab";
import InteractiveList from "../components/InteractiveList";

export default class DashboardScreen extends React.PureComponent {
  logout = () => {
    AsyncStorage.multiRemove(["jwt", "@userType"], error => {
      if (!error) {
        this.props.navigation.navigate("selectAccount");
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
      { name: "RSG 301", description: "8 Groups" },
      { name: "RSG 201", description: "5 Groups" }
    ];

    let {
      navigation: { navigate }
    } = this.props;

    return (
      <View style={styles.container}>
        <Container>
          <AppHeader navigation={this.props.navigation} pageTitle="Dashboard" />
          <LayoutContainer style={styles.bodyContainer}>
            <InteractiveList
              dataArray={PROJECTS}
              onPress={() => navigate("viewGroups")}
              renderNullItem="No Projects Added Yet"
              actionButtons={this.generateActionButtons()}
            />
          </LayoutContainer>
          <AppFab
            name="group-add"
            type="MaterialIcons"
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
