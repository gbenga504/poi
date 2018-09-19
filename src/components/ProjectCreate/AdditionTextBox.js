import React from "react";
import { ScrollView, View, TextInput } from "react-native";

import Colors from "../../assets/Colors";
import Badge from "../Badge";

export default class AdditionTextBox extends React.PureComponent {
  render() {
    return (
      <View style={styles.searchWrapper}>
        <ScrollView
          ref={ref => (this.inputDocker = ref)}
          style={{ height: this.state.scrollviewHeight }}
          onContentSizeChange={this.changeScrollViewSettings}
        >
          <View style={styles.inputDocker}>
            {this.props.colleagues.map(colleague => {
              return <Badge key={i} name={colleague.name} />;
            })}
            <TextInput
              multiline={false}
              underlineColorAndroid="transparent"
              placeholder="Search for team partners"
              placeholderTextColor={Colors.grayColor80}
              style={styles.searchBox}
              onChangeText={this.search}
              value={this.state.searchText}
              autoFocus={true}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  searchWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.listContentColor,
    flexDirection: "row"
  },
  inputDocker: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
};
