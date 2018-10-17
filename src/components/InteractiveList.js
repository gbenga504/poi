import React from "react";
import { ScrollView, View } from "react-native";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "native-base";

import { BoldText, RegularText } from "./AppText";
import Colors from "../assets/Colors";
import Fonts from "../assets/Fonts";
import InteractionHandler from "./InteractionHandler";

const InteractiveList = props => {
  if (props.dataArray.length !== 0) {
    return (
      <ScrollView>
        {props.dataArray.map((list, i) => (
          <InteractionHandler
            key={i}
            buttons={props.actionButtons(list)}
            onPress={() => props.onPress(props.items[i])}
          >
            <Grid style={styles.listContainer}>
              <Col style={styles.listAvatar}>
                <BoldText style={styles.listAvatarText}>
                  {i}
                </BoldText>
              </Col>
              <Col>
                <BoldText style={styles.listText}>{list.name}</BoldText>
                <RegularText style={styles.listDescription}>
                  {list.description
                    ? `${list.description.substring(0, 15)}...`
                    : ""}
                </RegularText>
              </Col>
              {list.tag && (
                <View style={styles.tagContainer}>
                  <BoldText style={styles.tag}>{list.tag}</BoldText>
                </View>
              )}
            </Grid>
          </InteractionHandler>
        ))}
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.nullTextContainer}>
        <RegularText style={styles.nullText}>
          {props.renderNullItem}
        </RegularText>
      </View>
    );
  }
};

InteractiveList.propTypes = {
  renderNullItem: PropTypes.string.isRequired,
  items: PropTypes.array,
  dataArray: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.name,
      description: PropTypes.description,
      tag: PropTypes.number
    })
  ).isRequired,
  actionButtons: PropTypes.oneOfType(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired
      })
    ),
    PropTypes.func
  ),
  onPress: PropTypes.func
};

const styles = {
  nullTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  nullText: {
    fontSize: Fonts.listContentSize,
    color: Colors.listContentColor
  },
  listContainer: {
    height: 100,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.listBottomColor
  },
  listAvatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.categoryHeaderColor,
    alignItems: "center",
    justifyContent: "center"
  },
  listAvatarText: {
    fontSize: Fonts.listHeaderSize,
    color: "#fff"
  },
  listDescription: {
    fontSize: Fonts.listContentSize,
    color: Colors.listContentColor,
    marginLeft: 20
  },
  listText: {
    fontSize: Fonts.listHeaderSize,
    color: Colors.listHeaderColor,
    marginLeft: 20
  },
  tagContainer: {
    position: "absolute",
    right: 15,
    top: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "teal",
    borderRadius: 5,
    width: 30,
    height: 20
  },
  tag: {
    color: "#fff",
    fontSize: 13,
    textAlign: "center"
  }
};

export default InteractiveList;
