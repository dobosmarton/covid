import { useContext } from 'react';
import styled from 'styled-components';
import { CovidDataContext } from '../context/CovidContext';

const Switch = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  border-radius: 8px;
  top: 72px;
  left: 12px;
  overflow: hidden;

  z-index: 99;

  background-color: ${({ theme: { colors } }) => colors.white};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Option = styled.div<{ active: boolean }>`
  font-size: 0.8em;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 8px;
  letter-spacing: 0.8px;

  color: ${({ theme: { colors }, active }) => (active ? colors.white : colors.grey)};

  background-color: ${({ theme: { colors }, active }) => (active ? colors.primary : 'transparent')};

  &:hover {
    opacity: 0.8;
  }
`;

const options = [
  { key: 'confirmed', value: 'confirmed' },
  { key: 'deaths', value: 'deaths' },
  { key: 'recovered', value: 'recovered' },
  { key: 'growthRate', value: 'growth rate' },
];

export default () => {
  const { activeFilter, setActiveFilter } = useContext(CovidDataContext);

  const onOption = (e, option) => {
    e.preventDefault();
    setActiveFilter(option.key);
  };

  return (
    <Switch>
      {options.map(option => (
        <Option key={option.key} active={activeFilter === option.key} onClick={e => onOption(e, option)}>
          {option.value}
        </Option>
      ))}
    </Switch>
  );
};
