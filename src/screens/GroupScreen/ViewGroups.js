import React from "react";
import { Container, Toast } from "native-base";
import { View, AsyncStorage } from "react-native";
import { connect } from "react-redux";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import AppFab from "../../components/AppFab";
import InteractiveList from "../../components/InteractiveList";
import _ from "lodash";
import { projectGroups, studentProjectGroups } from "../../api/assessment";
import ReduxContext from "../../context/ReduxContext";
import RequestActivityIndicator from "../../components/RequestActivityIndicator";

class ViewGroups extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      groups:
        Object.keys(props.group).length > 0
          ? [{ name: props.group.title, ...props.group }]
          : [],
      userType: ""
    };
    this.props.setGroups({});
  }

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

    this.setState({ isLoading: true });

    try {
      let response =
        userType == "lecturer"
          ? await projectGroups(id)
          : await studentProjectGroups(id);

      if (response.data) {
        groups = response.data.data.map(group => ({
          name: group.title,
          ...group
        }));
      }
      this.setState({
        userType,
        groups,
        isLoading: false
      });
    } catch (e) {
      this.setState({ isLoading: false });
      alert(e);
      Toast.show({
        text: `Please check your network connection`,
        buttonText: "Okay"
      });
    }
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
          {this.state.groups.length == 0 && this.state.isLoading ? (
            <RequestActivityIndicator />
          ) : (
            <LayoutContainer style={styles.bodyContainer}>
              <InteractiveList
                dataArray={this.state.groups}
                items={this.state.groups}
                onPress={group => navigate("viewLocation", { group })}
                renderNullItem="No Groups Added Yet"
                actionButtons={list => this.generateActionButtons(list)}
              />
            </LayoutContainer>
          )}
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
    group: state.groups,
    userType: state.userType
  };
}

const _ViewGroups = props => (
  <ReduxContext.Consumer>
    {({ screenProps: { setGroups } }) => (
      <ViewGroups {...props} setGroups={setGroups} />
    )}
  </ReduxContext.Consumer>
);

export default connect(mapStateToProps)(_ViewGroups);

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bodyContainer: {
    paddingVertical: 0
  }
};
