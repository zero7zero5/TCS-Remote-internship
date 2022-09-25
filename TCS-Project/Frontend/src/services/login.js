import axios from "axios";

export function register(user) {
  return axios.post("backend/api/users", {
    name: user.name,
    email: user.email,
    password: user.password,
    securityQuestion: user.securityQuestion,
    securityAnswer: user.securityAnswer,
  });
}
