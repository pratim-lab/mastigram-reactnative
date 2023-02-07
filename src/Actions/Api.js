import axios from "axios";
import { getRecoil, resetRecoil, setRecoil } from "recoil-nexus";
import { authState, messageState, loadingState } from "./Atoms";

export const apiUrl = __DEV__ ? `https://mastigram.appitrace.com/api/` : `https://mastigram.appitrace.com/api/`
export const filePath = __DEV__ ? `https://mastigram.appitrace.com/` : `https://mastigram.appitrace.com/`

const Api = axios.create({
  baseURL: apiUrl,
  responseType: "json"
});

const requestHandler = request => {
  const authData = getRecoil(authState)
  // console.log(authData?.token);
  const accessToken = authData?.token
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
};

const responseHandler = response => {
  // console.log("responseHandler", response);
  setRecoil(loadingState, {
    status: false,
    type: "screen"
  })
  setRecoil(loadingState, {
    status: false,
    type: "button"
  })
  return response;
};

const errorHandler = error => {
  console.log("errorHandler", error);
  setRecoil(loadingState, {
    status: false,
    type: "screen"
  })
  setRecoil(loadingState, {
    status: false,
    type: "button"
  })
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    resetRecoil(authState);
  } else if (!error?.response?.status >= 200 && !error?.response?.status <= 299) {
    setRecoil(messageState, {
      type: "error",
      status: true,
      message: "Something went wrong. Please try again."
    })
  } else {
    setRecoil(messageState, {
      type: "error",
      status: true,
      message: "Something went wrong. Please try again."
    })
  }
  return Promise.reject(error);
};

Api.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

Api.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default Api;