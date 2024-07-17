import { styled } from "styled-components";

const Header = () => {
  return (
    <HeaderStyle>
        <h1>book store</h1>
    </HeaderStyle>
    
  )
}

const HeaderStyle = styled.header`
    background-color : ${(props)=> props.theme.color.background};
    h1 {
        color : ${(props)=> props.theme.color.primary};
    }
`;

export default Header;