import axios from "axios";

const CustomAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default CustomAxios;