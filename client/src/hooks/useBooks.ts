import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Book } from "../models/book_model";
import { IPagenation } from "../models/pagenation_model";
import { fetchBooks } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";


export const useBooks = () => {
    const location = useLocation();
    
    const [books, setBooks] = useState<Book[]>([]);
    const [pagination, setPagination] = useState<IPagenation>(
        {
            totalCount: 0,
            currentPage: 1,
        }
    );
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(()=>{
        const params = new URLSearchParams(location.search);

        fetchBooks({
            category_id : params.get(QUERYSTRING.CATEGORY_ID) ?
                            Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined,
            news : params.get(QUERYSTRING.NEWS) ? true : undefined,
            currentPage : params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
            limit : LIMIT,
        }).then(({books, pagenation})=>{
            setBooks(books);
            setPagination(pagenation);
            setIsEmpty(books.length === 0);
        });
    },[location.search]);

    return { books, pagination, isEmpty };
};