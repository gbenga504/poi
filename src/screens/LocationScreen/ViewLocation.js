import React from "react";
import { Content, Container } from "native-base";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";

import LayoutContainer from "../../containers/LayoutContainer";
import AppHeader from "../../components/AppHeader";
import AppFab from "../../components/AppFab";
import InteractiveList from "../../components/InteractiveList";
import _ from "lodash";
import { groupLocations } from "../../api/assessment";
import ReduxContext from "../../context/ReduxContext";
import RequestActivityIndicator from "../../components/RequestActivityIndicator";

class ViewLocation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  generateActionButtons = location => {
    if (this.props.userType == "lecturer") {
      return [];
    } else {
      return [{ name: "Delete", onPress: () => alert("deleted") }];
    }
  };

  async componentDidMount() {
    let {
      navigation: {
        state: {
          params: { group }
        }
      }
    } = this.props;
    this.setState({ isLoading: true });
    try {
      const response = await groupLocations(group.id);
      if (response.data) {
        const { data } = response.data;
        this.setState({
          isLoading: false
        });

        this.props.setLocation({ id: group.id, places: data });
      } else {
        this.setState({
          isLoading: false
        });
      }
    } catch (e) {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    let {
      navigation: {
        navigate,
        state: {
          params: {
            group: { name, id }
          }
        }
      }
    } = this.props;

    return (
      <Container style={styles.container}>
        <AppHeader pageTitle={name} navigation={this.props.navigation} />
        {this.props.locations.length == 0 && this.state.isLoading ? (
          <RequestActivityIndicator />
        ) : (
          <Content>
            <LayoutContainer style={styles.bodyContainer}>
              <InteractiveList
                dataArray={this.props.locations}
                items={this.props.locations}
                onPress={location =>
                  navigate("addLocation", {
                    location: location,
                    groupName: name,
                    groupId: id
                  })
                }
                renderNullItem="No Location Added Yet"
                actionButtons={list => this.generateActionButtons(list)}
              />
            </LayoutContainer>
          </Content>
        )}
        {this.props.userType != "lecturer" && (
          <AppFab
            name="add-location"
            type="MaterialIcons"
            onPress={() =>
              this.props.navigation.navigate("addLocation", {
                groupName: name,
                groupId: id
              })
            }
          />
        )}
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    userType: state.userType,
    locations: state.locations[ownProps.navigation.state.params.group.id] || []
  };
}

const _ViewLocation = props => (
  <ReduxContext.Consumer>
    {({ screenProps: { setLocation } }) => (
      <ViewLocation setLocation={setLocation} {...props} />
    )}
  </ReduxContext.Consumer>
);

export default connect(mapStateToProps)(_ViewLocation);

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  bodyContainer: {
    paddingVertical: 0
  }
};
