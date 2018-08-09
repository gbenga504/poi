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
