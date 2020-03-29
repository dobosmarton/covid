import styled from "styled-components";

const Header = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
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

const Text = styled.div<{}>`
  color: ${({ theme: { colors } }) => colors.grey};
  font-weight: 700;
  font-size: 1.5em;
`;

export default () => {
  return (
    <Header>
      <Text>COVID-19</Text>
    </Header>
  );
};
