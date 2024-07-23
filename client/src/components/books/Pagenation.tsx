import styled from 'styled-components';
import { IPagenation } from '../../models/pagenation_model';
import { LIMIT } from '../../constants/pagination';
import Button from '../common/Button';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/querystring';

interface Props {
  pagination : IPagenation
}

const Pagenation : React.FC<Props> = ({ pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalCount, currentPage } = pagination;
  const pages : number = Math.ceil(totalCount / LIMIT);

  const handleClickPage = (page : number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERYSTRING.PAGE, page.toString());
    setSearchParams(newSearchParams);
  };

  return (
    <PagenationStyle>
      {pages && (
        <ol>
          {Array(pages).fill(0).map((_, index)=>(
            <li>
              <Button
                key={index}
                size='small'
                scheme={ index + 1 === currentPage ? 'primary' : 'normal'}
                onClick={()=>handleClickPage(index+1)}>
                {index + 1}
              </Button>
            </li>
          ))}
        </ol>
      )}
    </PagenationStyle>
  )
};

const PagenationStyle = styled.div`
    display : flex;
    justify-content : start;
    align-items : center;
    padding : 24px 0;

    ol {
      list-style : none;
      display : flex;
      gap : 8px;
      padding : 0;
      margin : 0;
    }
`;

export default Pagenation;