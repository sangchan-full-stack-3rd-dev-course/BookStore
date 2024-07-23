import styled from "styled-components";
import BooksItem from "./BooksItem";
import { Book } from "../../models/book_model";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QUERYSTRING } from "../../constants/querystring";
import { ViewMode } from "./BooksViewSwitcher";

interface Props {
  books : Book[];
}

// const dummyBook : Book = {
//   id : 1,
//   title : "임시제목",
//   img : 1,
//   catrgory_id : 1,
//   form : "임시폼",
//   isbn : "123",
//   summary : "임시소개",
//   detail : "임시자세소개",
//   author : "임시작가",
//   pages : 1,
//   continue : "계속",
//   price : 1234567,
//   likes : 123,
//   pubDate : new Date().toISOString()
// };

const BooksList : React.FC<Props> = ({ books }) => {
  const [view, setView] = useState<ViewMode>('grid');
  const location = useLocation();

  useEffect(()=>{
    const params = new URLSearchParams(location.search);

    if(params.get(QUERYSTRING.VIEW)){
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  },[location.search]);

  return (
    <BookListStyle view={view}>
      {
        books.map((book)=>{
          return <BooksItem book={book} view={view}/>;
        })
      }
    </BookListStyle>
  )
};

interface StyleProps {
  view : ViewMode;
}

const BookListStyle = styled.div<StyleProps>`
    display : grid;
    grid-template-columns : ${({ view })=>(view === 'grid' ? 'repeat(4, 1fr);' : 'repeat(1, 1fr);')} 
    gap : 24px;
`;

export default BooksList;