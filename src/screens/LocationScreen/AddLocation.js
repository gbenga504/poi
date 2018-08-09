import React from "react";
import { Content, Container, Item, Input } from "native-base";
import { View } from "react-native";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";

export default class AddLocation extends React.PureComponent {
  render() {
    return (
      <Container>
        <AppHeader />
        <Content>
          <LayoutContainer style={styles.bodyContainer}>
            <Item>
              <Input placeholder="Enter a location Number" />
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
  }
};
