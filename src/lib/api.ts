import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
    baseURL: `${baseUrl}`,
});