import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Header, Left, Body, Right, Title, Icon, Button } from "native-base";

import { BoldText } from "./AppText";
import Fonts from "../assets/Fonts";
import Colors from "../assets/Colors";

export default class AppHeader extends Component {
  static propTypes = {
    right: PropTypes.element,
    left: PropTypes.element,
    title: PropTypes.string
  };

  render() {
    let { left, title, right } = this.props;
    return (
      <Header androidStatusBarColor={Colors.statusBar} style={styles.container}>
        <Left>
          {left ? (
            left
          ) : (
              <View style={styles.left}>
                <View style={styles.avatar}>
                  <BoldText style={styles.avatarText}>G</BoldText>
                </View>
                <BoldText style={styles.name}>GAD</BoldText>
              </View>
            )}
        </Left>
        <Body>{title ? <Title>{title}</Title> : <Title />}</Body>
        <Right>
          {right ? (
            right
          ) : (
              <Button transparent>
                <Icon name='md-more' />
              </Button>
            )}
        </Right>
      </Header>
    );
  }
}

const styles = {
  container: {
    backgroundColor: Colors.defaultThemeColor
  },
  left: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  avatarText: {
    color: Colors.listHeaderColor,
    fontSize: Fonts.listHeaderSize
  },
  name: {
    fontSize: Fonts.listHeaderSize,
    color: "#fff",
    marginLeft: 10
  }
};
