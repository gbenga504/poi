/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import { Dimensions } from "react-native";
import { StackNavigator } from "react-navigation";
import { Root } from "native-base";

import InceptionScreen from "./src/screens/InceptionScreen";
import ProjectCreateScreen from "./src/screens/ProjectCreateScreen";
import ViewLocation from "./src/screens/LocationScreen/ViewLocation";
import AddLocation from "./src/screens/LocationScreen/AddLocation";
import RegisterStudentScreen from "./src/screens/RegisterStudentScreen";
import SelectAccountTypeScreen from "./src/screens/SelectAccountTypeScreen";
import StudentLogin from "./src/screens/LoginScreen/StudentLogin";
import LecturerLogin from "./src/screens/LoginScreen/LecturerLogin";
import DashboardScreen from "./src/screens/DashboardScreen";

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
    }
  },
  {
    navigationOptions: { header: null },
    transitionConfig: TransitionConfiguration
  }
);

export default () => (
  <Root>
    <Routes />
  </Root>
);
