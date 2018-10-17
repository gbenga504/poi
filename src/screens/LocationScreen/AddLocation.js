import React from "react";
import { Content, Container, Item, Input, Toast } from "native-base";
import { View, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import { MediumText } from "../../components/AppText";
import { createLocation, updateLocation } from "../../api/assessment";

class AddLocation extends React.PureComponent {
  save = async () => {
    // create location
    if (!this.state.id) {
      const response = await createLocation(this.state);
      if (response.data) {
        Toast.show({
          text: "Location added successfully",
          buttonText: ""
        });
        this.handleSuccess();
      }
    } else {
      // update location
      console.log("update called");
      const response = await updateLocation(this.state);
      if (response.data) {
        Toast.show({
          text: "Location updated successfully",
          buttonText: ""
        });
        this.handleSuccess();
      }
    }
  };

  handleSuccess = () => {
    let {
      navigation: {
        navigate,
        state: {
          params: { groupId, groupName }
        }
      }
    } = this.props;
    navigate("viewLocation", {
      group: {
        id: groupId,
        name: groupName
      }
    });
  };

  addNewLocation = async parsedLocations => {
    await AsyncStorage.setItem("@locations", JSON.stringify(parsedLocations));
    Toast.show({
      text: "Location added successfully",
      buttonText: ""
    });
  };
  state = {
    location_number: "",
    lat: "",
    long: "",
    elevation: "",
    feature_type: "",
    address: "",
    rock_type: "",
    mineralogy: "",
    strike: "",
    dip: "",
    structural_trend: "",
    description: "",
    locationId: "",
    groupName: "",
    id: null
  };

  componentDidMount() {
    let {
      navigation: {
        state: {
          params: { groupId, location }
        }
      }
    } = this.props;
    this.setState({ ...location, group_id: groupId });
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
                onChangeText={val => this.setState({ location_number: val })}
                value={this.state.location_number}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Latitude"
                onChangeText={val => this.setState({ lat: val })}
                value={this.state.lat}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Longitude"
                onChangeText={val => this.setState({ long: val })}
                value={this.state.long}
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
                onChangeText={val => this.setState({ feature_type: val })}
                value={this.state.feature_type}
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter a Rock Type"
                onChangeText={val => this.setState({ rock_type: val })}
                value={this.state.rock_type}
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
                onChangeText={val => this.setState({ structural_trend: val })}
                value={this.state.structural_trend}
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
