import React from "react";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

class InceptionScreen extends React.PureComponent {
  componentDidMount() {
    let { navigation, userType } = this.props;

    if (!userType) {
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
