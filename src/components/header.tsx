import { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import SearchInput from "./searchInput";
import { Row } from "./Layout/row";
import { initGA, logPageView } from "../utils/analytics";

const Header = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: 99;
  padding: 0 24px;
  background-color: ${({ theme: { colors } }) => colors.white};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Title = styled.div<{}>`
  color: ${({ theme: { colors } }) => colors.grey};
  font-weight: 700;
  font-size: 1.5em;
  margin-right: 2em;
  cursor: pointer;
`;

const LinkText = styled.div`
  color: ${({ theme: { colors } }) => colors.grey};
  font-weight: 600;
  font-size: 1em;
  cursor: pointer;
  margin: 0 16px;
`;

type Props = {
  withSearch: boolean;
};

export default ({ withSearch = true }) => {
  useEffect(() => {
    if (window) {
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }
      logPageView();
    }
  }, []);

  return (
    <Header>
      <Row>
        <Link href="/">
          <Title>COVID-19</Title>
        </Link>
        {withSearch && <SearchInput />}
      </Row>
      <Row>
        <Link href="/info">
          <LinkText>Info</LinkText>
        </Link>
        <Link href="/contact">
          <LinkText>Contact</LinkText>
        </Link>
      </Row>
    </Header>
  );
};
