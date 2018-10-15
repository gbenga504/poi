import React from "react";
import {
  Container,
  Content,
  Icon,
  Input,
  Item,
  View,
  Toast
} from "native-base";
import { StyleSheet, AsyncStorage } from "react-native";

import LayoutContainer from "../containers/LayoutContainer";
import StatusBar from "../components/StatusBar";
import Colors from "../assets/Colors";
import { BoldText, MediumText } from "../components/AppText";
import { FlatButton } from "../components/AppButton";
import { registerUser } from "../api/accounts";
import ReduxContext from "../context/ReduxContext";
import { NavigationActions } from "react-navigation";

class RegisterStudentScreen extends React.PureComponent {
  state = {
    name: "Ajose Paul",
    matricNumber: "RSG/10/2345",
    phoneNumber: "",
    password: "supersecret",
    passwordConfirmation: "supersecret",
    email: "ajose.paul@gmail.com"
  };

  save = async () => {
    if (
      this.state.email &&
      this.state.name &&
      this.state.matricNumber &&
      this.state.password &&
      this.state.passwordConfirmation &&
      this.state.password == this.state.passwordConfirmation
    ) {
      const response = await registerUser(this.state);
      console.log("response", response);
      if (response.data) {
        Toast.show({
          text: "Registration Successful",
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
      }
    } else {
      Toast.show({
        text: "Registration failed, please fill all input fields"
      });
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar />
        <Content>
          <LayoutContainer>
            <BoldText style={styles.title}>Create a Student account</BoldText>
            <Item style={styles.inputContainer}>
              <Icon active name="md-person" style={styles.inputIcon} />
              <Input
                placeholder="Name"
                placeholderTextColor="#fff"
                style={styles.textInput}
                onChangeText={val => this.setState({ name: val })}
                value={this.state.name}
              />
            </Item>
            <Item style={styles.inputContainer}>
              <Icon active name="md-mail" style={styles.inputIcon} />
              <Input
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#fff"
                style={styles.textInput}
                onChangeText={val => this.setState({ email: val })}
                value={this.state.email}
              />
            </Item>
            {/* <View style={styles.pickerContainer}>
              <Picker
                mode="dialog"
                style={styles.picker}
                selectedValue={this.state.department}
                onValueChange={department => this.setState({ department })}
              >
                <Picker.Item label="Select your department" value="" />
                <Picker.Item label="AGY" value="agy" />
                <Picker.Item label="RSG" value="rsg" />
                <Picker.Item label="AGP" value="agp" />
                <Picker.Item label="MST" value="mst" />
              </Picker>
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                mode="dialog"
                selectedValue={this.state.level}
                onValueChange={level => this.setState({ level })}
              >
                <Picker.Item label="Select your level" value="" />
                <Picker.Item label="200" value="200" />
                <Picker.Item label="300" value="300" />
                <Picker.Item label="400" value="400" />
                <Picker.Item label="500" value="500" />
              </Picker>
            </View> */}
            <Item style={styles.inputContainer}>
              <Icon active name="md-person" style={styles.inputIcon} />
              <Input
                placeholder="Matric Number"
                placeholderTextColor="#fff"
                style={styles.textInput}
                onChangeText={val => this.setState({ matricNumber: val })}
                value={this.state.matricNumber}
              />
            </Item>
            {/*
            <Item style={styles.inputContainer}>
              <Icon active name="ios-call-outline" style={styles.inputIcon} />
              <Input
                placeholder="Phone Number"
                placeholderTextColor="#fff"
                style={styles.textInput}
              />
            </Item> */}
            {/* <View style={{ ...styles.genderContainer, marginTop: 20 }}>
              <MediumText style={{ ...styles.genderText, marginLeft: 0 }}>
                Gender:
              </MediumText>
              <View style={styles.gender}>
                <View style={styles.genderContainer}>
                  <Radio
                    selected={false}
                    selectedColor="#fff"
                    color="#fff"
                    onPress={() => null}
                  />
                  <MediumText style={styles.genderText}>Male</MediumText>
                </View>
                <View style={{ ...styles.genderContainer, marginLeft: 15 }}>
                  <Radio
                    selected={false}
                    color="#fff"
                    selectedColor="#fff"
                    onPress={() => null}
                  />
                  <MediumText style={styles.genderText}>Female</MediumText>
                </View>
              </View>
            </View> */}
            <Item style={styles.inputContainer}>
              <Icon active name="md-lock" style={styles.inputIcon} />
              <Input
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#fff"
                style={styles.textInput}
                onChangeText={val => this.setState({ password: val })}
                value={this.state.password}
              />
            </Item>
            <Item style={styles.inputContainer}>
              <Icon active name="md-lock" style={styles.inputIcon} />
              <Input
                placeholder="Confirm Password"
                secureTextEntry={true}
                placeholderTextColor="#fff"
                style={styles.textInput}
                value={this.state.passwordConfirmation}
                onChangeText={val =>
                  this.setState({ passwordConfirmation: val })
                }
              />
            </Item>
            <View style={styles.registerButton}>
              <FlatButton title="Create Account" onPress={() => this.save()} />
            </View>
          </LayoutContainer>
        </Content>
      </Container>
    );
  }
}

const _RegisterStudent = props => (
  <ReduxContext.Consumer>
    {({ screenProps }) => (
      <RegisterStudentScreen {...props} screenProps={screenProps} />
    )}
  </ReduxContext.Consumer>
);

export default _RegisterStudent;

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.defaultThemeColor
  },
  title: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 30,
    color: "#fff"
  },
  inputIcon: {
    color: "#fff"
  },
  pickerContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#fff",
    paddingBottom: 0,
    marginTop: 20,
    borderBottomColor: "#fff",
    paddingBottom: 0
  },
  inputContainer: {
    marginTop: 20
  },
  iconContainer: {
    marginBottom: 10,
    marginLeft: 30
  },
  textInput: {
    color: "#fff"
    // fontFamily: "Quicksand-Medium"
  },
  picker: { color: "#fff", marginLeft: -5 },
  registerButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    flexDirection: "row"
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  genderText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16
  },
  gender: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
};
