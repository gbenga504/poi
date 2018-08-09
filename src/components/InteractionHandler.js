import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { ActionSheet } from "native-base";

import Button from "./Button";

export default class InteractionHandler extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired
      })
    ).isRequired
  };

  composeInteractiveListButtonsToString = () => {
    let buttons = this.props.buttons.map(button => button.name);
    return [...buttons, "Cancel"];
  };

  render() {
    let CANCEL_INDEX = this.props.buttons.length;
    return (
      <Button
        onLongPress={() =>
          ActionSheet.show(
            {
              options: this.composeInteractiveListButtonsToString(),
              cancelButtonIndex: CANCEL_INDEX
            },
            buttonIndex => {
              buttonIndex != CANCEL_INDEX &&
                this.props.buttons[buttonIndex].onPress();
            }
          )
        }
        onPress={this.props.onPress}
      >
        <View>{this.props.children}</View>
      </Button>
    );
  }
}
