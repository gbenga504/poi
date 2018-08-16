import React from "react";
import { View, AsyncStorage, ToastAndroid } from "react-native";
import PropTypes from "prop-types";
import { Container, Content, Toast } from "native-base";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import Colors from "../../assets/Colors";
import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import AppTextInput from "../../components/AppTextInput";
import Icon from "../../components/Icon";
import ColleagueAddition from "../../components/ProjectCreate/ColleagueAddition";
import ReduxContext from "../../context/ReduxContext";
import AppFab from "../../components/AppFab";

class CreateGroup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      groupName: "",
      groupDescription: "",
      groupId: Date.now().toString(),
      groupNumberAdded: "0 persons Added",
      isColleageAddtionVisible: false,
      students: []
    };
  }

  toggleColleagueAddtion = () => {
    this.setState({
      isColleageAddtionVisible: !this.state.isColleageAddtionVisible
    });
  };

  setStudents = students => {
    let _students = Object.values(students);
    this.setState({
      isColleageAddtionVisible: false,
      students: _students,
      groupNumberAdded: `${_students[0].name} and ${_students.length -
        1} persons added`
    });
  };

  saveStudents = () => {
    //@Todo send to database
    let {
        projects,
        groups,
        screenProps: { setProjects, setGroups },
        navigation: {
          state: {
            params: { projectName }
          }
        },
        navigation
      } = this.props,
      { groupId, groupName, groupDescription, students } = this.state;

    let _projects = projects.map(project => {
      if (project.name == projectName) {
        return { ...project, groups: [...project.groups, this.state.groupId] };
      }
      return project;
    });

    let _groups = [
      ...groups,
      { id: groupId, name: groupName, description: groupDescription, students }
    ];

    AsyncStorage.multiSet([
      ["@projects", JSON.stringify(_projects)],
      ["@groups", JSON.stringify(_groups)]
    ]).then(result => {
      setGroups(_groups);
      setProjects(_projects);
      Toast.show({
        text: `Group Created Successfully`,
        buttonText: "Okay"
      });

      navigation.dispatch(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: "viewGroups",
              params: { project: { name: projectName } }
            }),
            NavigationActions.navigate({
              routeName: "dashboard"
            })
          ]
        })
      );
    });
  };

  render() {
    let {
      isColleageAddtionVisible,
      groupName,
      groupNumberAdded,
      groupDescription
    } = this.state;

    return (
      <View style={styles.container}>
        <Container>
          {!isColleageAddtionVisible && (
            <AppHeader
              pageTitle="Create Group"
              navigation={this.props.navigation}
            />
          )}
          <LayoutContainer style={styles.bodyContainer}>
            <Content>
              <AppTextInput
                style={styles.textInput}
                value={groupName}
                placeholder="Enter a Group Name"
                placeholderTextColor={Colors.listContentColor}
                onChangeText={groupName => this.setState({ groupName })}
              />
              <AppTextInput
                style={styles.textInput}
                value={groupDescription}
                placeholder="Enter the Group Description"
                placeholderTextColor={Colors.listContentColor}
                onChangeText={groupDescription =>
                  this.setState({ groupDescription })
                }
              />
              <View style={styles.addColleaguesContainer}>
                <AppTextInput
                  style={styles.textInput}
                  value={groupNumberAdded}
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
          <AppFab
            name="done-all"
            type="MaterialIcons"
            onPress={this.saveStudents}
          />
        </Container>
        <ColleagueAddition
          isVisible={isColleageAddtionVisible}
          onRequestClose={this.toggleColleagueAddtion}
          onAddColleague={students => this.setStudents(students)}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups,
    projects: state.projects
  };
}

const _CreateGroup = props => (
  <ReduxContext.Consumer>
    {({ screenProps }) => <CreateGroup {...props} screenProps={screenProps} />}
  </ReduxContext.Consumer>
);

export default connect(mapStateToProps)(_CreateGroup);

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
