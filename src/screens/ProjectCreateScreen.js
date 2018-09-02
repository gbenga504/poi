import React from "react";
import { View, AsyncStorage } from "react-native";
import { Container, Content, Toast } from "native-base";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import Colors from "../assets/Colors";
import LayoutContainer from "../containers/LayoutContainer";
import AppHeader from "../components/AppHeader";
import AppTextInput from "../components/AppTextInput";
import AppFab from "../components/AppFab";
import ReduxContext from "../context/ReduxContext";
import { createProject } from "../api/assessment";

class ProjectCreateScreen extends React.PureComponent {
  state = {
    projectName: "",
    projectDescription: ""
  };

  saveProject = async () => {
    let { navigation } = this.props;
    const { projectName, projectDescription } = this.state;

    const response = await createProject({
      title: projectName,
      description: projectDescription
    });
    if (response.data) {
      Toast.show({
        text: `Project ${projectName} added`,
        buttonText: "okay"
      });

      navigation.dispatch(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: "dashboard"
            })
          ]
        })
      );
    }
  };

  render() {
    let { projectName, projectDescription } = this.state;

    return (
      <View style={styles.container}>
        <Container>
          <AppHeader
            pageTitle="Create Project"
            navigation={this.props.navigation}
          />
          <LayoutContainer style={styles.bodyContainer}>
            <Content>
              <AppTextInput
                style={styles.textInput}
                value={projectName}
                placeholder="Enter a Project Name"
                placeholderTextColor={Colors.listContentColor}
                onChangeText={projectName => this.setState({ projectName })}
              />
              <AppTextInput
                style={styles.textInput}
                value={projectDescription}
                placeholder="Enter the Project Description"
                placeholderTextColor={Colors.listContentColor}
                onChangeText={projectDescription =>
                  this.setState({ projectDescription })
                }
              />
            </Content>
          </LayoutContainer>
          <AppFab
            name="done"
            type="MaterialIcons"
            onPress={() => this.saveProject()}
          />
        </Container>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projects
  };
}

const _ProjectCreateScreen = props => (
  <ReduxContext.Consumer>
    {({ screenProps }) => (
      <ProjectCreateScreen {...props} screenProps={screenProps} />
    )}
  </ReduxContext.Consumer>
);

export default connect(mapStateToProps)(_ProjectCreateScreen);

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bodyContainer: {
    paddingVertical: 0
  },
  textInput: {
    borderBottomColor: Colors.categoryHeaderColor,
    marginTop: 10,
    paddingBottom: 5,
    color: Colors.listHeaderColor
  }
};
