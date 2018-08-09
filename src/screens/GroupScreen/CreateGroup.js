import React from "react";
import { View, LayoutAnimation, UIManager, Platform } from "react-native";
import PropTypes from "prop-types";
import { Container, Content } from "native-base";

import Colors from "../../assets/Colors";
import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import AppTextInput from "../../components/AppTextInput";
import Icon from "../../components/Icon";
import ColleagueAddition from "../../components/ProjectCreate/ColleagueAddition";

export default class CreateGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    if (Platform.OS == "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      projectName: "",
      projectNumberAdded: "0 persons Added",
      isColleageAddtionVisible: false
    };
  }

  toggleColleagueAddtion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isColleageAddtionVisible: !this.state.isColleageAddtionVisible
    });
  };

  render() {
    let {
      isColleageAddtionVisible,
      projectName,
      projectNumberAdded
    } = this.state;
    return (
      <View style={styles.container}>
        <Container>
          {!isColleageAddtionVisible && <AppHeader />}
          <LayoutContainer style={styles.bodyContainer}>
            <Content>
              <AppTextInput
                style={styles.textInput}
                value={projectName}
                placeholder="Enter a Group Name"
                placeholderTextColor={Colors.listContentColor}
                onChangeText={projectName => this.setState({ projectName })}
              />
              <View style={styles.addColleaguesContainer}>
                <AppTextInput
                  style={styles.textInput}
                  value={projectNumberAdded}
                  editable={false}
                />
                <View style={styles.addPadder}>
                  <Icon
                    onPress={this.toggleColleagueAddtion}
                    name="person-add"
                    type="material-icon"
                    forceColor
                    style={styles.add}
                  />
                </View>
              </View>
            </Content>
          </LayoutContainer>
        </Container>
        <ColleagueAddition
          isVisible={isColleageAddtionVisible}
          onRequestClose={this.toggleColleagueAddtion}
        />
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
  },
  addColleaguesContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  addPadder: {
    borderBottomColor: Colors.categoryHeaderColor,
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    marginTop: 12
  },
  add: {
    fontSize: 25,
    color: Colors.categoryHeaderColor
  }
};
