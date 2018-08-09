import React from "react";
import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";

export default class InceptionScreen extends React.PureComponent {
  componentDidMount() {
    let { navigation } = this.props;

    AsyncStorage.getItem("@userType", (error, type) => {
      if (error || !type) {
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
                routeName: "dashboard",
                params: { type }
              })
            ]
          })
        );
      }
    });
  }

  render() {
    return null;
  }
}
