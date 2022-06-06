import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

import _nav from "../nav";
import Backdrop from "./Backdrop";

const Container = styled.div`
  height: 100vh;
  width: 230px;
  position: fixed;
  border-right: 1px solid #d9dbe9;
  background: #f9f9f9;
`;

const LogoContainer = styled.h1`
  font-size: 25px;
  font-weight: 700;
  margin: 20px 0 30px 40px;
  span {
    &.left {
      color: #14142b;
    }
    &.right {
      color: #369bf0;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 25px;

  .nav-link {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 20px 0 40px;
    font-size: 14px;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.43);
    font-weight: 700;
    transition: all 0.3s ease-in-out;
    height: 25px;
    letter-spacing: 0.5px;

    .icon-wrapper {
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 25px;
      transition: all 0.3s ease-in-out;

      svg {
        width: 13px;
      }
    }

    .active-bar {
      position: absolute;
      height: 100%;
      width: 7px;
      background: transparent;
      left: 0;
      border-radius: 5px;
      transition: all 0.3s ease-in-out;
    }

    &.activated,
    &:hover {
      color: #14142b;

      .icon-wrapper {
        background: #1d9bf0;
        border-radius: 5px;

        svg path {
          stroke: #fff;
          stroke-opacity: 1;
        }
      }
      .active-bar {
        background: #1d9bf0;
      }
    }
  }
`;

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const [width, setWidth] = useState(window.innerWidth);

  const breakpoint = 768;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    if (width < breakpoint) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width, setShowSidebar]);

  const sidebar = (
    <Container>
      <LogoContainer>
        <span className="left">Dev</span>
        <span className="right">Hire</span>
      </LogoContainer>
      <Nav>
        {_nav.map((navItem) => {
          return (
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (isActive ? " activated" : "")
              }
              key={navItem.name}
              to={navItem.to}
            >
              <span className="icon-wrapper">{navItem.icon}</span>
              <span className="ml-4">{navItem.name}</span>
              <span className="active-bar"></span>
            </NavLink>
          );
        })}
      </Nav>
    </Container>
  );

  return (
    <AnimatePresence>
      {showSidebar &&
        (width < breakpoint ? (
          <Backdrop
            show={showSidebar}
            handleClose={() => setShowSidebar(false)}
          >
            <motion.div
              initial={{ x: "-100vw", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "tween", duration: 0.3 }}
              exit={{
                x: "-100vw",
                opacity: 0,
                transition: { ease: "easeInOut", duration: 0.3 },
              }}
            >
              {sidebar}
            </motion.div>
          </Backdrop>
        ) : (
          sidebar
        ))}
    </AnimatePresence>
  );
};

export default Sidebar;
