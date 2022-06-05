import styled from 'styled-components';

const Container = styled.h1`
	padding-top: 70px;
	padding-bottom: 40px;
	font-size: 20px;
`;

const PageHeader = ({ children }) => {
	return <Container>{children}</Container>;
};

export default PageHeader;
