import styled from 'styled-components';

export default styled.div`
  position: relative;
  background-color: ${({ theme: { colors } }) => colors.white};
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;
