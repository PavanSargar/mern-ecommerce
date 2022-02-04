import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
const TOKEN = "	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjE4M2E5YzVmYTU1ODlkMWU0YWJiM2VmIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjM2NzM3NzgzLCJleHAiOjE2MzY5OTY5ODN9.loi6j-BDp6Js-M6Wy3Bc87peyYAXscy28UWepmiDTSQ"


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  // headers: { token: `Bearer ${TOKEN}` },
  header: { token: TOKEN }

});
