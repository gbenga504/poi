import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, AsyncStorage } from "react-native";
import { Header, Left, Body, Right, Title, Icon, Button } from "native-base";
import Menu, { MenuItem } from "react-native-material-menu";
import { NavigationActions } from "react-navigation";

import { BoldText } from "./AppText";
import Fonts from "../assets/Fonts";
import Colors from "../assets/Colors";
import ReduxContext from "../context/ReduxContext";

class AppHeader extends Component {
  static propTypes = {
    right: PropTypes.element,
    left: PropTypes.element,
    title: PropTypes.string,
    navigation: PropTypes.object,
    pageTitle: PropTypes.string
  };

  logout = () => {
    let {
      screenProps: { setJwt, setUserType }
    } = this.props;

    AsyncStorage.multiRemove(["@userType", "@jwt"])
      .then(data => {
        setJwt(null);
        setUserType(null);

        this.props.navigation.dispatch(
          NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({
                routeName: "selectAccount"
              })
            ]
          })
        );
      })
      .catch(err => alert(err));
  };

  render() {
    let { left, title, right, pageTitle } = this.props;
    return (
      <Header androidStatusBarColor={Colors.statusBar} style={styles.container}>
        <Left>
          {left ? (
            left
          ) : (
            <View style={styles.left}>
              <View style={styles.avatar}>
                <BoldText style={styles.avatarText}>
                  {pageTitle && pageTitle[0].toUpperCase()}
                </BoldText>
              </View>
              <BoldText style={styles.name}>
                {pageTitle && pageTitle.toUpperCase()}
              </BoldText>
            </View>
          )}
        </Left>
        <Body>{title ? <Title>{title}</Title> : <Title />}</Body>
        <Right>
          {right ? (
            right
          ) : (
            <Menu
              ref={ref => (this.menu = ref)}
              button={
                <Button transparent onPress={() => this.menu.show()}>
                  <Icon name="md-more" />
                </Button>
              }
            >
              <MenuItem onPress={this.logout}>Logout</MenuItem>
            </Menu>
          )}
        </Right>
      </Header>
    );
  }
}

const _AppHeader = props => (
  <ReduxContext.Consumer>
    {({ screenProps }) => <AppHeader {...props} screenProps={screenProps} />}
  </ReduxContext.Consumer>
);

export default _AppHeader;

const styles = {
  container: {
    backgroundColor: Colors.defaultThemeColor
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    width: 150
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
