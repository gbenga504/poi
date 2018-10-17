import React from "react";
import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

class InceptionScreen extends React.PureComponent {
  async componentDidMount() {
    const { navigation } = this.props;
    const currentUser = await AsyncStorage.getItem("currentUser");
    const jwt = await AsyncStorage.getItem("@jwt");

    if (!currentUser && !jwt) {
      navigation.dispatch(
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
    } else {
      navigation.dispatch(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: "dashboard"
            })
          ]
        })
      );
    }
  }

  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    userType: state.userType
  };
}

export default connect(mapStateToProps)(InceptionScreen);
