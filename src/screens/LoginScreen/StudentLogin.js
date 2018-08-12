import React from "react";
import { View, AsyncStorage } from "react-native";
import { Container, Content } from "native-base";
import PropTypes from "prop-types";

import LayoutContainer from "../../containers/LayoutContainer";
import StatusBar from "../../components/StatusBar";
import Form from "../../components/Login/Form";
import Footer from "../../components/Login/Footer";
import Colors from "../../assets/Colors";
import { AuthUtils } from "../../utils";
import { MediumText } from "../../components/AppText";

export default class StudentLogin extends React.PureComponent {
  state = {
    userAuthDetails: {
      username: "",
      fullname: "",
      password: ""
    },
    isLoading: false,
    isLoginActive: false
  };

  login = () => {
    AsyncStorage.multiSet(
      [["jwt", "aRandomData"], ["@userType", "student"]],
      error => {
        if (error) {
          alert("error in logging");
        } else {
          this.props.navigation.navigate("dashboard", { type: "student" });
        }
      }
    );
  };

  updateFields = (value, field) => {
    let { userAuthDetails } = this.state;
    let isLoginActive = AuthUtils.loginValidation(
      userAuthDetails.fullname,
      userAuthDetails.username,
      userAuthDetails.password
    );
    userAuthDetails[field] = value;
    this.setState({
      isLoginActive: isLoginActive,
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
              onUpdateUsername={val => this.updateFields(val, "username")}
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
