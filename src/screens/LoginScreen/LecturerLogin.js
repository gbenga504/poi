import React from "react";
import { View, AsyncStorage } from "react-native";
import { Container, Content } from "native-base";
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

class LecturerLogin extends React.PureComponent {
  state = {
    userAuthDetails: {
      username: "",
      password: ""
    },
    isLoading: false,
    isLoginActive: false
  };

  login = () => {
    let {
      screenProps: { setJwt, setUserType },
      navigation
    } = this.props;

    AsyncStorage.multiSet(
      [["@jwt", "add_jwt_here"], ["@userType", "lecturer"]],
      error => {
        if (!error) {
          setJwt("add_jwt_here");
          setUserType("lecturer");

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
  };

  updateFields = (value, field) => {
    let { userAuthDetails } = this.state;
    let isLoginActive = AuthUtils.loginValidation(
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
              onUpdateUsername={val => this.updateFields(val, "username")}
              onUpdatePassword={val => this.updateFields(val, "password")}
              hideFullNameField
            />
          </Content>
          <Footer onLogin={this.login} loginActive={this.state.isLoginActive} />
        </LayoutContainer>
      </Container>
    );
  }
}

const _LecturerLogin = props => (
  <ReduxContext.Consumer>
    {({ screenProps }) => (
      <LecturerLogin {...props} screenProps={screenProps} />
    )}
  </ReduxContext.Consumer>
);

export default _LecturerLogin;

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
