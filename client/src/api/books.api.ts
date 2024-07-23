import { Book } from "../models/book_model";
import { IPagenation } from "../models/pagenation_model";
import { httpClient } from "./api";

interface FetchBooksParams {
    category_id? : number;
    news? : boolean;
    currentPage? : number;
    limit : number;
}

interface FetchBooksResponse {
    books : Book[];
    pagenation : IPagenation;
}

export const fetchBooks = async (params: FetchBooksParams) => {
    try {
        const response = await httpClient.get<FetchBooksResponse>('/books', { params : params });
        return response.data;
    } catch (error) {
        return {
            books : [],
            pagenation : {
                totalCount : 0,
                currentPage : 1,
            }
        };
    }
};