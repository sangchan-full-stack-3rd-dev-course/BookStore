import { SignupProps } from "../pages/SignUp";
import { httpClient } from "./api";

export const signup = async (userData : SignupProps) => {
    const response = await httpClient.post('/users/join', userData);
    return response.data;
};

export const resetRequest = async (userData : SignupProps) => {
    const response = await httpClient.post('/users/reset', userData);
    return response.data;
};

export const resetPassword = async (userData : SignupProps) => {
    const response = await httpClient.put('/users/reset', userData);
    return response.data;
};