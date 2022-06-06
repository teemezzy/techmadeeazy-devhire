import { useState, useEffect } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
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

const Favorites = ({ toggleFavoriteFreelancer }) => {
  const { loading, freelancers } = useSelector((state) => state.freelancer);
  const [favorites, setFavorites] = useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    setFavorites(
      freelancers.filter((freelancer) => freelancer.favorite === true)
    );
    document.title = "Favorites | DevHire";
  }, [freelancers]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(favorites.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(favorites.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, favorites]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % favorites.length;
    setItemOffset(newOffset);
  };

  return (
    <Container>
      <Wrapper>
        <Header>Favorites</Header>
        {loading ? (
          <div className="freelancers-container">
            {Array(5)
              .fill(undefined)
              .map((_, i) => {
                return <FreeLancerLoader key={i} />;
              })}
          </div>
        ) : !favorites.length ? (
          <p style={{ textAlign: "center" }}>No Favorite Developer yet</p>
        ) : (
          <div className="freelancers-container">
            {currentItems &&
              currentItems.map((freelancer) => {
                return (
                  <Card
                    data={freelancer}
                    filled
                    key={freelancer._source.cust_id}
                    toggleFavoriteFreelancer={toggleFavoriteFreelancer}
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

export default Favorites;
