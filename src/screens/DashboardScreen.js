import React from "react";
import { View, AsyncStorage } from "react-native";
import { Container } from "native-base";
import { connect } from "react-redux";

import LayoutContainer from "../containers/LayoutContainer";
import AppHeader from "../components/AppHeader";
import AppFab from "../components/AppFab";
import InteractiveList from "../components/InteractiveList";

class DashboardScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    let { userType } = props;

    this.project =
      userType == "lecturer"
        ? [
            { name: "RSG 301", description: "8 Groups" },
            { name: "RSG 201", description: "5 Groups" }
          ]
        : [{ name: "RSG 201", description: "5 Groups" }];
  }

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
    let {
      navigation: { navigate },
      userType
    } = this.props;

    return (
      <View style={styles.container}>
        <Container>
          <AppHeader navigation={this.props.navigation} pageTitle="Dashboard" />
          <LayoutContainer style={styles.bodyContainer}>
            <InteractiveList
              dataArray={this.project}
              onPress={() => navigate("viewGroups")}
              renderNullItem="No Projects Added Yet"
              actionButtons={
                userType == "lecturer"
                  ? this.generateActionButtons()
                  : () => null
              }
            />
          </LayoutContainer>
          {userType == "lecturer" && (
            <AppFab
              name="group-add"
              type="MaterialIcons"
              onPress={() => this.props.navigation.navigate("projectCreate")}
            />
          )}
        </Container>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userType: state.userType
  };
}

export default connect(mapStateToProps)(DashboardScreen);

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bodyContainer: {
    paddingVertical: 0
  }
};
