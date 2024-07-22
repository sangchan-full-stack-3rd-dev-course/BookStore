import { Category } from "../models/category_model";
import { httpClient } from "./api";

export const fetchCategory = async () => {
    const response = await httpClient.get<Category[]>('/category');
    return response.data;
};