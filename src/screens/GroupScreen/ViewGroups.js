import React from "react";
import { Container } from "native-base";
import { View, AsyncStorage } from "react-native";
import { connect } from "react-redux";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import AppFab from "../../components/AppFab";
import InteractiveList from "../../components/InteractiveList";
import _ from "lodash";

const GROUPS = [
  {
    name: "GROUP 1",
    description: "Futa sampling group"
  }
];

class ViewGroups extends React.PureComponent {
  state = {
    groups: []
  };

  componentDidMount() {
    let {
      navigation: {
        state: {
          params: {
            project: { name }
          }
        }
      }
    } = this.props;
    this.projectGroups(name);
  }
  formatGroup = () => {
    let { userType } = this.props;
    const { groups } = this.state;
    if (userType == "lecturer") {
      return groups;
    } else {
      //@Todo replace with the group from the server after formatting
      //Or alternatively load groups from server in componentDidMount and save in async and also send to redux
      return GROUPS;
    }
  };

  generateActionButtons = group => {
    let { userType } = this.props;
    if (userType == "lecturer") {
      return [
        { name: "Properties", onPress: () => alert("properties") },
        { name: "Download Report", onPress: () => alert("download report") }
      ];
    } else {
      return [
        { name: "Export", onPress: () => alert("exported") },
        { name: "Properties", onPress: () => alert("properties") },
        {
          name: "Upload Final Report",
          onPress: () => alert("upload final report")
        },
        { name: "Download Report", onPress: () => alert("download report") }
      ];
    }
  };

  projectGroups = async projectName => {
    let groups = await AsyncStorage.getItem("@groups");
    if (groups) {
      groups = JSON.parse(groups);
      let projectGroups = _.filter(groups, { projectName: projectName });
      this.setState({ groups: projectGroups || [] });
    }
  };

  render() {
    let {
      navigation: {
        navigate,
        state: {
          params: {
            project: { name }
          }
        }
      },
      groups
    } = this.props;

    return (
      <View style={styles.container}>
        <Container>
          <AppHeader pageTitle={name} navigation={this.props.navigation} />
          <LayoutContainer style={styles.bodyContainer}>
            <InteractiveList
              dataArray={this.formatGroup()}
              items={this.formatGroup()}
              onPress={group => navigate("viewLocation", { group })}
              renderNullItem="No Groups Added Yet"
              actionButtons={list => this.generateActionButtons(list)}
            />
          </LayoutContainer>
          {this.props.userType == "lecturer" && (
            <AppFab
              onPress={() =>
                this.props.navigation.navigate("createGroup", {
                  projectName: name
                })
              }
            />
          )}
        </Container>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups,
    userType: state.userType
  };
}

export default connect(mapStateToProps)(ViewGroups);

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bodyContainer: {
    paddingVertical: 0
  }
};
