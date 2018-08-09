import React from "react";
import { View, AsyncStorage } from "react-native";
import { Container, Content } from "native-base";
import PropTypes from "prop-types";

import LayoutContainer from "../containers/LayoutContainer";
import StatusBar from "../components/StatusBar";
import Form from "../components/Login/Form";
import Footer from "../components/Login/Footer";
import Colors from "../assets/Colors";
import { AuthUtils } from "../utils";

export default class LoginScreen extends React.PureComponent {
  state = {
    userAuthDetails: {
      username: "",
      fullname: "",
      password: ""
    },
    isLoading: false,
    isLoginActive: false
  };

  static propTypes = {
    onLogin: PropTypes.func.isRequired
  };

  login = () => {
    AsyncStorage.setItem("jwt", "aRandomData", error => {
      if (error) {
        alert("error in logging");
      } else {
        this.props.onLogin("main");
      }
    });
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
      <View style={styles.container}>
        <Container>
          <StatusBar />
          <LayoutContainer style={styles.layoutContainer}>
            <Content>
              <Form
                onUpdateUsername={val => this.updateFields(val, "username")}
                onUpdateName={val => this.updateFields(val, "fullname")}
                onUpdatePassword={val => this.updateFields(val, "password")}
              />
            </Content>
            <Footer
              onLogin={this.login}
              loginActive={this.state.isLoginActive}
            />
          </LayoutContainer>
        </Container>
      </View>
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
  }
};
