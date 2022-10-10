import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";

const TOKEN = getToken();

// console.log(
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser
//     ?.accessToken
// );

function getToken() {
  if (localStorage.getItem("persist:root") !== null) {
    return JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser?.accessToken;
  } else {
    return "";
  }
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// console.log(getToken());
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
