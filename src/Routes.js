import React from "react";
import { Dimensions } from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ActionCreators } from "./actions";
import InceptionScreen from "./screens/InceptionScreen";
import ProjectCreateScreen from "./screens/ProjectCreateScreen";
import ViewLocation from "./screens/LocationScreen/ViewLocation";
import AddLocation from "./screens/LocationScreen/AddLocation";
import RegisterStudentScreen from "./screens/RegisterStudentScreen";
import SelectAccountTypeScreen from "./screens/SelectAccountTypeScreen";
import StudentLogin from "./screens/LoginScreen/StudentLogin";
import LecturerLogin from "./screens/LoginScreen/LecturerLogin";
import DashboardScreen from "./screens/DashboardScreen";
import ViewGroups from "./screens/GroupScreen/ViewGroups";
import CreateGroup from "./screens/GroupScreen/CreateGroup";
import ReduxContext from "./context/ReduxContext";

const customTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const outputRange = [
    Dimensions.get("window").width,
    0,
    -Dimensions.get("window").width
  ];

  const translateX = position.interpolate({
    inputRange,
    outputRange
  });

  return {
    transform: [{ translateX }]
  };
};

let TransitionConfiguration = () => {
  return {
    screenInterpolator: sceneProps => {
      const { position, scene } = sceneProps;
      const { index } = scene;

      return customTransition(index, position);
    }
  };
};

const Routes = StackNavigator(
  {
    inception: {
      screen: InceptionScreen
    },
    dashboard: {
      screen: DashboardScreen
    },
    selectAccount: {
      screen: SelectAccountTypeScreen
    },
    projectCreate: {
      screen: ProjectCreateScreen
    },
    viewLocation: {
      screen: ViewLocation
    },
    addLocation: {
      screen: AddLocation
    },
    registerScreen: {
      screen: RegisterStudentScreen
    },
    studentLogin: {
      screen: StudentLogin
    },
    lecturerLogin: {
      screen: LecturerLogin
    },
    viewGroups: {
      screen: ViewGroups
    },
    createGroup: {
      screen: CreateGroup
    }
  },
  {
    navigationOptions: { header: null },
    transitionConfig: TransitionConfiguration
  }
);

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

class RoutesAdvanced extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screenProps: props.screenProps
    };
  }

  render() {
    return (
      <ReduxContext.Provider value={this.state}>
        <Routes />
      </ReduxContext.Provider>
    );
  }
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(props => <RoutesAdvanced screenProps={props} />);
