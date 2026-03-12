// import axios from "axios";
// import accessToken from "./jwt-token-access/accessToken"

//pass new generated access token here
// const token = accessToken
import * as Utils from "../Utils";
// apply base url for axios
// const API_URL = "https://mehandipurbalaji.app";
const API_URL = Utils.API_URL;
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

export async function download(url, data) {
  // return await axiosApi.get(url, { ...config }).then(response => response.data)
  return fetch(API_URL + url, {
    method: 'GET',
    headers: {
      // mode: 'no-cors',
      Accept: 'application/zip',
      'Content-Type': 'application/json',
      "Authorization": "Bareer " + data?.token
    },
    // body: JSON.stringify(data)
  }).then(res => res.blob())

}

export async function post(url, data) {
  console.log('post method req', url, data)
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
  console.log('put method req', url, data)
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
    //   mode: 'no-cors',
    //   "Content-Type": "multipart/form-data",
      // "Accept": "application/json",
    //   "type": "formData",
    //   "Authorization": "Bareer " + token
    // },
    body: data
  }).then(res => res.json())
}

export async function del(url, data) {
  console.log('delete method req', url, data)
  return fetch(API_URL + url, {
    method: 'DELETE',
    headers: {
      // mode: 'no-cors',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bareer " + data?.token
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}
