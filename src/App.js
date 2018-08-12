/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Root } from "native-base";
import { AsyncStorage } from "react-native";

import { appReducer } from "./reducers";
import Routes from "./Routes";

const store = createStore(
  combineReducers({
    ...appReducer
  }),
  {}
);

export default class App extends React.PureComponent {
  state = {
    shouldComponentRender: false
  };

  componentDidMount() {
    AsyncStorage.multiGet(["@jwt", "@userType"])
      .then(results => {
        if (results[0][1]) {
          store.dispatch({
            type: "@jwt",
            jwt: results[0][1]
          });
        }

        if (results[1][1]) {
          store.dispatch({
            type: "@userType",
            userType: results[1][1]
          });
        }

        this.setState({ shouldComponentRender: true });
      })
      .catch(err => null);
  }

  render() {
    let { shouldComponentRender } = this.state;
    return shouldComponentRender ? (
      <Root>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Root>
    ) : null;
  }
}
