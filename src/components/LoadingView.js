import React from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  View,
  Modal
} from "react-native";

const LoadingView = props => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={props.visible}
    onRequestClose={() => null}
  >
    <View style={styles.container}>
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator
          animating={true}
          size={Platform.OS == "android" ? 35 : 1}
          color="teal"
        />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  activityIndicatorContainer: {
    marginHorizontal: 10,
    backgroundColor: "#fff",
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LoadingView;
