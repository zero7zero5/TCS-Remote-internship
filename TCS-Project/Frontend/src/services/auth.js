import axios from "axios";
export function authentication(user) {
  return axios.post("backend/api/auth", {
    email: user.email,
    password: user.password,
  });
}
