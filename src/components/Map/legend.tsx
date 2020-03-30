import { useCallback } from "react";
import styled from "styled-components";
import Card from "../Cards/card";
import { Row } from "../Layout/row";

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

type Props = {
  stops: [any][];
  quantiles: number[] | null;
};

const getValue = value =>
  value < 1
    ? Math.round((value + Number.EPSILON) * 100) / 100
    : Math.round(value);

export default ({ stops, quantiles }: Props) => {
  const getRange = useCallback(
    index => {
      if (quantiles?.length > 0) {
        const floor = index > 0 ? getValue(quantiles[index - 1]) : 0;
        const top = index < quantiles.length ? getValue(quantiles[index]) : "";
        return `${floor} - ${top}`;
      }
      return null;
    },
    [quantiles]
  );

  const renderLegendKeys = useCallback(
    (stop, i) => {
      const range = getRange(i);
      return (
        <Row key={i}>
          <LegendDot style={{ backgroundColor: stop[1] }} />
          <span>{range}</span>
        </Row>
      );
    },
    [quantiles]
  );

  return <LegendPanel>{stops.map(renderLegendKeys)}</LegendPanel>;
};
