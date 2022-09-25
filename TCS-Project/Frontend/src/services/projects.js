import axios from "axios";

export function getProjects() {
  return axios.get("backend/api/projects");
}

export function postProject(user) {
  return axios.post("backend/api/projects", {
    swon: user.swon,
    name: user.name,
    description: user.desc,
    budget: user.budget,
    status: user.status,
  });
}

export function deleteProject(id) {
  return axios.delete(`backend/api/projects/${id}`);
}
