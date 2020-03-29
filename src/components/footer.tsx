import { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { Country } from "../config/interfaces";
import Card from "./card";
import { dataLayer } from "./Map/mapStyle";

const Footer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;

  z-index: 99;
  padding: 16px;
`;

const FooterCard = styled(Card)`
  position: relative;
  margin: 0 8px;
  height: 120px;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(0.95);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  jusitfy-content: flex-end;
`;

const Title = styled.div`
  font-size: 0.8em;
  font-weight: 600;
  letter-spacing: 1px;
`;

const Value = styled.span`
  font-size: 0.7em;
  font-weight: 400;
`;

const Marker = styled.div`
  width: 100%;
  height: 6px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 4px 4px 0 0;
`;

type Props = {
  filter: string;
  countries: Country[];
};

const getValue = value => {
  if (value === undefined) return "No data available";

  return value < 1
    ? Math.round((value + Number.EPSILON) * 100) / 100
    : Math.round(value);
};

export default ({ countries, filter = "confirmed" }: Props) => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const sorted = countries
      ?.filter(country => country.properties[filter])
      .sort((a, b) => b.properties[filter] - a.properties[filter]);
    setSortedData(sorted);
  }, [countries]);

  const cards = useMemo(
    () =>
      sortedData?.map(country => {
        const { properties } = country;
        const actColor =
          dataLayer.paint["fill-color"].stops[properties.percentile];

        return (
          <FooterCard>
            <Marker style={actColor ? { backgroundColor: actColor[1] } : {}} />
            <Title>{properties.name}</Title>
            <Content>
              <Value>{getValue(properties.confirmed)}</Value>
              <Value>{getValue(properties.deaths)}</Value>
              <Value>{getValue(properties.growthRate)}</Value>
            </Content>
          </FooterCard>
        );
      }),
    [sortedData]
  );

  return <Footer>{cards}</Footer>;
};
