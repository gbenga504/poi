import { httpPost } from "./axios";

export const registerUser = async ({
  email,
  password,
  passwordConfirmation,
  userType
}) => {
  return httpPost("sign_up", {
    user: {
      email,
      password,
      passsword_confirmation: passwordConfirmation,
      user_type: userType
    }
  });
};

export const loginUser = async ({ email, password }) => {
  return httpPost("sign_in", {
    email,
    password
  });
};
