import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Sidebar, Footer } from ".";

const AppContentContainer = styled.div`
  position: relative;
  padding: 0 20px;
  width: calc(100vw-230px);
  overflow: hidden;
  background-color:#fffff;

  @media (min-width: 768px) {
    margin-left: 230px;
    padding: 0 40px;
  }
`;

const AppContent = styled.div`
  .hamburger {
    svg {
      width: 30px;
      height: 30px;
    }
    display: block;
    position: absolute;
    left: 20px;
    top: 20px;
    cursor: pointer;
  }

  @media (min-width: 768px) {
     .hamburger {
      display: none;
    }
  }
`;

const DefaultLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const footer = document.querySelector(".footer");
    setFooterHeight(footer.offsetHeight);

    const handleWindowResize = () => setFooterHeight(footer.offsetHeight);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <AppContentContainer>
        <AppContent style={{ minHeight: `calc(100vh - ${footerHeight}px)` }}>
          <div
            className="hamburger"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z"
                fill="black"
              />
            </svg>
          </div>
          <Outlet />
        </AppContent>
        <Footer />
      </AppContentContainer>
    </>
  );
};

export default DefaultLayout;
