import React from "react";
import { View, LayoutAnimation, UIManager, Platform } from "react-native";
import PropTypes from "prop-types";
import { Container, Content } from "native-base";

import Colors from "../assets/Colors";
import LayoutContainer from "../containers/LayoutContainer";
import AppHeader from "../components/AppHeader";
import AppTextInput from "../components/AppTextInput";
import Icon from "../components/Icon";
import ColleagueAddition from "../components/ProjectCreate/ColleagueAddition";

export default class ProjectCreateScreen extends React.PureComponent {
  state = {
    projectName: "",
    projectDescription: ""
  };

  render() {
    let { projectName, projectDescription } = this.state;

    return (
      <View style={styles.container}>
        <Container>
          <AppHeader />
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
        </Container>
      </View>
    );
  }
}

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
