import styled from 'styled-components';

const HeadContainer = styled.h1`
	padding-top: 70px;
	padding-bottom: 40px;
	font-size: 20px;
`;

const Header = ({ children }) => {
	return <HeadContainer>{children}</HeadContainer>;
};

export default Header;
