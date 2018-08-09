import React from "react";
import PropTypes from "prop-types";
import { Dimensions, StatusBar, View } from "react-native";

import { BoldText } from "../AppText";
import AppHeader from "../AppHeader";
import Icon from "../Icon";
import Fonts from "../../assets/Fonts";
import Button from "../Button";

export default class ColleagueAddition extends React.PureComponent {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired
  };

  renderCancelButton = () => (
    <Button onPress={this.props.onRequestClose}>
      <View style={styles.headerContainer}>
        <Icon
          name="close"
          type="material-icon"
          style={{ ...styles.headerButton, ...styles.cancel }}
        />
      </View>
    </Button>
  );

  renderDoneButton = () => (
    <Button>
      <View style={styles.headerContainer}>
        <BoldText style={styles.headerButton}>DONE</BoldText>
      </View>
    </Button>
  );

  render() {
    const bottom = this.props.isVisible
      ? 0 - StatusBar.currentHeight
      : -Dimensions.get("window").height;
    return (
      <View style={{ ...styles.inviteContainer, bottom }}>
        <View style={styles.container}>
          <AppHeader
            left={this.renderCancelButton()}
            right={this.renderDoneButton()}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  inviteContainer: {
    position: "absolute",
    zIndex: 100999,
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    left: 0
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerButton: {
    fontSize: Fonts.listHeaderSize,
    color: "#fff"
  },
  cancel: {
    fontSize: 25
  }
};
