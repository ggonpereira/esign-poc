import axios from "axios";
import { BASE_URL, SIGNWELL_API_KEY } from "../constants/signWellApi";

export const signWellApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": SIGNWELL_API_KEY,
  },
});
