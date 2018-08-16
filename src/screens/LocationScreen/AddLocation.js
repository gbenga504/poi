import React from "react";
import { Content, Container, Item, Input, Toast } from "native-base";
import { View, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import { MediumText } from "../../components/AppText";

class AddLocation extends React.PureComponent {
  save = async () => {
    console.log("location state", this.state);
    //@Todo, save the data and route to the Location screen
    let { userType } = this.props;
    // const filledAllFields = Object.values(yourTestObject).every(item => item)
    if (userType == "student") {
      const formData = {
        ...this.state
      };
      console.log("form data", formData);
      const locations = await AsyncStorage.getItem("@locations");
      let parsedLocations = [];
      if (locations) {
        parsedLocations = JSON.parse(locations);
        this.updateLocation(formData, parsedLocations);
      } else {
        // no location previously added
        this.addNewLocation([...parsedLocations, formData]);
      }
      this.props.navigation.goBack();
    }
  };

  updateLocation = (formData, parsedLocations) => {
    const index = parsedLocations.findIndex(
      location => location.locationNumber == formData.locationNumber
    );
    if (index) {
      console.log("index", index);
      const locationsBeforeIndex = parsedLocations.slice(0, index);
      const locationsAfterIndex = parsedLocations.slice(
        index + 1,
        parsedLocations.length
      );

      console.log("locationsBeforeIndex", locationsBeforeIndex);
      console.log("locationsAfterIndex", locationsAfterIndex);
      const locationsToSave = [
        ...locationsBeforeIndex,
        formData,
        ...locationsAfterIndex
      ];
      console.log("locationsToSave", locationsToSave);
      this.addNewLocation(locationsToSave);
    } else {
      this.addNewLocation([...parsedLocations, formData]);
    }
  };

  addNewLocation = async parsedLocations => {
    await AsyncStorage.setItem("@locations", JSON.stringify(parsedLocations));
    Toast.show({
      text: "Location added successfully",
      buttonText: ""
    });
  };
  state = {
    locationNumber: "",
    latitude: "",
    longtitude: "",
    elevation: "",
    featureType: "",
    address: "",
    rockType: "",
    mineralogy: "",
    strike: "",
    dip: "",
    structTrend: "",
    description: "",
    locationId: "",
    groupName: ""
  };

  componentDidMount() {
    let {
      navigation: {
        navigate,
        state: {
          params: { location }
        }
      }
    } = this.props;
    this.setState({ ...location });
  }
  render() {
    let { userType } = this.props;

    return (
      <Container>
        <AppHeader
          navigation={this.props.navigation}
          pageTitle="Location"
          right={
            <MediumText onPress={() => this.save()} style={styles.save}>
              Save
            </MediumText>
          }
        />
        <Content>
          <LayoutContainer style={styles.bodyContainer}>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter a location Number"
                onChangeText={val => this.setState({ locationNumber: val })}
                value={this.state.locationNumber}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Latitude"
                onChangeText={val => this.setState({ latitude: val })}
                value={this.state.latitude}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Longitude"
                onChangeText={val => this.setState({ longtitude: val })}
                value={this.state.longtitude}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Elevation"
                onChangeText={val => this.setState({ elevation: val })}
                value={this.state.elevation}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Address/Reference"
                onChangeText={val => this.setState({ address: val })}
                value={this.state.address}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Feature Type"
                onChangeText={val => this.setState({ featureType: val })}
                value={this.state.featureType}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter a Rock Type"
                onChangeText={val => this.setState({ rockType: val })}
                value={this.state.rockType}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Mineralogy"
                onChangeText={val => this.setState({ mineralogy: val })}
                value={this.state.mineralogy}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Strike"
                onChangeText={val => this.setState({ strike: val })}
                value={this.state.strike}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Dip"
                onChangeText={val => this.setState({ dip: val })}
                value={this.state.dip}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Structural Trend"
                onChangeText={val => this.setState({ structTrend: val })}
                value={this.state.structTrend}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Ente Description"
                onChangeText={val => this.setState({ description: val })}
                value={this.state.description}
              />
            </Item>
          </LayoutContainer>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userType: state.userType
  };
}

export default connect(mapStateToProps)(AddLocation);

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  save: {
    color: "#fff",
    fontSize: 14,
    alignSelf: "center"
  }
};
