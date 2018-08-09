import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StatusBar } from "react-native";

import Colors from "../assets/Colors";

/**
 * @Component default functional component renders the statusBar of the application 
 */
export default () => (
  <StatusBar backgroundColor={Colors.statusBar} barStyle="light-content" />
);
