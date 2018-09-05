import { httpGet, httpPost, httpPut, httpDelete } from "./axios";
import { AsyncStorage } from "react-native";

export const createProject = async ({ title, description }) => {
  const user = JSON.parse(await AsyncStorage.getItem("currentUser"));
  return httpPost("projects", {
    projects: {
      title,
      description,
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

export const createGroup = async ({
  title,
  description,
  projectId,
  students
}) => {
  return httpPost(`groups`, {
    groups: {
      title,
      description,
      project_id: projectId,
      students_ids: students
    }
  });
};

export const deleteGroup = async id => {
  return httpDelete(`groups/${id}`);
};

export const projectGroups = async projectId => {
  return httpGet(`groups/project_groups/${projectId}`);
};

export const projectEligbleUsers = async projectId => {
  return httpGet(`project_eligible_users/${projectId}`);
};

export const groupLocations = async groupId => {
  return httpGet(`locations/group_locations/${groupId}`);
};
