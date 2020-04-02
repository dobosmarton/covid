import { useMemo } from 'react';
import styled from 'styled-components';
import { IoIosGlobe } from 'react-icons/io';
import { Country } from '../../config/interfaces';
import Card from './card';
import { dataLayer } from '../Map/mapStyle';
import { Row } from '../Layout/row';

type Props = {
  activeFilter: string;
  data: {
    percentile: number;
    name: string;
    confirmed: number;
    deaths: number;
    recovered: number;
    growthRate: number;
    latitude: number;
    longitude: number;
  };
  onGlobeClick: (props: { latitude: number; longitude: number }) => void;
  onCardClick: (data: Country) => void;
};

const CountryCard = styled(Card)`
  position: relative;
  margin: 0 8px;
  height: 164px;
  min-width: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease-out;
  cursor: pointer;
  overflow: auto;

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
`;

const Label = styled.div`
  font-size: 0.7em;
  line-height: 1.2em;
  font-weight: 400;
  color: ${({ theme: { colors } }) => colors.grey};
`;

const Value = styled.span<{ isActive: boolean }>`
  font-size: ${({ isActive }) => (isActive ? 0.8 : 0.7)}em;
  font-weight: ${({ isActive }) => (isActive ? 700 : 400)};
  line-height: ${({ isActive }) => (isActive ? 1.8 : 1.6)}em;
  color: ${({ theme: { colors }, isActive }) => (isActive ? colors.primary : colors.grey)};
`;

const Marker = styled.div`
  width: 100%;
  height: 6px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 4px 4px 0 0;
`;

const GlobeIcon = styled(IoIosGlobe)`
  min-width: 16px;
  min-height: 16px;
  &:hover {
    opacity: 0.4;
  }
`;

const StyledRow = styled(Row)`
  justify-content: space-between;
`;

const getValue = (value) => {
  if (value === undefined) return 'No data available';

  const formatted = value < 1 ? Math.round((value + Number.EPSILON) * 100) / 100 : Math.round(value);

  return new Intl.NumberFormat().format(formatted);
};

const options = ['confirmed', 'deaths', 'recovered', 'growthRate'];

export default ({ data, activeFilter, onCardClick, onGlobeClick }) => {
  const actColor = useMemo(() => dataLayer.paint['fill-color'].stops[data.percentile], [data?.percentile]);

  const onGlobeIcon = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { latitude, longitude } = data;
    onGlobeClick({ latitude, longitude });
  };

  const onCard = (e) => {
    e.preventDefault();
    onCardClick(data);
  };

  return (
    <CountryCard onClick={onCard}>
      <Marker style={actColor ? { backgroundColor: actColor[1] as string } : {}} />
      <StyledRow>
        <Title>{data.name}</Title>
        <GlobeIcon onClick={onGlobeIcon} />
      </StyledRow>
      <Content>
        {options.map((option) => (
          <>
            <Label>{option}:</Label>
            <Value key={option} isActive={activeFilter === option}>
              {`${getValue(data[option])}`}
            </Value>
          </>
        ))}
      </Content>
    </CountryCard>
  );
};
