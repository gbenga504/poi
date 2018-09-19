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
    let { userType } = this.props;
    let groups = await AsyncStorage.getItem("@groups");
    if (userType == "lecturer" && groups) {
      let projectGroups = _.filter(JSON.parse(groups), {
        projectName: projectName
      });
      this.setState({ groups: projectGroups || [] });
    } else if (userType == "student" && groups) {
      const studentMatric = await AsyncStorage.getItem("@jwt");
      let projectGroups = _.filter(JSON.parse(groups), {
        projectName: projectName
      });
      const studentGroups = _.filter(projectGroups, grp => {
        return _.find(grp.students, { matric_no: studentMatric });
      });
      this.setState({ groups: studentGroups });
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
              dataArray={this.state.groups}
              items={this.state.groups}
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
