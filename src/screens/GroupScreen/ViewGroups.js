import React from "react";
import { Container } from "native-base";
import { View, AsyncStorage } from "react-native";
import { connect } from "react-redux";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import AppFab from "../../components/AppFab";
import InteractiveList from "../../components/InteractiveList";
import _ from "lodash";
import { projectGroups } from "../../api/assessment";

class ViewGroups extends React.PureComponent {
  state = {
    groups: [],
    userType: ""
  };

  async componentDidMount() {
    const userType = await AsyncStorage.getItem("@userType");
    let groups = [];
    let {
      navigation: {
        state: {
          params: {
            project: { name, id }
          }
        }
      }
    } = this.props;
    if (userType == "lecturer") {
      const response = await projectGroups(id);
      if (response.data) {
        groups = response.data.data.map(group => ({
          name: group.title,
          ...group
        }));
      }
    }
    this.setState({
      userType,
      groups
    });
  }

  generateActionButtons = group => {
    let { userType } = this.state;
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

  render() {
    let {
      navigation: {
        navigate,
        state: {
          params: {
            project: { name, id },
            project
          }
        }
      }
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
                  projectName: name,
                  projectId: id,
                  project
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
