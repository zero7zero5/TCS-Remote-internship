import axios from "axios";

export function forgot(input) {
  return axios.post("backend/api/forgot", {
    email: input.email,
    securityQuestion: input.securityQuestion,
    securityAnswer: input.securityAnswer,
    newPassword: input.newPassword,
  });
}
