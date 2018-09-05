import axios from "axios";
import { AsyncStorage } from "react-native";

const httpClient = async () => {
  const authToken = await AsyncStorage.getItem("@jwt");

  return axios.create({
    baseURL: "http://localhost:4000/api/v1/",
    // baseURL: "http://4fa53e64.ngrok.io/api/v1/",
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${authToken}`,
      contentType: "application/json"
    }
  });
};

export const httpGet = async (endpoint, params = {}) => {
  const httpHandler = await httpClient();
  return httpHandler.get(endpoint, params);
};

export const httpPost = async (endpoint, params) => {
  const httpHandler = await httpClient();
  return httpHandler.post(endpoint, params);
};

export const httpPut = async (endpoint, params) => {
  const httpHandler = await httpClient();
  return httpHandler.put(endpoint, params);
};

export const httpDelete = async endpoint => {
  const httpHandler = await httpClient();
  return httpHandler.delete(endpoint);
};
