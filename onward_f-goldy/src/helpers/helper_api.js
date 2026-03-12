// import axios from "axios";
// import accessToken from "./jwt-token-access/accessToken"
//pass new generated access token here
// const token = accessToken
// apply base url for axios
// const API_URL = "http://192.168.1.241:8082/";
// const API_URL = "http://192.168.1.50:8082/";
const API_URL = "https://onwardworkspaces.com:8083/";
// const axiosApi = axios.create({
//   baseURL: API_URL,
// })
// axiosApi.defaults.headers.common["Authorization"] = token
// axiosApi.interceptors.response.use(
//   response => response,
//   error => Promise.reject(error)
// )
export async function get(url, data) {
  // return await axiosApi.get(url, { ...config }).then(response => response.data)
  return fetch(API_URL + url, {
    method: 'GET',
    headers: {
      // mode: 'no-cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bareer " + data?.token
    },
    // body: JSON.stringify(data)
  }).then(res => res.json())
}
export async function post(url, data) {
  // console.log('post method req', url, data)
  return fetch(API_URL + url, {
    method: 'POST',
    headers: {
      // mode: 'no-cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bareer " + data?.token
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
  // .post(API_URL+url, { ...data }, { ...config })
  // .then(response => response.data)
}
export async function put(url, data) {
  // console.log('post method req', url, data)
  return fetch(API_URL + url, {
    method: 'PUT',
    headers: {
      // mode: 'no-cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bareer " + data?.token
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}
export async function upload(url, data, token) {
  console.log('upload method req', url, data)
  // for (const [key, value] of data) {
  //   console.log('form data before hitting', `${key}: ${value}\n`);
  // }
  return fetch(API_URL + url, {
    method: 'POST',
    // mode: 'no-cors',
    // headers: {
    //   Authorization: `Bearer ${token}`, // Set the authorization header
    // },
    body: data
  }).then(res => res.json())
}
export async function uploadWithTokan(url, data, token) {
  console.log('upload method req', url, data)
  // for (const [key, value] of data) {
  //   console.log('form data before hitting', `${key}: ${value}\n`);
  // }
  return fetch(API_URL + url, {
    method: 'POST',
    // mode: 'no-cors',
    headers: {
      Authorization: `Bearer ${token}`, // Set the authorization header
      // 'Content-Type': 'multipart/Form-Data',
    },
    body: data
  }).then(res => res.json())
}
export async function del(url, config = {}) {
  // return await axiosApi
  //   .delete(url, { ...config })
  //   .then(response => response.data)
}