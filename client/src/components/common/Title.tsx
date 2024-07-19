import styled from "styled-components";
import { ColorKey, HeadingSize } from "../../style/theme";

interface Props {
    children : React.ReactNode;
    size : HeadingSize;
    color? : ColorKey;
}

const Title : React.FC<Props> = ({ children, size }) => {
  return <TitleStyle size={size}>{children}</TitleStyle>;
};

const TitleStyle = styled.h1<Omit<Props, 'children'>>`
    font-size : ${({theme, size}) => theme.heading[size].fontSize};
    color : ${({theme, color}) => (
        color ? theme.color[color] : theme.color.primarty)};
`;

export default Title;