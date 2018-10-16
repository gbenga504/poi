import React from "react";
import { Content, Container } from "native-base";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import AppFab from "../../components/AppFab";
import InteractiveList from "../../components/InteractiveList";
import _ from "lodash";
import { groupLocations } from "../../api/assessment";

class ViewLocation extends React.PureComponent {
  state = {
    locations: []
  };
  generateActionButtons = location => {
    if (this.props.userType == "lecturer") {
      return [];
    } else {
      return [{ name: "Delete", onPress: () => alert("deleted") }];
    }
  };
  async componentDidMount() {
    let {
      navigation: {
        state: {
          params: { group }
        }
      }
    } = this.props;
    const response = await groupLocations(group.id);
    if (response.data) {
      const { data } = response.data;
      this.setState({
        locations: data.map(location => ({
          ...location,
          name: `${location.elevation} - ${location.long} ${location.lat}`
        }))
      });
    }
  }

  render() {
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
              dataArray={this.state.locations}
              items={this.state.locations}
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
            onPress={() =>
              this.props.navigation.navigate("addLocation", {
                location: { groupName: name }
              })
            }
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
