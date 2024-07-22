import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const createClient = ( config? : AxiosRequestConfig ) => {
    const axiosInstance = axios.create({
        baseURL : BASE_URL,
        timeout : DEFAULT_TIMEOUT,
        headers : {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Credentials' : 'true'
        },
        withCredentials: true,
       ...config,
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const httpClient = createClient();