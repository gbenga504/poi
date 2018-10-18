import React from "react";
import { ActivityIndicator, StyleSheet, View, Platform } from "react-native";
import PropTypes from "prop-types";

export default class RequestActivityIndicator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldRenderComponent: false
    };
    this.isMounted = true;
  }

  static propTypes = {
    delay: PropTypes.number
  };

  static defaultProps = {
    delay: 1000
  };

  componentDidMount() {
    let { delay } = this.props;

    this.timeOut = setTimeout(() => {
      this.setState({ shouldRenderComponent: true });
    }, delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  render() {
    let { shouldRenderComponent } = this.state;
    return shouldRenderComponent ? (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          size={Platform.OS == "android" ? 20 : 0}
          color="teal"
        />
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
