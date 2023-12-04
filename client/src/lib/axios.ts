import axios from "axios";

const BASE_URL = process.env.SERVER_URL;

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
    },
});

export default axiosInstance;