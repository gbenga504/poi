import React from "react";
import { Content, Container } from "native-base";
import { connect } from "react-redux";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import AppFab from "../../components/AppFab";
import InteractiveList from "../../components/InteractiveList";

class ViewLocation extends React.PureComponent {
  generateActionButtons = location => {
    if (this.props.userType == "lecturer") {
      return [];
    } else {
      return [{ name: "Delete", onPress: () => alert("deleted") }];
    }
  };

  render() {
    const LOCATIONS = [
      { name: "Location 1", description: "8 students" },
      { name: "Location 2", description: "5 students" }
    ];

    let {
      navigation: {
        navigate,
        state: {
          params: {
            group: { name }
          }
        }
      }
    } = this.props;

    return (
      <Container style={styles.container}>
        <AppHeader pageTitle={name} navigation={this.props.navigation} />
        <Content>
          <LayoutContainer style={styles.bodyContainer}>
            <InteractiveList
              dataArray={LOCATIONS}
              items={LOCATIONS}
              onPress={location => navigate("addLocation", { location })}
              renderNullItem="No Location Added Yet"
              actionButtons={list => this.generateActionButtons(list)}
            />
          </LayoutContainer>
        </Content>
        {this.props.userType != "lecturer" && (
          <AppFab
            name="add-location"
            type="MaterialIcons"
            onPress={() => this.props.navigation.navigate("addLocation")}
          />
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userType: state.userType
  };
}

export default connect(mapStateToProps)(ViewLocation);

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bodyContainer: {
    paddingVertical: 0
  }
};
