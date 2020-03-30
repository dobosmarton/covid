import { useMemo, useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { Country } from "../config/interfaces";
import { CovidDataContext } from "../context/CovidContext";
import { SearchContext } from "../context/SearchContext";
import useFuzzySearch from "../hooks/useFuzzySearch";
import Card from "./Cards/countryCard";
import DetailsModal from "./Cards/detailsModal";

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

type Props = {
  onViewportChange: (props: { latitude: number; longitude: number }) => void;
};

export default ({ onViewportChange }: Props) => {
  const { searchText } = useContext(SearchContext);

  const [sortedData, setSortedData] = useState([]);
  const { activeFilter, sourceData } = useContext(CovidDataContext);
  const [filteredArray] = useFuzzySearch({ array: sortedData });
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (sourceData?.features) {
      const sorted = sourceData.features
        .filter(country => country.properties[activeFilter])
        .sort(
          (a, b) => b.properties[activeFilter] - a.properties[activeFilter]
        );
      setSortedData(sorted);
    }
  }, [sourceData?.features, activeFilter, searchText]);

  const onCardClick = useCallback(data => {
    setSelectedCountry(data);
  }, []);

  const cards = useMemo(
    () =>
      filteredArray?.map(country => {
        return (
          <Card
            data={country.properties}
            activeFilter={activeFilter}
            onGlobeClick={onViewportChange}
            onCardClick={onCardClick}
          />
        );
      }),
    [filteredArray, onCardClick]
  );

  return (
    <Footer>
      {cards}
      <DetailsModal
        data={selectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
    </Footer>
  );
};
