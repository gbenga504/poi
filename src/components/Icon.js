import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import EVILIcon from "react-native-vector-icons/EvilIcons";
import IONICon from "react-native-vector-icons/Ionicons";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MATIcon from "react-native-vector-icons/MaterialIcons";
import SIMPLEIcon from "react-native-vector-icons/SimpleLineIcons";
import MATCOMMIcon from "react-native-vector-icons/MaterialCommunityIcons";

/**
 *@Component Icon renders the icon of the application
 */
export default class ICON extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.object,
    contentContainerStyle: PropTypes.object,
    onPress: PropTypes.func
  };

  /**
   * @return {component|null}
   * make decision to present a particular icon based on the type supplied by the user
   */
  getIconToRender = () => {
    let icon = null,
      { contentContainerStyle, onPress } = this.props,
      newStyles = this.props.style || {};

    switch (this.props.type) {
      case "evil-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <EVILIcon
              style={{ color: "#fff", ...newStyles }}
              name={this.props.name}
            />
          </Text>
        );
        break;
      case "material-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <MATIcon
              style={{ color: "#fff", ...newStyles }}
              name={this.props.name}
            />
          </Text>
        );
        break;
      case "simple-line-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <SIMPLEIcon
              style={{ color: "#fff", ...newStyles }}
              name={this.props.name}
            />
          </Text>
        );
        break;
      case "ionic-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <IONICon
              style={{ color: "#fff", ...newStyles }}
              name={this.props.name}
            />
          </Text>
        );
        break;
      case "font-awesome-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <FAIcon
              style={{ color: "#fff", ...newStyles }}
              name={this.props.name}
            />
          </Text>
        );
        break;
      case "community-icon":
        icon = (
          <Text style={contentContainerStyle || {}} onPress={onPress || null}>
            <MATCOMMIcon
              style={{ color: "#fff", ...newStyles }}
              name={this.props.name}
            />
          </Text>
        );
        break;
      default:
        console.warn(
          "Sorry the type you provided is not supported. \n The supported types are a) font-awesome-icon \n b) ionic-icon \n c) material-icon \n d) simple-line-icon \n e) evil-icon f) community-icon"
        );
        icon = null;
    }
    return icon;
  };

  render() {
    return this.getIconToRender();
  }
}
