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
import { lecturerProjects, studentProjects } from "../api/assessment";

class DashboardScreen extends React.PureComponent {
  state = {
    projects: []
  };

  async componentDidMount() {
    const userType = await AsyncStorage.getItem("@userType");
    if (userType == "lecturer") {
      const response = await lecturerProjects();
      if (response.data) {
        const { data } = response.data;
        this.setState({
          projects: data.map(project => ({ name: project.title, ...project }))
        });
      }
    } else {
      await this.getStudentProjects();
    }
  }

  getStudentProjects = async () => {
    const response = await studentProjects()
    if (response.data) {
      const { data } = response.data;
      this.setState({
        projects: data.map(project => ({ name: project.title, ...project }))
      });
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
              dataArray={this.state.projects}
              items={this.state.projects}
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
