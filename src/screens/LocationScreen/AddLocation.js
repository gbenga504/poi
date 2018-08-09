import React from "react";
import { Content, Container, Item, Input } from "native-base";
import { View } from "react-native";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import { MediumText } from "../../components/AppText";

export default class AddLocation extends React.PureComponent {
  render() {
    return (
      <Container>
        <AppHeader right={<MediumText style={styles.save}>Save</MediumText>} />
        <Content>
          <LayoutContainer style={styles.bodyContainer}>
            <Item>
              <Input placeholder="Enter a location Number" />
            </Item>
            <Item>
              <Input placeholder="Enter Latitude" />
            </Item>
            <Item>
              <Input placeholder="Enter Longitude" />
            </Item>
            <Item>
              <Input placeholder="Enter Elevation" />
            </Item>
            <Item>
              <Input placeholder="Enter Address/Reference" />
            </Item>
            <Item>
              <Input placeholder="Enter Feature Type" />
            </Item>
            <Item>
              <Input placeholder="Enter a Rock Type" />
            </Item>
            <Item>
              <Input placeholder="Enter Mineralogy" />
            </Item>
            <Item>
              <Input placeholder="Ente Description" />
            </Item>
            <Item>
              <Input placeholder="Enter Strike" />
            </Item>
            <Item>
              <Input placeholder="Enter Dip" />
            </Item>
            <Item>
              <Input placeholder="Enter Structural Trend" />
            </Item>
          </LayoutContainer>
        </Content>
      </Container>
    );
  }
}

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
