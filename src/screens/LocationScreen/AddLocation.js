import React from "react";
import { Content, Container, Item, Input } from "native-base";
import { View } from "react-native";
import { connect } from "react-redux";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import { MediumText } from "../../components/AppText";

class AddLocation extends React.PureComponent {
  save = () => {
    //@Todo, save the data and route to the Location screen
  };

  render() {
    let { userType } = this.props;

    return (
      <Container>
        <AppHeader
          navigation={this.props.navigation}
          pageTitle="Location"
          right={
            <MediumText onPress={this.save} style={styles.save}>
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
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Latitude"
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Longitude"
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Elevation"
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Address/Reference"
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Feature Type"
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter a Rock Type"
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Mineralogy"
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Strike"
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Dip"
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Enter Structural Trend"
              />
            </Item>
            <Item>
              <Input
                editable={userType == "lecturer" ? false : true}
                placeholder="Ente Description"
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
