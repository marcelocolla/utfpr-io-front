import axios from "axios";

export const api = axios.create({
  baseURL: "https://utf-io-staging.herokuapp.com/auth",
});

// https://utf-io-staging.herokuapp.com/auth/authenticate
