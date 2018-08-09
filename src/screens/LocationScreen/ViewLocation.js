import React from "react";
import { Content, Container } from "native-base";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import AppFab from "../../components/AppFab";
import InteractiveList from "../../components/InteractiveList";

export default class ViewLocation extends React.PureComponent {
  generateActionButtons = () => [
    { name: "Delete", onPress: () => alert("deleted") }
  ];

  render() {
    const LOCATIONS = [
      { name: "Location 1", description: "8 students" },
      { name: "Location 2", description: "5 students" }
    ];

    let {
      navigation: { navigate }
    } = this.props;

    return (
      <Container style={styles.container}>
        <AppHeader />
        <Content>
          <LayoutContainer style={styles.bodyContainer}>
            <InteractiveList
              dataArray={LOCATIONS}
              onPress={() => navigate("addLocation")}
              renderNullItem="No Location Added Yet"
              actionButtons={this.generateActionButtons()}
            />
          </LayoutContainer>
        </Content>
      </Container>
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
