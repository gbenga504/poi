import React from "react";
import { Container } from "native-base";
import { View } from "react-native";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import AppFab from "../../components/AppFab";
import InteractiveList from "../../components/InteractiveList";

export default class ViewGroups extends React.PureComponent {
  generateActionButtons = () => [
    { name: "Delete", onPress: () => alert("deleted") }
  ];

  render() {
    const GROUPS = [
      {
        name: "GROUP 1",
        description: "This group is the first group allocated to Futa"
      },
      {
        name: "GROUP 2",
        description:
          "This is the group that maintains the Oba-Ile axis of Akure"
      }
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
              dataArray={GROUPS}
              onPress={() => navigate("viewLocation")}
              renderNullItem="No Groups Added Yet"
              actionButtons={this.generateActionButtons()}
            />
          </LayoutContainer>
          <AppFab
            onPress={() => this.props.navigation.navigate("createGroup")}
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
