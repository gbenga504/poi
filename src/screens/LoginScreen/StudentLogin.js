import React from "react";
import { View, AsyncStorage } from "react-native";
import { Container, Content, Toast } from "native-base";
import { NavigationActions } from "react-navigation";

import LayoutContainer from "../../containers/LayoutContainer";
import StatusBar from "../../components/StatusBar";
import Form from "../../components/Login/Form";
import Footer from "../../components/Login/Footer";
import Colors from "../../assets/Colors";
import { AuthUtils } from "../../utils";
import ReduxContext from "../../context/ReduxContext";
import { loginUser } from "../../api/accounts";
import LoadingView from "../../components/LoadingView";

class StudentLogin extends React.PureComponent {
  state = {
    userAuthDetails: {
      email: "",
      password: ""
    },
    isLoading: false,
    isLoginActive: false
  };

  login = async () => {
    this.setState({
      isLoading: true
    });

    try {
      const response = await loginUser({
        email: this.state.userAuthDetails.email,
        password: this.state.userAuthDetails.password
      });

      this.setState({
        isLoading: false
      });

      if (response.data) {
        Toast.show({
          text: "Login Successful",
          buttonText: ""
        });
        let {
          screenProps: { setJwt, setUserType },
          navigation
        } = this.props;

        AsyncStorage.multiSet(
          [
            ["@jwt", response.data.jwt],
            ["@userType", "student"],
            ["currentUser", JSON.stringify(response.data.user)]
          ],
          error => {
            if (!error) {
              setJwt(response.data.jwt);
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
        Toast.show({
          text: "Login Failed, Please check details and try again later",
          buttonText: ""
        });
      }
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
      Toast.show({
        text: "Login Failed, Please check your network connection",
        buttonText: ""
      });
    }
  };

  updateFields = (value, field) => {
    let { userAuthDetails } = this.state;
    let isLoginActive = AuthUtils.loginValidation(
      userAuthDetails.email,
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
        {this.state.isLoading && <LoadingView />}
        <LayoutContainer style={styles.layoutContainer}>
          <Content>
            <Form
              onUpdateUsername={val => this.updateFields(val, "email")}
              onUpdatePassword={val => this.updateFields(val, "password")}
              hideFullNameField
            />
          </Content>
          <Footer onLogin={() => this.login()} loginActive={true} />
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
