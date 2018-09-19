import * as types from "./types";

export const setJwt = jwt => ({
  type: types.SET_JWT,
  jwt
});

export const setUserType = userType => ({
  type: types.SET_USER_TYPE,
  userType
});

export const setProjects = projects => ({
  type: types.SET_PROJECTS,
  projects
});

export const setGroups = groups => ({
  type: types.SET_GROUPS,
  groups
});
