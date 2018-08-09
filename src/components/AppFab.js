import React from "react";
import { Fab, Icon } from "native-base";
import PropTypes from "prop-types";
import Colors from "../assets/Colors";

const AppFab = props => (
  <Fab
    active={true}
    direction="up"
    style={styles.fab}
    position="bottomRight"
    onPress={props.onPress}
  >
    <Icon
      name={props.name || "md-person-add"}
      type={props.type || "Ionicons"}
    />
  </Fab>
);

const styles = {
  fab: {
    backgroundColor: Colors.favColor
  }
};

AppFab.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string
};

export default AppFab;
