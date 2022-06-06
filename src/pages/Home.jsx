import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

import { Header } from "../components";
import Card, { FreeLancerLoader } from "../components/Card";
import { PaginateContainer } from "../styles/ReactPaginateStyle";

const Container = styled.div`
  margin-bottom: 40px;
`;

const Wrapper = styled.div`
  .freelancers-container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 40px;
  }

  @media (min-width: 768px) {
    .freelancers-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .freelancers-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

const Home = ({ toggleFavoriteFreelancer }) => {
  const { freelancers, loading } = useSelector((state) => state.freelancer);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(freelancers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(freelancers.length / itemsPerPage));
    document.title = "Home | DevHire ";
  }, [itemOffset, itemsPerPage, freelancers]);

 
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % freelancers.length;
    setItemOffset(newOffset);
  };

  return (
    <Container>
      <Wrapper>
        <Header>Hire Top Developers</Header>
        {loading ? (
          <div className="freelancers-container">
            {Array(12)
              .fill(undefined)
              .map((_, i) => {
                return <FreeLancerLoader key={i} />;
              })}
          </div>
        ) : (
          <div className="freelancers-container">
            {currentItems &&
              currentItems.map((freelancer) => {
                return (
                  <Card
                    key={freelancer._source.cust_id}
                    data={freelancer}
                    toggleFavoriteFreelancer={toggleFavoriteFreelancer}
                    filled={freelancer.favorite}
                  />
                );
              })}
          </div>
        )}
        <PaginateContainer>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="previous-item"
            previousLinkClassName="previous-link"
            nextClassName="next-item"
            nextLinkClassName="next-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </PaginateContainer>
      </Wrapper>
    </Container>
  );
};

export default Home;
