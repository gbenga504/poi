import React from "react";
import { Container, Icon } from "native-base";
import { View, AsyncStorage } from "react-native";

import { FlatButton } from "../components/AppButton";
import StatusBar from "../components/StatusBar";
import LayoutContainer from "../containers/LayoutContainer";
import { MediumText } from "../components/AppText";
import Colors from "../assets/Colors";

export default class SelectAccountTypeScreen extends React.PureComponent {
  setUserType = type => {
    let {
      navigation: { navigate }
    } = this.props;
    navigate(type == "student" ? "studentLogin" : "lecturerLogin");
  };

  render() {
    let {
      navigation: { goBack }
    } = this.props;

    return (
      <Container style={styles.contentContainer}>
        <StatusBar />
        <LayoutContainer>
          <View style={styles.container}>
            <View style={styles.body}>
              <MediumText style={styles.text}>Select Account Type</MediumText>
              <MediumText style={styles.text}> I am a: </MediumText>
              <FlatButton
                style={styles.appButton}
                onPress={() => this.setUserType("lecturer")}
                title="Lecturer"
              />
              <FlatButton
                style={styles.appButton}
                onPress={() => this.setUserType("student")}
                title="Student"
              />
            </View>
          </View>
        </LayoutContainer>
      </Container>
    );
  }
}

const styles = {
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.defaultThemeColor
  },
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  iconContainer: {
    marginBottom: 30,
    marginLeft: 30
  },
  text: {
    marginTop: 40,
    color: "#fff",
    fontSize: 19
  },
  appButton: {
    marginTop: 10,
    alignSelf: "center",
    height: 55,
    paddingHorizontal: 50
  }
};
