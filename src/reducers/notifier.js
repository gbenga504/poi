import * as types from "../actions/types";

export const jwt = (state = "", action) => {
  switch (action.type) {
    case types.SET_JWT:
      return action.jwt;
      break;
    default:
      return state;
      break;
  }
};

export const userType = (state = null, action) => {
  switch (action.type) {
    case types.SET_USER_TYPE:
      return action.userType;
      break;
    default:
      return state;
      break;
  }
};
