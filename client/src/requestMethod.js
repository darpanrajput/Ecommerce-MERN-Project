import axios from "axios";
const BASE_URL = "https://ecommerce-mern-project-e09o.onrender.com/api";

const TOKEN = getToken();

// console.log(
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken
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

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
