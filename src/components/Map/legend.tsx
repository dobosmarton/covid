import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Card from '../Cards/card';
import { Row } from '../Layout/row';

const LegendPanel = styled(Card)`
  position: absolute;
  top: 120px;
  right: 24px;

  span {
    font-weight: 300;
    font-size: 0.8em;
  }
`;

const LegendDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 4px;
  margin-right: 8px;
`;

const LegendTitle = styled.div`
  margin-bottom: 4px;
`;

type Props = {
  filter: string;
  stops: (string | number)[][];
  quantiles: number[] | null;
};

// const getValue = (value) => (value < 1 ? Math.round((value + Number.EPSILON) * 100) / 100 : Math.round(value));

const getValue = (v) => Math.round(v * 100 * 10000) / 10000;

export default ({ filter, stops, quantiles }: Props) => {
  const getRange = useCallback(
    (index) => {
      if (quantiles?.length > 0) {
        const floor = index > 0 ? getValue(quantiles[index - 1]) : 0;
        const top = index < quantiles.length ? `${getValue(quantiles[index])}%` : '';
        return `${floor}% - ${top}`;
      }
      return null;
    },
    [quantiles]
  );

  const title = useMemo(() => {
    switch (filter) {
      case 'confirmed':
        return '% of the population';

      default:
        return '% of the confirmed cases';
    }
  }, [filter]);

  const renderLegendKeys = (stop, i) => (
    <Row key={i}>
      <LegendDot style={{ backgroundColor: stop[1] }} />
      <span>{getRange(i)}</span>
    </Row>
  );

  return (
    <LegendPanel>
      <LegendTitle>{title}</LegendTitle>
      {stops.map(renderLegendKeys)}
    </LegendPanel>
  );
};
