import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import caretDown from "../assets/caret-down.svg";

import { fetchCurrencies, setCurrency } from "../redux/slices/currencySlice";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  color: #8692a6;

  .left {
    font-size: 13px;
  }

  .right {
    border: 1px solid #8692a6;
    border-radius: 6px;
    padding: 7px 10px;
    font-size: 13px;
    width: 200px;
    font-weight: 500px;
    position: relative;

    .currency-select {
      cursor: default;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      div {
        display: flex;
        align-items: center;
      }
    }

    .flag {
      width: 20px;
      margin-right: 7px;
    }
    .caret-down {
      width: 8px;
    }
    .currencies-dropdown {
      position: absolute;
      border: 1px solid #000;
      left: 0;
      bottom: -20px;
      width: 100%;
      background-color: #3a3a3b;
      border-radius: 10px;
      padding: 7px;

      .currency {
        padding: 5px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        color: #fff;
        &:hover {
          background: #076fa3;
        }
      }
    }
  }
`;

const Footer = () => {
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const dispatch = useDispatch();
  const { currencies, currency } = useSelector((state) => state.currency);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const handleSelect = (id) => {
    dispatch(setCurrency(id));
    setCurrencyDropdown(false);
  };

  return (
    <Container className="footer">
      <div className="left">© 2022 DevHire</div>

      <div className="right">
        <div
          className="currency-select"
          onClick={() => setCurrencyDropdown(true)}
        >
          <div>
            <img className="flag" src={currency.flag_url} alt="country flag" />
            <span>{currency.name}</span>
          </div>
          <img className="caret-down" src={caretDown} alt="caret down" />
        </div>
        {currencyDropdown && (
          <div className="currencies-dropdown">
            {currencies.map((currency) => {
              return (
                <div
                  onClick={() => handleSelect(currency.id)}
                  className="currency"
                  key={currency.name}
                >
                  <img
                    className="flag"
                    src={currency.flag_url}
                    alt="country flag"
                  />
                  <span className="currency-name">{currency.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Footer;
