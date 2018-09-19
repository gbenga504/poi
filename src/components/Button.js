import React from "react";
import {
  TouchableNativeFeedback,
  Platform,
  TouchableWithoutFeedback
} from "react-native";

/**
 * @Component Button renders any Child Element Passed to it and also allows for the LongPress - Popup Functionality on Android
 */
export default class Button extends React.PureComponent {
  static propTypes = {
    ...TouchableNativeFeedback.propTypes
  };

  onPress = () => {
    setTimeout(() => this.props.onPress && this.props.onPress(), 500);
  };

  render() {
    if (Platform.OS == "android") {
      return (
        <TouchableNativeFeedback {...this.props} onPress={this.onPress}>
          {this.props.children}
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableWithoutFeedback {...this.props} onPress={this.onPress}>
          {this.props.children}
        </TouchableWithoutFeedback>
      );
    }
  }
}
