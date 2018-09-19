import React from "react";
import { View, AsyncStorage } from "react-native";
import { Container, Content, Toast } from "native-base";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";

import LayoutContainer from "../../containers/LayoutContainer";
import StatusBar from "../../components/StatusBar";
import Form from "../../components/Login/Form";
import Footer from "../../components/Login/Footer";
import Colors from "../../assets/Colors";
import { AuthUtils } from "../../utils";
import { MediumText } from "../../components/AppText";
import ReduxContext from "../../context/ReduxContext";
import _ from "lodash";

class StudentLogin extends React.PureComponent {
  state = {
    userAuthDetails: {
      matricNumber: "",
      password: ""
    },
    isLoading: false,
    isLoginActive: false
  };

  login = async () => {
    let {
      screenProps: { setJwt, setUserType },
      navigation
    } = this.props;
    const students = await AsyncStorage.getItem("@students");
    if (students) {
      let parsedStudents = JSON.parse(students);
      const student = _.find(parsedStudents, {
        matricNumber: this.state.userAuthDetails.matricNumber,
        password: this.state.userAuthDetails.password
      });
      console.log("student", student);
      if (student) {
        AsyncStorage.multiSet(
          [["@jwt", student.matricNumber], ["@userType", "student"]],
          error => {
            if (!error) {
              setJwt(student.matricNumber);
              setUserType("student");

              navigation.dispatch(
                NavigationActions.reset({
                  index: 0,
                  key: null,
                  actions: [
                    NavigationActions.navigate({
                      routeName: "dashboard"
                    })
                  ]
                })
              );
            }
          }
        );
      } else {
        // ask to register
        Toast.show({
          text: "User credentials invalid, Please Register"
        });
        this.props.navigation.navigate("registerScreen");
      }
    } else {
      // ask to register
      Toast.show({
        text: "User credentials invalid, Please Register"
      });
      this.props.navigation.navigate("registerScreen");
    }
  };

  updateFields = (value, field) => {
    let { userAuthDetails } = this.state;
    userAuthDetails[field] = value;
    this.setState({
      isLoginActive: true,
      userAuthDetails: userAuthDetails
    });
  };

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar />
        <LayoutContainer style={styles.layoutContainer}>
          <Content>
            <Form
              userNamePlaceholder="MATRIC NUMBER"
              onUpdateUsername={val => this.updateFields(val, "matricNumber")}
              onUpdatePassword={val => this.updateFields(val, "password")}
            />
            <MediumText style={styles.text}>Or</MediumText>
            <MediumText
              style={{ ...styles.text, ...styles.register }}
              onPress={() => this.props.navigation.navigate("registerScreen")}
            >
              Not Registered ? Sign Up as a Student
            </MediumText>
          </Content>
          <Footer onLogin={this.login} loginActive={this.state.isLoginActive} />
        </LayoutContainer>
      </Container>
    );
  }
}

const _StudentLogin = props => (
  <ReduxContext.Consumer>
    {({ screenProps }) => <StudentLogin {...props} screenProps={screenProps} />}
  </ReduxContext.Consumer>
);

export default _StudentLogin;

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.defaultThemeColor
  },
  layoutContainer: {
    justifyContent: "space-between"
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    marginTop: 15
  },
  register: {
    textDecorationLine: "underline"
  }
};
