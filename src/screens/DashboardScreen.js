import React from "react";
import { View, AsyncStorage } from "react-native";
import { Container, Toast } from "native-base";
import { connect } from "react-redux";

import LayoutContainer from "../containers/LayoutContainer";
import AppHeader from "../components/AppHeader";
import AppFab from "../components/AppFab";
import InteractiveList from "../components/InteractiveList";
import ReduxContext from "../context/ReduxContext";

const PROJECTS = [{ name: "RSG 201", description: "5 Groups" }];

class DashboardScreen extends React.PureComponent {
  formatProject = () => {
    let { userType, projects } = this.props;
    if (userType == "lecturer") {
      return projects.map(project => {
        return {
          name: project.name,
          description: `${project.groups.length} Groups`
        };
      });
    } else {
      //@Todo replace with the project from the server after formatting
      //Or alternatively load projects from server in componentDidMount and save in async and also send to redux
      return PROJECTS;
    }
  };

  deleteProject = project => {
    let {
        projects,
        screenProps: { setProjects }
      } = this.props,
      _newProjects = projects.filter((_project, i) => {
        return _project.name != project.name;
      });
    AsyncStorage.setItem("@projects", JSON.stringify(_newProjects)).then(
      data => {
        setProjects(_newProjects);

        Toast.show({
          text: `Project ${project.name} deleted`,
          buttonText: 'Okay'
        })
      }
    );
  };

  generateActionButtons = project => [
    { name: "Delete", onPress: () => this.deleteProject(project) }
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
              dataArray={this.formatProject()}
              items={userType != "lecturer" ? PROJECTS : this.props.projects}
              onPress={project => navigate("viewGroups", { project })}
              renderNullItem="No Projects Added Yet"
              actionButtons={
                userType == "lecturer"
                  ? list => this.generateActionButtons(list)
                  : () => []
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
    userType: state.userType,
    projects: state.projects
  };
}

const _DashboardScreen = props => (
  <ReduxContext.Consumer>
    {({ screenProps }) => (
      <DashboardScreen {...props} screenProps={screenProps} />
    )}
  </ReduxContext.Consumer>
);

export default connect(mapStateToProps)(_DashboardScreen);

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bodyContainer: {
    paddingVertical: 0
  }
};
