import { useCallback } from "react";
import styled from "styled-components";

import Card from "../card";

type Props = {
  hoveredFeature?: any;
  x?: number;
  y?: number;
};

const TooltipContainer = styled(Card)`
  position: absolute;
  background-color: ${({ theme: { colors } }) => colors.white};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Label = styled.div`
  font-size: 0.8em;
  font-weight: 600;
  color: ${({ theme: { colors } }) => colors.grey};
`;

const Value = styled.div`
  padding-left: 4px;
  font-size: 0.9em;
`;

export default ({ t, hoveredFeature, x, y }: Props) => {
  if (!hoveredFeature) return null;

  console.log("hoveredFeature", hoveredFeature.properties);

  return (
    <TooltipContainer style={{ left: x, top: y }}>
      <Label>{hoveredFeature.properties.name}</Label>
      <div>
        <Label>Confirmed infected</Label>
        <Value>{hoveredFeature.properties.value}</Value>
      </div>
    </TooltipContainer>
  );
};
