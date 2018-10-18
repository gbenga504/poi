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

export const projects = (state = [], action) => {
  switch (action.type) {
    case types.SET_PROJECTS:
      return action.projects;
      break;
    default:
      return state;
      break;
  }
};

export const groups = (state = [], action) => {
  switch (action.type) {
    case types.SET_GROUPS:
      return action.groups;
      break;
    default:
      return state;
      break;
  }
};

export const location = (state = {}, action) => {
  switch (action.type) {
    case types.SET_LOCATIONS:
      return action.location;
      break;
    default:
      return state;
      break;
  }
};
