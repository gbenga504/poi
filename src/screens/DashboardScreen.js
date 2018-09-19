import React from "react";
import { View, AsyncStorage } from "react-native";
import { Container, Toast } from "native-base";
import { connect } from "react-redux";

import LayoutContainer from "../containers/LayoutContainer";
import AppHeader from "../components/AppHeader";
import AppFab from "../components/AppFab";
import InteractiveList from "../components/InteractiveList";
import ReduxContext from "../context/ReduxContext";
import _ from "lodash";

const PROJECTS = [{ name: "RSG 201", description: "5 Groups" }];

class DashboardScreen extends React.PureComponent {
  state = {
    projects: []
  };

  componentDidMount() {
    this.getStudentProjects();
  }
  formatProject = () => {
    let { userType, projects } = this.props;
    if (userType == "lecturer") {
      return projects;
    } else {
      return this.state.projects;
    }
  };

  getStudentProjects = async () => {
    let groups = await AsyncStorage.getItem("@groups");
    const studentMatric = await AsyncStorage.getItem("@jwt");
    if (groups) {
      const parsedGroups = _.filter(JSON.parse(groups), grp => {
        return _.find(grp.students, { matric_no: studentMatric });
      });
      if (parsedGroups) {
        let projects = parsedGroups.map(group => ({
          name: group.projectName
        }));
        console.log("projects", projects);
        this.setState({
          projects: projects
        });
      }
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
          buttonText: "Okay"
        });
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
              items={this.formatProject()}
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
