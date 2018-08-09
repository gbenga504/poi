import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { View } from "react-native";

/**
 *@Component LayoutContainer renders a general layout container for the application
 */
export default class LayoutContainer extends PureComponent {
  static propTypes = {
    style: PropTypes.object
  };

  /**
   * @return {object}
   * @function builds the style of the Layout container  
   */
  buildStyle = () => {
    if (this.props.style) {
      return { ...LayoutStyles.container, ...this.props.style };
    }
    return LayoutStyles.container;
  };

  render() {
    return <View style={this.buildStyle()}>{this.props.children}</View>;
  }
}

const LayoutStyles = {
  container: {
    flex: 1,
    padding: 16
  }
};
