import { httpGet, httpPost, httpPut, httpDelete } from "./axios";
import { AsyncStorage } from "react-native";

export const createProject = async ({ title }) => {
  const user = JSON.parse(await AsyncStorage.getItem("currentUser"));
  return httpPost("projects", {
    projects: {
      title,
      lecturer_id: user.id
    }
  });
};

export const deleteProject = async id => {
  return httpDelete(`projects/${id}`);
};

export const lecturerProjects = async () => {
  const user = JSON.parse(await AsyncStorage.getItem("currentUser"));
  return httpGet(`projects/lecturer_projects/${user.id}`);
};

// export const updateProject = async ({ title, projectId }) => {
//   const user = await AsyncStorage.getItem("currentUser");
//   return httpPut(`projects/${projectId}`, {
//     projects: {
//       title,
//       lecturer_id: user.id
//     }
//   });
// };

export const createGroup = async ({ title, projectId }) => {
  return httpPut(`groups`, {
    groups: {
      title,
      project_id: projectId
    }
  });
};

export const deleteGroup = async id => {
  return httpDelete(`groups/${id}`);
};

export const projectGroups = async projectId => {
  return httpGet(`groups/project_groups/${projectId}`);
};
