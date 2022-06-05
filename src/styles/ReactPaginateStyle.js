import styled from "styled-components";

export const PaginateContainer = styled.div`
  .pagination {
    display: flex;
    padding: 2px;
    list-style: none;
    width: fit-content;
    max-width: 100%;
    border-radius: 8px;
    background: #eeeeee;
    font-family: "Cera Pro", sans-serif;

    .page-link {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 400;

      &:hover {
        cursor: pointer;
      }
    }

    .active {
      background: #ffff;
      border-radius: 7px;
    }

    .previous-item,
    .next-item {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 400;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
