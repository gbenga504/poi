import React from "react";
import { Content, Container } from "native-base";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import AppFab from "../../components/AppFab";
import InteractiveList from "../../components/InteractiveList";
import _ from "lodash";

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
  componentDidMount() {
    this.groupLocations();
  }
  groupLocations = async () => {
    let {
      navigation: {
        state: {
          params: { group }
        }
      }
    } = this.props;
    let locations = await AsyncStorage.getItem("@locations");

    if (locations) {
      let grouplocations = _.filter(JSON.parse(locations), {
        groupName: group.name
      });
      console.log("grouplocations", grouplocations);
      if (grouplocations) {
        grouplocations = grouplocations.map(location => {
          return {
            ...location,
            name: location.locationNumber,
            description: `${group.students.length} students`,
            group
          };
        });
      }
      this.setState({ locations: grouplocations || [] });
    }
  };
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
